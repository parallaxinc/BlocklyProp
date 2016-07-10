/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.services;

import com.parallax.server.blocklyprop.db.generated.tables.records.ProjectSharingRecord;

/**
 *
 * @author Michel
 */
public interface ProjectSharingService {

    ProjectSharingRecord shareProject(Long idProject);

    int revokeSharing(Long idProject);

}
