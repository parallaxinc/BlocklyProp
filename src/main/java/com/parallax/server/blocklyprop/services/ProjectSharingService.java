/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.services;

import com.parallax.server.blocklyprop.db.generated.tables.records.ProjectRecord;
import com.parallax.server.blocklyprop.db.generated.tables.records.ProjectSharingRecord;
import java.util.List;

/**
 *
 * @author Michel
 */
public interface ProjectSharingService {

    // Create a project_sharing record
    ProjectSharingRecord shareProject(Long idProject);

    // Delete a project_sharing record
    int revokeSharing(Long idProject);

    // Get a list of project_sharing records for a given project id
    List<ProjectSharingRecord> getSharingInfo(Long idProject);

    // Get a project project record only if the project id and shared key are equal
    ProjectRecord getSharedProject(Long idProject, String shareKey);

    // Delete a project sharing record
    boolean deleteSharedProject(Long idProject);

    // Get current active state of a project share link
    boolean isProjectShared(Long idProject);
    
}
