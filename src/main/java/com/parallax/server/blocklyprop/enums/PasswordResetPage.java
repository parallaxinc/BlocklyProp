/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.enums;

/**
 *
 * @author Michel
 */
public enum PasswordResetPage {

    RESET_DONE("reset-done"),
    RESET_REQUESTED("reset-requested");

    private final String page;

    private PasswordResetPage(String page) {
        this.page = page;
    }

    public String getPage() {
        return page;
    }

}
