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
import com.parallax.server.blocklyprop.services.ProjectSharingService;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.apache.shiro.authz.UnauthorizedException;

/**
 *
 * @author Michel
 */
@Singleton
@Transactional
public class ProjectServiceImpl implements ProjectService {

    private ProjectDao projectDao;
    private ProjectSharingService projectSharingService;

        
    /**
     * Application logging facility
     */
    private static final Logger LOG = LoggerFactory.getLogger(ProjectServiceImpl.class);


    @Inject
    public void setProjectDao(ProjectDao projectDao) {
        this.projectDao = projectDao;
    }

    @Inject
    public void setProjectSharingService(ProjectSharingService projectSharingService) {
        this.projectSharingService = projectSharingService;
    }

    
    /**
     * Create a new project record
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
    @Override
    public ProjectRecord createProject(
            String name, String description, String descriptionHtml, 
            boolean privateProject, boolean sharedProject, ProjectType type, 
            String board) {
        
        // Calling saveProject with a null project id will force underlying code
        // to create a new project
        return saveProject(
                null, name, description, descriptionHtml, privateProject, 
                sharedProject, type, board);
    }

    /**
     * Update an existing project or create a new project.
     * 
     * If the project id is not supplied, a new project will be created.
     * Otherwise, the supplied project id will be used to update that project.
     * 
     * Note: There are no sanity checks to ensure that we are updating the
     * correct project
     * .
     * @param idProject
     * @param name
     * @param description
     * @param descriptionHtml
     * @param privateProject
     * @param sharedProject
     * @param type
     * @param board
     * @return 
     */
    @Override
    public ProjectRecord saveProject(
            Long idProject, String name, String description, 
            String descriptionHtml, boolean privateProject, 
            boolean sharedProject, ProjectType type, String board) {
        
        // Check if project is from the current user, if not, unset idProject and create new
        if (idProject != null) {
            return projectDao.updateProject(
                    idProject, name, description, descriptionHtml, 
                    privateProject, sharedProject);
        } else {
            return projectDao.createProject(
                    name, description, descriptionHtml, type, board, 
                    privateProject, sharedProject);
        }
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
        
        LOG.info("Retrieving project record #{}", idProject);
        
        ProjectRecord projectRecord = projectDao.getProject(idProject);
        
        if (projectRecord != null) {
            if (projectRecord.getIdUser().equals(BlocklyPropSecurityUtils.getCurrentUserId()) || projectRecord.getShared()) {
                LOG.info("Returning project record #{}", projectRecord.getId());
                return projectRecord;
            } else {
                throw new UnauthorizedException("Not the current user's project");
            }
        } else {
            return null;
        }
    }

    @Override
    public List<ProjectRecord> getUserProjects(
            Long idUser, 
            TableSort sort, 
            TableOrder order, 
            Integer limit, 
            Integer offset) {
        
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
    public List<ProjectRecord> getSharedProjectsByUser(TableSort sort, TableOrder order, Integer limit, Integer offset, Long idUser) {
        return projectDao.getSharedProjectsByUser(sort, order, limit, offset, idUser);
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
    public int countSharedProjectsByUser(Long idUser) {
        return projectDao.countSharedProjectsByUser(idUser);
    }    

    @Override
    public ProjectRecord cloneProject(Long idProject) {
        return projectDao.cloneProject(idProject);
    }

    @Override
    public boolean deleteProject(Long idProject) {
        projectSharingService.revokeSharing(idProject);
        return projectDao.deleteProject(idProject);
    }

    @Override
    public ProjectRecord saveProjectCode(Long idProject, String code) {
        return projectDao.updateProjectCode(idProject, code);
    }

    @Override
    public ProjectRecord saveProjectCodeAs(Long idProject, String code, String newName) {
        return projectDao.saveProjectCodeAs(idProject, code, newName);
    }

}
