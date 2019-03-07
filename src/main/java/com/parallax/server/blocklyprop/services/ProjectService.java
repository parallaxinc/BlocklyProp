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

package com.parallax.server.blocklyprop.services;

import com.parallax.server.blocklyprop.TableOrder;
import com.parallax.server.blocklyprop.TableSort;
import com.parallax.server.blocklyprop.db.enums.ProjectType;
import com.parallax.server.blocklyprop.db.generated.tables.records.ProjectRecord;
import java.util.List;

/**
 * Interface definition for the project services layer
 *
 * @author Michel
 */
public interface ProjectService {

    //-------------
    //  Getters
    //-------------

    /**
     * Retrieve a project record keyed on the unique project id
     *
     * @param idProject Primary key id for the requested project
     * @return a ProjectRecord object if successful, otherwise null
     */
    ProjectRecord getProject(Long idProject);


    /**
     * Retrieve a project record keyed on the unique project id.
     * The requested record must be owned by the current user
     *
     * @param idProject Primary key id for the requested project
     * @return a ProjectRecord object if successful, otherwise null
     *
     * @implNote This method appears to be used only within the context of deleting
     * a project. In the current implementation, there is no concept of
     * an admin or superuser account or role that can delete projects on
     * a global scale.
     */
    ProjectRecord getProjectOwnedByThisUser(Long idProject);


    /**
     * Retrieve a list of projects owned by a specific user
     *
     * @param idUser
     * @param tablesSort
     * @param order
     * @param limit
     * @param offset
     *
     * @return
     */
    List<ProjectRecord> getUserProjects(
            Long idUser,
            TableSort tablesSort,
            TableOrder order,
            Integer limit,
            Integer offset);


    /**
     * Retrieve a list of public projects
     *
     * @param tablesSort
     * @param order
     * @param limit
     * @param offset
     *
     * @return
     */
    List<ProjectRecord> getSharedProjects(
            TableSort tablesSort,
            TableOrder order,
            Integer limit,
            Integer offset);


    /**
     * Retrieve a list of public projects owned by a specific user
     *
     * @param tablesSort
     * @param order
     * @param limit
     * @param offset
     * @param idUser
     * @return
     */
    List<ProjectRecord> getSharedProjectsByUser(
            TableSort tablesSort,
            TableOrder order,
            Integer limit,
            Integer offset,
            Long idUser);


    //-------------
    //   Create
    //-------------

    /**
     * Create a new project
     *
     * @param name
     * @param description
     * @param descriptionHtml
     * @param privateProject
     * @param sharedProject
     * @param type
     * @param board
     * @return
     */
    ProjectRecord createProject(
            String name,
            String description,
            String descriptionHtml,
            boolean privateProject,
            boolean sharedProject,
            ProjectType type,
            String board);



    ProjectRecord createProject(
            String name,
            String description,
            String descriptionHtml,
            String projectCode,
            boolean privateProject,
            boolean sharedProject,
            ProjectType type,
            String board,
            String settings);



    // Create a copy of an existing project overriding project elements
    // with those provided in the parameters supplied
    // -----------------------------------------------------------------
    ProjectRecord createProjectCopy(
            Long idSourceProject,
            String name,
            String description,
            String descriptionHtml,
            String projectCode,
            ProjectType type,
            String board,
            String settings);

    //-------------
    //   Count
    //-------------

    /**
     * Count the number of projects owned by a specific user
     *
     * @param idUser
     * @return
     */
    int countUserProjects(Long idUser);
    // TODO: Merge this method with the countSharedProjectsByUser method


    /**
     * Count the number of public projects
     *
     * @return
     */
    int countSharedProjects();


    /**
     * Count the number of public projects oned by a specific user
     *
     * @param idUser
     * @return
     */
    int countSharedProjectsByUser(Long idUser);


    //-------------
    //   Update
    //-------------

    /**
     * Update an existing project
     *
     * @param idProject
     * @param name
     * @param description
     * @param descriptionHtml
     * @param privateProject
     * @param sharedProject
     * @param type
     * @param board
     *
     * @return
     */
    @Deprecated
    ProjectRecord saveProject(
            Long idProject,
            String name,
            String description,
            String descriptionHtml,
            boolean privateProject,
            boolean sharedProject,
            ProjectType type,
            String board);

    ProjectRecord saveProject(
            Long idProject,
            String name,
            String description,
            String descriptionHtml,
            String projectCode,
            boolean privateProject,
            boolean sharedProject,
            ProjectType type,
            String board,
            String settings);


    /**
     * Save the code blocks for a specified project
     *
     * @param idProject
     * @param code
     *
     * @return
     */
    ProjectRecord saveProjectCode(Long idProject, String code);


    /**
     * Create a new project owned by the current user that is a copy of the original project
     *
     * @param idProject
     * @param code
     * @param newName
     * @param newBoard
     *
     * @return
     */
    ProjectRecord saveProjectCodeAs(Long idProject, String code, String newName, String newBoard);


    /**
     * Create a copy of the existing project into the current user's library
     *
     * @param idProject
     *
     * @return
     */
    ProjectRecord cloneProject(Long idProject);


    //-------------
    // Delete
    //-------------

    /**
     * Destroy the specified project only if the project is owned by the current user
     *
     * @param idProject
     * @return
     */
    boolean deleteProject(Long idProject);
}
