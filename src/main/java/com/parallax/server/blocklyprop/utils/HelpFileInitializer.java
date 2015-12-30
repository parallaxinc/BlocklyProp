/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.utils;

import com.google.common.io.Files;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import net.java.textilej.parser.MarkupParser;
import net.java.textilej.parser.builder.HtmlDocumentBuilder;
import net.java.textilej.parser.markup.textile.TextileDialect;
import org.apache.commons.configuration.Configuration;

/**
 *
 * @author Michel
 */
@Singleton
public class HelpFileInitializer {

    private static final String DEFAULT_SOURCE_DIRECTORY = "help";
    private static final String DEFAULT_DESTINATION_DIRECTORY = "help-xml";

    private Configuration configuration;

    private File sourceDirectoryFile;
    private File destinationDirectoryFile;

    @Inject
    public void setConfiguration(Configuration configuration) {
        this.configuration = configuration;
        convert();
    }

    protected void convert() {
        if (checkSourceFilesPresent()) {
            String destinationDirectory = configuration.getString("help.destination", DEFAULT_DESTINATION_DIRECTORY);
            destinationDirectoryFile = new File(new File(System.getProperty("user.home")), destinationDirectory);
            if (destinationDirectoryFile.mkdirs()) {
                System.out.println("Destination directory created: " + destinationDirectoryFile.getAbsolutePath());
            } else {
                System.out.println("Failed to create destination directory: " + destinationDirectoryFile.getAbsolutePath());
            }
            new Thread(new HelpFileConverter()).start();
        }
    }

    protected boolean checkSourceFilesPresent() {
        String sourceDirectory = configuration.getString("help.source", DEFAULT_SOURCE_DIRECTORY);
        sourceDirectoryFile = new File(sourceDirectory);
        System.out.println("Looking for help files in: " + sourceDirectoryFile.getAbsolutePath());
        if (sourceDirectoryFile.exists() && sourceDirectoryFile.isDirectory()) {
            return true;
        }
        sourceDirectoryFile = new File(new File(System.getProperty("user.home")), sourceDirectory);
        System.out.println("Looking for help files in: " + sourceDirectoryFile.getAbsolutePath());
        if (sourceDirectoryFile.exists() && sourceDirectoryFile.isDirectory()) {
            return true;
        }
        return false;
    }

    private class HelpFileConverter implements Runnable {

        @Override
        public void run() {
            System.out.println("Start help file conversion");
            File[] files = sourceDirectoryFile.listFiles();
            iterateFiles(files, destinationDirectoryFile);
            System.out.println("End help file conversion");
        }

        private void iterateFiles(File[] files, File destinationDirectory) {
            for (File file : files) {
                if (file.isDirectory()) {
                    iterateFiles(file.listFiles(), new File(destinationDirectory, file.getName()));
                } else {
                    try {
                        convertFile(file, destinationDirectory);
                    } catch (IOException ex) {
                        ex.printStackTrace();
                    }
                }
            }
        }

        private void convertFile(File file, File destinationDirectory) throws IOException {
            if (file.getName().endsWith(".textile")) {
                convertTextileFile(file, destinationDirectory);
            } else {
                Files.copy(file, new File(destinationDirectory, file.getName()));
            }
        }

        private void convertTextileFile(File file, File destinationDirectory) throws IOException {
            InputStreamReader textileStreamReader = new FileReader(file);

            destinationDirectory.mkdirs();
            File destinationFile = new File(destinationDirectory, file.getName().substring(0, file.getName().length() - 8) + ".xml");

            try (OutputStreamWriter xmlStreamWriter = new FileWriter(destinationFile)) {
                HtmlDocumentBuilder documentBuilder = new HtmlDocumentBuilder(xmlStreamWriter);
                documentBuilder.setEmitAsDocument(false);
                MarkupParser textileParser = new MarkupParser(new TextileDialect(), documentBuilder);
                textileParser.parse(textileStreamReader);
            }
        }

    }

}
