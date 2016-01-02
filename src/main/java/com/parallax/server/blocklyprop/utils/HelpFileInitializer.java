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
import java.util.logging.Level;
import java.util.logging.Logger;
import net.java.textilej.parser.MarkupParser;
import net.java.textilej.parser.builder.HtmlDocumentBuilder;
import net.java.textilej.parser.markup.textile.TextileDialect;
import org.apache.commons.configuration.Configuration;
import org.apache.commons.io.FileUtils;
import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.apache.lucene.document.Document;
import org.apache.lucene.document.Field;
import org.apache.lucene.document.StoredField;
import org.apache.lucene.document.TextField;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.index.IndexWriterConfig;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Element;

/**
 *
 * @author Michel
 */
@Singleton
public class HelpFileInitializer {

    private static final String DEFAULT_SOURCE_DIRECTORY = "help";
    private static final String DEFAULT_DESTINATION_DIRECTORY = "help-xml";
    private static final String DEFAULT_LUCENE_DIRECTORY = "help-lucene";

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

        private final Analyzer analyzer = new StandardAnalyzer();
        private Directory directory;
        private IndexWriter indexWriter;

        @Override
        public void run() {
            System.out.println("Start help file conversion");
            try {
                File luceneIndexLocation = new File(new File(System.getProperty("user.home")), configuration.getString("help.lucene", DEFAULT_LUCENE_DIRECTORY));
                if (luceneIndexLocation.exists() && luceneIndexLocation.isDirectory()) {
                    FileUtils.cleanDirectory(luceneIndexLocation);
                }
                directory = FSDirectory.open(luceneIndexLocation.toPath());
                IndexWriterConfig config = new IndexWriterConfig(analyzer);
                indexWriter = new IndexWriter(directory, config);

                File[] files = sourceDirectoryFile.listFiles();
                iterateFiles(files, destinationDirectoryFile, "");

                indexWriter.close();
                directory.close();
            } catch (IOException ex) {
                Logger.getLogger(HelpFileInitializer.class.getName()).log(Level.SEVERE, null, ex);
            }
            System.out.println("End help file conversion");
        }

        private void iterateFiles(File[] files, File destinationDirectory, String path) {
            destinationDirectory.mkdirs();
            for (File file : files) {
                if (file.isDirectory()) {
                    String newPath = path + file.getName() + "/";
                    iterateFiles(file.listFiles(), new File(destinationDirectory, file.getName()), newPath);
                } else {
                    try {
                        convertFile(file, destinationDirectory, path);
                    } catch (IOException ex) {
                        ex.printStackTrace();
                    }
                }
            }
        }

        private File convertFile(File file, File destinationDirectory, String path) throws IOException {
            if (file.getName().endsWith(".textile")) {
                File destination = convertTextileFile(file, destinationDirectory, path);
                indexFile(destination, path + Files.getNameWithoutExtension(file.getName()));
                return destination;
            } else {
                File destination = new File(destinationDirectory, file.getName());
                Files.copy(file, destination);
                return destination;
            }
        }

        private File convertTextileFile(File file, File destinationDirectory, String path) throws IOException {
            InputStreamReader textileStreamReader = new FileReader(file);

            File destinationFile = new File(destinationDirectory, file.getName().substring(0, file.getName().length() - 8) + ".xml");

            try (OutputStreamWriter xmlStreamWriter = new FileWriter(destinationFile)) {
                HtmlDocumentBuilder documentBuilder = new HtmlDocumentBuilder(xmlStreamWriter);
                documentBuilder.setEmitAsDocument(false);
                MarkupParser textileParser = new MarkupParser(new TextileDialect(), documentBuilder);
                textileParser.parse(textileStreamReader);
            }

            return destinationFile;
        }

        private void indexFile(File file, String path) throws IOException {
            Document doc = new Document();
            //doc.add(new TextField("text", new FileReader(file)));
            doc.add(new StoredField("path", path));
            // TODO: locale?

            org.jsoup.nodes.Document jsoup = Jsoup.parse(file, "UTF-8");
            doc.add(new TextField("text", jsoup.text(), Field.Store.NO));
            Element title = jsoup.select("h1, h2").first();
            if (title != null) {
                doc.add(new StoredField("title", title.text()));
            }

            Element shortDescription = jsoup.select(".short").first();
            if (shortDescription != null) {
                doc.add(new StoredField("short", shortDescription.text()));
            }

            indexWriter.addDocument(doc);
        }

    }

}
