/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.services.impl;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.google.inject.persist.Transactional;
import com.parallax.server.blocklyprop.db.dao.ProjectSharingDao;
import com.parallax.server.blocklyprop.db.generated.tables.records.ProjectSharingRecord;
import com.parallax.server.blocklyprop.services.ProjectSharingService;
import java.util.List;
import java.util.UUID;

/**
 *
 * @author Michel
 */
@Singleton
@Transactional
public class ProjectSharingServiceImpl implements ProjectSharingService {

    private ProjectSharingDao projectSharingDao;

    @Inject
    public void setProjectSharingDao(ProjectSharingDao projectSharingDao) {
        this.projectSharingDao = projectSharingDao;
    }

    @Override
    public ProjectSharingRecord shareProject(Long idProject) {
        String shareKey = UUID.randomUUID().toString();

        return projectSharingDao.shareProject(idProject, shareKey);
    }

    @Override
    public int revokeSharing(Long idProject) {
        return projectSharingDao.revokeSharing(idProject);
    }

    @Override
    public List<ProjectSharingRecord> getSharingInfo(Long idProject) {
        return projectSharingDao.getSharingInfo(idProject);
    }

}
