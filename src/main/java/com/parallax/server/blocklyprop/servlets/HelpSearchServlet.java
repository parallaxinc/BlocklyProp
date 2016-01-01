/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.servlets;

import com.google.common.base.Strings;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.parallax.server.blocklyprop.security.BlocklyPropSecurityUtils;
import java.io.File;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.configuration.Configuration;
import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.apache.lucene.document.Document;
import org.apache.lucene.index.DirectoryReader;
import org.apache.lucene.queryparser.classic.ParseException;
import org.apache.lucene.queryparser.classic.QueryParser;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.ScoreDoc;
import org.apache.lucene.search.TopDocs;
import org.apache.lucene.store.FSDirectory;

/**
 *
 * @author Michel
 */
@Singleton
public class HelpSearchServlet extends HttpServlet {

    private static final String DEFAULT_LUCENE_DIRECTORY = "help-lucene";

    private Configuration configuration;

    private Analyzer analyzer = new StandardAnalyzer();
    private QueryParser parser = new QueryParser("text", analyzer);

    private FSDirectory directory;
    private DirectoryReader indexReader;
    private IndexSearcher indexSearcher;

    @Inject
    public void setConfiguration(Configuration configuration) {
        this.configuration = configuration;

    }

    private IndexSearcher initialize() {
        if (indexSearcher != null) {
            return indexSearcher;
        }
        try {
            File luceneIndexLocation = new File(new File(System.getProperty("user.home")), configuration.getString("help.lucene", DEFAULT_LUCENE_DIRECTORY));
            directory = FSDirectory.open(luceneIndexLocation.toPath());
            indexReader = DirectoryReader.open(directory);
            indexSearcher = new IndexSearcher(indexReader);
            return indexSearcher;
        } catch (IOException ex) {
            return null;
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String queryText = req.getParameter("query");
        if (Strings.isNullOrEmpty(queryText)) {
            req.getRequestDispatcher("/WEB-INF/servlet/help/help-results.jsp").forward(req, resp);
            return;
        }

        try {
            IndexSearcher indexSearcher = initialize();
            if (indexSearcher == null) {
                // TODO
                return;
            }

            Query query = parser.parse(queryText);
            TopDocs hits = indexSearcher.search(query, 10);

            if (hits.totalHits > 0) {
                StringBuilder s = new StringBuilder();

                for (ScoreDoc scoreDoc : hits.scoreDocs) {
                    Document document = indexSearcher.doc(scoreDoc.doc);
                    String title = document.get("title");
                    String shortDescription = document.get("short");
                    String path = document.get("path");

                    s.append("<div class='result'><div class='result-body'><h4><a href='help?f=").append(path).append("'>").append(title).append("</a></h4>");
                    if (shortDescription != null) {
                        s.append("<p>");
                        s.append(shortDescription);
                        s.append("</p>");
                    }
                    s.append("</div></div>");
                }

                req.setAttribute("html", s.toString());
                req.getRequestDispatcher("/WEB-INF/servlet/help/help-results.jsp").forward(req, resp);
            } else {
                req.getRequestDispatcher("/WEB-INF/servlet/help/help-results.jsp").forward(req, resp);
            }
        } catch (ParseException ex) {
            Logger.getLogger(HelpSearchServlet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    private String getLocale(HttpServletRequest req) {
        String language = req.getParameter("language");
        if (!Strings.isNullOrEmpty(language)) {
            return language;
        }
//        Object localeObject = req.getAttribute("language");
//        if (localeObject != null) {
//            System.out.println("Attribute locale not null: " + localeObject);
//            return String.valueOf(localeObject);
//        }
        Object localeObject = req.getSession().getAttribute("language");
        if (localeObject != null) {
            return String.valueOf(localeObject);
        }

        language = BlocklyPropSecurityUtils.getLocale();
        if (!Strings.isNullOrEmpty(language)) {
            return language;
        }
        return null;
    }

}
