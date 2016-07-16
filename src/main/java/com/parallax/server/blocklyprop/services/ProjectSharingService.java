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

    ProjectSharingRecord shareProject(Long idProject);

    int revokeSharing(Long idProject);

    List<ProjectSharingRecord> getSharingInfo(Long idProject);

    ProjectRecord getSharedProject(Long idProject, String shareKey);

}
