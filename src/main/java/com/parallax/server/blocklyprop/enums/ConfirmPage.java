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
public enum ConfirmPage {

    ALREADY_CONFIRMED("already-confirmed"),
    CONFIRM_REQUESTED("confirm-requested"),
    CONFIRMED("confirmed");

    private final String page;

    private ConfirmPage(String page) {
        this.page = page;
    }

    public String getPage() {
        return page;
    }

}
