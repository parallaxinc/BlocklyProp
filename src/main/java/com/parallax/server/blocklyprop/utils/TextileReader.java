/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.utils;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StringWriter;
import net.java.textilej.parser.MarkupParser;
import net.java.textilej.parser.builder.HtmlDocumentBuilder;
import net.java.textilej.parser.markup.textile.TextileDialect;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

/**
 *
 * @author Michel
 */
public class TextileReader {

    public String readFile(String document, String locale, boolean isSecure) throws IOException {
        InputStreamReader textileStreamReader = getTextileFileReader(document, locale);

        if (textileStreamReader != null) {
            StringWriter out = new StringWriter();
            HtmlDocumentBuilder documentBuilder = new HtmlDocumentBuilder(out);
            documentBuilder.setEmitAsDocument(false);
            MarkupParser textileParser = new MarkupParser(new TextileDialect(), documentBuilder);
            textileParser.parse(textileStreamReader);

            Document doc = Jsoup.parse(out.toString());
            Elements links = doc.select("a.cdn");
            for (Element link : links) {
                String url = link.attr("href");
                link.attr("href", ServletUtils.getCdnUrl(url, isSecure));
            }
            Elements images = doc.select("img.cdn");
            for (Element image : images) {
                String url = image.attr("src");
                image.attr("src", ServletUtils.getCdnUrl(url, isSecure));
            }

            return doc.html();
        }
        return null;
    }

    private InputStreamReader getTextileFileReader(String document, String locale) {
        if (getClass().getResource("/documents/" + document + "_" + locale + ".textile") != null) {
            return new InputStreamReader(getClass().getResourceAsStream("/documents/" + document + "_" + locale + ".textile"));
        } else if (getClass().getResource("/documents/" + document + ".textile") != null) {
            return new InputStreamReader(getClass().getResourceAsStream("/documents/" + document + ".textile"));
        }
        return null;
    }

}
