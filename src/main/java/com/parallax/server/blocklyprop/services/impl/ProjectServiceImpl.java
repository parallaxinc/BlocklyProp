/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.services.impl;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.google.inject.persist.Transactional;
import com.parallax.server.blocklyprop.TableOrder;
import com.parallax.server.blocklyprop.db.dao.ProjectDao;
import com.parallax.server.blocklyprop.db.enums.ProjectType;
import com.parallax.server.blocklyprop.db.generated.tables.records.ProjectRecord;
import com.parallax.server.blocklyprop.security.BlocklyPropSecurityUtils;
import com.parallax.server.blocklyprop.services.ProjectService;
import java.util.List;
import org.apache.shiro.authz.UnauthorizedException;

/**
 *
 * @author Michel
 */
@Singleton
@Transactional
public class ProjectServiceImpl implements ProjectService {

    private ProjectDao projectDao;

    @Inject
    public void setProjectDao(ProjectDao projectDao) {
        this.projectDao = projectDao;
    }

    @Override
    public ProjectRecord getProject(Long idProject) {
        ProjectRecord projectRecord = projectDao.getProject(idProject);
        if (projectRecord != null) {
            if (BlocklyPropSecurityUtils.getCurrentUserId().equals(projectRecord.getIdUser())) {
                return projectRecord;
            } else {
                throw new UnauthorizedException("Not the current user's project");
            }
        } else {
            return null;
        }
    }

    @Override
    public List<ProjectRecord> getUserProjects(Long idUser, TableOrder order, Integer limit, Integer offset) {
        if (BlocklyPropSecurityUtils.getCurrentUserId().equals(idUser)) {
            return projectDao.getUserProjects(idUser, order, limit, offset);
        } else {
            throw new UnauthorizedException();
        }
    }

    @Override
    public List<ProjectRecord> getSharedProjects(TableOrder order, Integer limit, Integer offset) {
        return projectDao.getSharedProjects(order, limit, offset);
    }

    @Override
    public int countUserProjects(Long idUser) {
        return projectDao.countUserProjects(idUser);
    }

    @Override
    public int countSharedProjects() {
        return projectDao.countSharedProjects();
    }

    @Override
    public ProjectRecord saveProjectWithCode(Long idProject, String name, String description, boolean privateProject, boolean sharedProject, ProjectType type, String code) {
        // Check if project is from the current user, if not, unset idProject and create new
        if (idProject != null) {
            return projectDao.updateProject(idProject, name, description, code, privateProject, sharedProject);
        } else {
            return projectDao.createProject(name, description, code, type, privateProject, sharedProject);
        }

    }

    @Override
    public ProjectRecord saveProject(Long idProject, String name, String description, boolean privateProject, boolean sharedProject, ProjectType type) {
        // Check if project is from the current user, if not, unset idProject and create new
        if (idProject != null) {
            return projectDao.updateProject(idProject, name, description, privateProject, sharedProject);
        } else {
            return projectDao.createProject(name, description, type, privateProject, sharedProject);
        }
    }

}
