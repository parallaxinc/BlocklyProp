/*
 * Copyright (c) 2019 Parallax Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the “Software”), to deal in the Software without
 * restriction, including without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

package com.parallax.server.blocklyprop;

import com.parallax.server.blocklyprop.db.generated.Tables;
import com.parallax.server.blocklyprop.db.generated.tables.records.ProjectRecord;
import org.jooq.TableField;

/**
 * A list of the possible fields on which to sort project data
 *
 * @author Michel
 */
public enum TableSort {

    type(Tables.PROJECT.TYPE),
    name(Tables.PROJECT.NAME),
    board(Tables.PROJECT.BOARD),
    user(Tables.PROJECT.ID_USER),
    modified(Tables.PROJECT.MODIFIED);

    // Map this enum to a Field in the JooQ ProjectRecord class
    private final TableField<ProjectRecord, ?> field;

    TableSort(TableField<ProjectRecord, ?> field) {
        this.field = field;
    }

    public TableField<ProjectRecord, ?> getField() {
        return field;
    }
}
