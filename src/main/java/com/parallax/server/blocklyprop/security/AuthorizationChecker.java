/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.security;

import com.google.common.hash.Hashing;
import com.parallax.server.blocklyprop.AuthenticationData;
import java.nio.charset.Charset;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author Michel
 */
public class AuthorizationChecker {

    private final static Logger log = LoggerFactory.getLogger(AuthorizationChecker.class);

    public static boolean check(ServletRequest servletRequest) {
        HttpServletRequest req = (HttpServletRequest) servletRequest;
        String authorization = req.getHeader("X-Authorization");
        String timestampString = req.getHeader("X-Timestamp");

        String remoteAddress = req.getRemoteAddr();
        String userAgent = req.getHeader("User-Agent");

        HttpSession session = req.getSession(true);

        return check(session, authorization, timestampString, remoteAddress, userAgent);
    }

    public static boolean check(HttpSession httpSession, String authorization, String timestampString, String remoteAddress, String userAgent) {
        Long timestamp = null;

        try {
            timestamp = Long.parseLong(timestampString);
        } catch (NumberFormatException nfe) {
            log.warn("Timestamp could not be parsed to long: {}", timestampString);
        }
        return check(httpSession, authorization, timestamp, remoteAddress, userAgent);
    }

    public static boolean check(HttpSession httpSession, String authorization, Long timestamp, String remoteAddress, String userAgent) {
        AuthenticationData authenticationData = (AuthenticationData) httpSession.getAttribute("authentication");
        if (authenticationData == null) {
            log.info("No authenticationdata in session");
            return false;
        }
        if (timestamp == null) {
            log.info("Timestamp not provided");
            return false;
        }

        if (authenticationData.getLastTimestamp() >= timestamp) {
            log.info("Timestamp to low: last: {} - provided: {}", authenticationData.getLastTimestamp(), timestamp);
            return false;
        } else {
            authenticationData.setLastTimestamp(timestamp);
            httpSession.setAttribute("authentication", authenticationData);
        }

        if (!(authenticationData.getRemoteAddress().equalsIgnoreCase(remoteAddress) && authenticationData.getUserAgent().equalsIgnoreCase(userAgent))) {
            log.info("User browser info changed");
            return false;
        }

        String permittedHash = Hashing.sha256().hashString(authenticationData.getToken() + authenticationData.getChallenge() + timestamp, Charset.forName("UTF-8")).toString();
        if (!permittedHash.equalsIgnoreCase(authorization)) {
            log.info("Authorization hash doesn't match: {} vs {}", permittedHash, authorization);
            log.info("Using token: {}, challenge: {}, Timestamp: {}", authenticationData.getToken(), authenticationData.getChallenge(), timestamp);
        }
        return permittedHash.equalsIgnoreCase(authorization);
    }

}
