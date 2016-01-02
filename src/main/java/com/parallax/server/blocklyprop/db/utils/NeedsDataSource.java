/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.db.utils;

import javax.sql.DataSource;

/**
 *
 * @author Michel
 */
public interface NeedsDataSource {

    void setDataSource(DataSource dataSource);

}
