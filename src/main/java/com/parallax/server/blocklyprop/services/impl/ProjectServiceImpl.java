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
import com.parallax.server.blocklyprop.TableSort;
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
    public ProjectRecord getProjectOwnedByThisUser(Long idProject) {
        ProjectRecord projectRecord = projectDao.getProject(idProject);
        if (projectRecord != null) {
            if (projectRecord.getIdUser().equals(BlocklyPropSecurityUtils.getCurrentUserId())) {
                return projectRecord;
            } else {
                throw new UnauthorizedException("Not the current user's project");
            }
        } else {
            return null;
        }
    }

    @Override
    public ProjectRecord getProject(Long idProject) {
        ProjectRecord projectRecord = projectDao.getProject(idProject);
        if (projectRecord != null) {
            if (projectRecord.getIdUser().equals(BlocklyPropSecurityUtils.getCurrentUserId()) || projectRecord.getShared()) {
                return projectRecord;
            } else {
                throw new UnauthorizedException("Not the current user's project");
            }
        } else {
            return null;
        }
    }

    @Override
    public List<ProjectRecord> getUserProjects(Long idUser, TableSort sort, TableOrder order, Integer limit, Integer offset) {
        Long idCurrentUser = BlocklyPropSecurityUtils.getCurrentUserId();
        if (idCurrentUser == null) {
            throw new UnauthorizedException();
        }
        if (idCurrentUser.equals(idUser)) {
            return projectDao.getUserProjects(idUser, sort, order, limit, offset);
        } else {
            throw new UnauthorizedException();
        }
    }

    @Override
    public List<ProjectRecord> getSharedProjects(TableSort sort, TableOrder order, Integer limit, Integer offset) {
        return projectDao.getSharedProjects(sort, order, limit, offset, BlocklyPropSecurityUtils.getCurrentUserId());
    }

    @Override
    public int countUserProjects(Long idUser) {
        return projectDao.countUserProjects(idUser);
    }

    @Override
    public int countSharedProjects() {
        return projectDao.countSharedProjects(BlocklyPropSecurityUtils.getCurrentUserId());
    }

    @Override
    public ProjectRecord saveProject(Long idProject, String name, String description, String descriptionHtml, boolean privateProject, boolean sharedProject, ProjectType type, String board) {
        // Check if project is from the current user, if not, unset idProject and create new
        if (idProject != null) {
            return projectDao.updateProject(idProject, name, description, descriptionHtml, privateProject, sharedProject);
        } else {
            return projectDao.createProject(name, description, descriptionHtml, type, board, privateProject, sharedProject);
        }
    }

    @Override
    public ProjectRecord cloneProject(Long idProject) {
        return projectDao.cloneProject(idProject);
    }

    @Override
    public ProjectRecord createProject(String name, String description, String descriptionHtml, boolean privateProject, boolean sharedProject, ProjectType type, String board) {
        return saveProject(null, name, description, descriptionHtml, privateProject, sharedProject, type, board);
    }

    @Override
    public boolean deleteProject(Long idProject) {
        return projectDao.deleteProject(idProject);
    }

    @Override
    public ProjectRecord saveProjectCode(Long idProject, String code) {
        return projectDao.updateProjectCode(idProject, code);
    }

}
