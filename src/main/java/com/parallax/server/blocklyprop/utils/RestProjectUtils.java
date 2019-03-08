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

package com.parallax.server.blocklyprop.utils;

import com.parallax.server.blocklyprop.TableOrder;
import com.parallax.server.blocklyprop.TableSort;
import com.parallax.server.blocklyprop.db.enums.ProjectType;


/**
 *  Project REST endpoint static utility methods
 */
public class RestProjectUtils {

    /**
     * Validate that the provided value represents a valid column name on which to sort
     * a list of projects
     *
     * @param sort is the column name to sort on. Note that not all project columns are
     *             sortable.
     *
     * @return a boolean true if the supplied value matches a sortable column, otherwise
     * return a boolean false value
     */
    public static boolean ValidateSortType(TableSort sort) {

        if (sort != null) {
            for (TableSort t : TableSort.values()) {
                if (sort == t) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Validate the provided sort order.
     *
     * @param order Project sort order
     *
     * @return true if the sort order is valid, otherwise false
     *
     */
    public static boolean ValidateSortOrder(TableOrder order) {

        if (order != null) {
            for (TableOrder t : TableOrder.values()) {
                if (order == t) {
                    return true;
                }
            }
        }

        return false;
    }


    /**
     * Validate the project language
     *
     * @param type is a ProjectType that indicates the underlying language used for the project
     *
     * @return true if the project type is a known type, otherwise return false
     */
    public static boolean ValidateProjectType(ProjectType type) {

        if (type != null) {
            for (ProjectType p : ProjectType.values()) {
                if (type == p) {
                    return true;
                }
            }
        }

        return false;
    }
}
