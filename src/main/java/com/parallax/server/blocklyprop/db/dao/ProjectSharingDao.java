/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.db.dao;

import com.parallax.server.blocklyprop.db.generated.tables.ProjectSharing;
import com.parallax.server.blocklyprop.db.generated.tables.records.ProjectSharingRecord;
import java.util.List;

/**
 *
 * @author Michel
 */
public interface ProjectSharingDao {

    /**
     * Retrieve a project
     * @param idProject
     * @param accessKey
     * @return
     */
    ProjectSharingRecord getProject(Long idProject, String accessKey);


    /**
     * Share an existing project
     * @param idProject
     * @param shareKey
     * @return
     */
    ProjectSharingRecord shareProject(Long idProject, String shareKey);


    /**
     * Disable the shared link to a project
     * @param idProject
     * @return
     */
    int revokeSharing(Long idProject);


    /**
     * Get a project sharing record
     * @param idProject
     * @return
     */
    List<ProjectSharingRecord> getSharingInfo(Long idProject);
    
    // Set the active flag in an existing shared project record

    /**
     * Enable the project sharing link
     *
     * @param idProject
     * @return
     */
    ProjectSharingRecord activateProject(Long idProject);

    // Remove a project sharing link record

    /**
     * Delete a project sharing record
     *
     * @param idProject
     * @return
     */
    boolean deleteProjectSharingRecord(Long idProject);


    /**
     * Is the project sharing feature enabled for a project
     * @param idProject
     * @return
     */
    boolean isProjectSharingActive(Long idProject);
}
