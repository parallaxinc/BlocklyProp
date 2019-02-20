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

package com.parallax.server.blocklyprop.db.dao;

import com.parallax.server.blocklyprop.TableOrder;
import com.parallax.server.blocklyprop.TableSort;
import com.parallax.server.blocklyprop.db.enums.ProjectType;
import com.parallax.server.blocklyprop.db.generated.tables.records.ProjectRecord;
import java.util.List;

/**
 * Interface for the blocklyprop.project table
 * 
 * @author Michel
 * 
 * Fields:
 *  id:             Unique record number within the table
 * 
 * id_user:         Link to primary key in the blocklyprop.user table
 * 
 * id_clouduser:    Link to the primary key in the cloudsession.user table
 * 
 * name:            Project name
 * 
 * description:     Project description formatted in plain text
 * 
 * description_html:Project description formatted in HTML
 * 
 * code:            XML content that holds the project block structure
 * 
 * type:            Project source language (SPIN or PROPC) 
 * 
 * board:           Descriptor for the target device the project will use
 * 
 * private:         Flag to indicate if the project is visible to anyone but
 *                  the project owner. This flag is mutually exclusive with the
 *                  'shared' flag.
 * 
 * shared:          Flag to indicate if the project is available for viewing by
 *                  anyone. This flag is mutually exclusive with the 'private'
 *                  flag.
 * 
 * created:         Timestamp indicating when the project record was created.
 * 
 * modified:        Timestamp indicating when the project record was last changed.
 * 
 * based_on:        The id from the project that is the parent of the current
 *                  project record.
 * 
 */
public interface ProjectDao {

    /**
     * Retrieve a project based on the supplied project id
     *
     * @param idProject - unique project key id
     *
     * @return - a ProjectRecord object if the project is available or
     * a null if the project was not found or is not accessible to the
     * the user in the current session.
     */
    ProjectRecord getProject(Long idProject);



    /**
     * Create a new project record from the supplied details
     *
     * @param name
     * Project name
     *
     * @param description
     * Project description formatted in plain text
     *
     * @param descriptionHtml
     * Project description formatted in HTML
     *
     * @param code
     * XML content that holds the project block structure
     *
     * @param type
     * Project source language (SPIN or PROPC)
     *
     * @param board
     * Descriptor for the target device the project will use
     *
     * @param privateProject
     * Flag to indicate if the project is visible to anyone but the project owner
     *
     * @param sharedProject
     * Flag to indicate if the project is available for viewing by anyone
     *
     * @param idProjectBasedOn
     * The id from the project that is the parent of the current project record
     *
     * @return
     * a ProjectRecord object if the project is available, otherwise return a null
     */
    ProjectRecord createProject(
            String name, 
            String description, 
            String descriptionHtml, 
            String code, 
            ProjectType type, 
            String board, 
            boolean privateProject, 
            boolean sharedProject,
            Long idProjectBasedOn);



    /**
     *
     * @param name
     * @param description
     * @param descriptionHtml
     * @param type
     * @param board
     * @param privateProject
     * @param sharedProject
     * @return
     */
    ProjectRecord createProject(
            String name, 
            String description, 
            String descriptionHtml, 
            ProjectType type, 
            String board, 
            boolean privateProject, 
            boolean sharedProject);



    /**
     *
     * @param idProject
     * @param name
     * @param description
     * @param descriptionHtml
     * @param privateProject
     * @param sharedProject
     * @return
     */
    ProjectRecord updateProject(
            Long idProject, 
            String name, 
            String description, 
            String descriptionHtml, 
            boolean privateProject, 
            boolean sharedProject);



    /**
     *
     * @param idProject
     * @param name
     * @param description
     * @param descriptionHtml
     * @param code
     * @param privateProject
     * @param sharedProject
     * @return
     */
    ProjectRecord updateProject(
            Long idProject, 
            String name, 
            String description, 
            String descriptionHtml, 
            String code, 
            boolean privateProject, 
            boolean sharedProject);



    /**
     * Update the code in the selected project
     * TODO: The IDE is reporting that this method is never used. Verify and deprecate as needed.
     *
     * @param idProject
     * @param code
     * @return
     */
    ProjectRecord saveCode(
            Long idProject, 
            String code);



    /**
     * List community projects owned by a selected user
     * TODO: This appears to do the same work as the getSharedProjectsByUser method.
     *       Identify a need for both to exist or deprecate one of the methods.
     * @param idUser
     * @param sort
     * @param order
     * @param limit
     * @param offset
     * @return
     */
    List<ProjectRecord> getUserProjects(
            Long idUser, 
            TableSort sort, 
            TableOrder order, 
            Integer limit, 
            Integer offset);



    /**
     * Return a list of community projects
     *
     * @param sort
     * @param order
     * @param limit
     * @param offset
     * @return
     */
    List<ProjectRecord> getSharedProjects(
            TableSort sort, 
            TableOrder order, 
            Integer limit, 
            Integer offset);



    /**
     * List community projects owned by a selected user
     * TODO: This appears to do the same work as the overloaded getUserProjects.
     *       Figure it out and remove one.
     *
     * @param sort
     * @param order
     * @param limit
     * @param offset
     * @param idUser
     * @return
     */
    List<ProjectRecord> getSharedProjectsByUser(
            TableSort sort, 
            TableOrder order, 
            Integer limit, 
            Integer offset, 
            Long idUser);



    /**
     *
     * @param idUser
     * @return
     */
    int countUserProjects(Long idUser);



    /**
     *
     * @param idUser
     * @return
     */
    int countSharedProjects(Long idUser);



    /**
     *
     * @param idUser
     * @return
     */
    int countSharedProjectsByUser(Long idUser);



    /**
     *
     * @param idProject
     * @return
     */
    ProjectRecord cloneProject(Long idProject);



    /**
     *
     * @param idProject
     * @return
     */
    boolean deleteProject(Long idProject);



    /**
     *
     * @param idProject
     * @param code
     * @return
     */
    ProjectRecord updateProjectCode(
            Long idProject, 
            String code);



    /**
     *
     * @param idProject
     * @param code
     * @param newName
     * @param newBoard
     * @return
     */
    ProjectRecord saveProjectCodeAs(
            Long idProject, 
            String code, 
            String newName,
            String newBoard);

}
