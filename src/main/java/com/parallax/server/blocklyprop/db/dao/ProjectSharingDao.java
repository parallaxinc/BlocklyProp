/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.db.dao;

import com.parallax.server.blocklyprop.db.generated.tables.records.ProjectSharingRecord;
import java.util.List;

/**
 *
 * @author Michel
 */
public interface ProjectSharingDao {

    ProjectSharingRecord getProject(Long idProject, String accessKey);

    ProjectSharingRecord shareProject(Long idProject, String shareKey);

    int revokeSharing(Long idProject);

    public List<ProjectSharingRecord> getSharingInfo(Long idProject);

}
