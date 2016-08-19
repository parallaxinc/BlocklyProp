/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop;

import com.parallax.server.blocklyprop.db.generated.Tables;
import com.parallax.server.blocklyprop.db.generated.tables.records.ProjectRecord;
import org.jooq.TableField;

/**
 *
 * @author Michel
 */
public enum TableSort {

    type(Tables.PROJECT.TYPE),
    name(Tables.PROJECT.NAME),
    board(Tables.PROJECT.BOARD),
    user(Tables.PROJECT.ID_USER),
    modified(Tables.PROJECT.MODIFIED);

    private final TableField<ProjectRecord, ?> field;

    private TableSort(TableField<ProjectRecord, ?> field) {
        this.field = field;
    }

    public TableField<ProjectRecord, ?> getField() {
        return field;
    }

}
