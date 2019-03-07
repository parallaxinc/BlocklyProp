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
import org.apache.commons.lang.StringUtils;

/**
 * Implementation of project services layer
 *
 * @author Michel
 *
 * @implNote
 * Any method or class marked with the @Transactional decorator will be considered for
 * transactionality. Consult the documentation on https://github.com/google/guice/wiki/GuicePersist
 * for detailed semantics. Marking a method @Transactional will start a new transaction before
 * the method executes and commit it after the method returns.
 *
 * If the method throws an exception, the transaction will be rolled back unless you have specifically
 * requested not to in the ignore() clause.
 *
 * Similarly, the set of exceptions that will trigger a rollback can be defined in the rollbackOn()
 * clause. By default, only unchecked exceptions trigger a rollback.
 */
@Singleton
@Transactional
public class ProjectServiceImpl implements ProjectService {

    //Application logging facility
    private static final Logger LOG = LoggerFactory.getLogger(ProjectServiceImpl.class);

    // Object to store database layer access
    private ProjectDao projectDao;

    // Object to store project sharing service access
    private ProjectSharingService projectSharingService;


    /**
     * Inject support for DAO layer access
     *
     * @param projectDao object to store injected database layer access
     */
    @Inject
    public void setProjectDao(ProjectDao projectDao) {
        this.projectDao = projectDao;
    }


    /**
     * Inject support for access to the project sharing services
     *
     * @param projectSharingService object to store injected project sharing service access
     */
    @Inject
    public void setProjectSharingService(ProjectSharingService projectSharingService) {
        this.projectSharingService = projectSharingService;
    }

    
    /**
     * Create a new project record
     * <p>
     * This method signature is deprecated.
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
    @Deprecated
    @Override
    public ProjectRecord createProject(
            String name,
            String description,
            String descriptionHtml,
            boolean privateProject,
            boolean sharedProject,
            ProjectType type,
            String board) {

        // Calling saveProject with a null project id will force underlying code
        // to create a new project
        return saveProject(
                null, name, description, descriptionHtml, privateProject, 
                sharedProject, type, board);
    }


    /**
     *
     * @param name
     * @param description
     * @param descriptionHtml
     * @param projectCode
     * @param privateProject
     * @param sharedProject
     * @param type
     * @param board
     * @param settings
     * @return
     */
    @Override
    public ProjectRecord createProject(
            String name,
            String description,
            String descriptionHtml,
            String projectCode,
            boolean privateProject,
            boolean sharedProject,
            ProjectType type,
            String board,
            String settings) {

        return saveProject(
                null,
                name,
                description,
                descriptionHtml,
                projectCode,
                privateProject,
                sharedProject,
                type,
                board,
                settings);
        // FIXME: Add project code blocks string

    }



    @Override
    public ProjectRecord createProjectCopy(
            Long idSourceProject,
            String name,
            String description,
            String descriptionHtml,
            String code,
            ProjectType type,
            String board,
            String settings) {


        // local project details
        String projectName = null;
        String projectDescription = null;
        String projectDescriptionHtml = null;
        String projectCode = null;
        ProjectType projectType = null;
        String projectBoard = null;
        String projectSettings = null;


        // Obtain the source project
        LOG.info("Service retrieving project {} from database", idSourceProject);
        ProjectRecord sourceProject = projectDao.getProject(idSourceProject);

        if (sourceProject == null) {
            LOG.info("Project retrieval failed.");
            return null;
        }

        LOG.info("Got project #{}", sourceProject.getId());

        // Prepare date for new project
        try {
            projectName = (name != null && !name.trim().isEmpty()) ?
                    name : sourceProject.getName();

            projectDescription = (description != null && !description.trim().isEmpty()) ?
                    description : sourceProject.getDescription();

            projectDescriptionHtml = (descriptionHtml != null && !descriptionHtml.trim().isEmpty()) ?
                    descriptionHtml :
                    sourceProject.getDescriptionHtml();

            projectCode = (code != null && !code.trim().isEmpty()) ?
                    code : sourceProject.getCode();

            projectType = (type != null) ? type : sourceProject.getType();

            projectBoard = (board != null && !board.trim().isEmpty()) ?
                    board : sourceProject.getBoard();

            projectSettings = (settings != null && !settings.trim().isEmpty()) ?
                    settings : sourceProject.getSettings();

        }
        catch (NullPointerException ex) {
            LOG.info("Something is null and not a good thing");
        }

        LOG.info("Creating the new project copy");


        // Create a new project record
        ProjectRecord newProject = projectDao.createProject(
                projectName,
                projectDescription,
                projectDescriptionHtml,
                projectCode,
                projectType,
                projectBoard,
                true,  // Make it a private project
                false, // which means it is not shared
                idSourceProject,    // parent project is the source project
                projectSettings);


        LOG.info("Returning the new project");
        return newProject;
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
    @Deprecated
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
    public ProjectRecord saveProject(
            Long idProject, String name, String description, String descriptionHtml,
            String code,
            boolean privateProject,
            boolean sharedProject, ProjectType type, String board, String settings) {

        // Check if project is from the current user, if not, unset idProject and create new
        if (idProject != null) {
            return projectDao.updateProject(
                    idProject, name, description, descriptionHtml,
                    privateProject, sharedProject);
        } else {
            return projectDao.createProject(
                    name, description, descriptionHtml,
                    code,
                    type, board, privateProject, sharedProject,
                    null,
                    settings);
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
        
        // Retrieve the project record
        ProjectRecord projectRecord = projectDao.getProject(idProject);
        
        if (projectRecord != null) {
            LOG.info("Project {} found", projectRecord.getId());
    
            if (projectRecord.getShared()) {
                LOG.info("Returning community project record #{}", projectRecord.getId());
                return projectRecord;
            }else{
                if (projectRecord.getIdUser().equals(BlocklyPropSecurityUtils.getCurrentUserId())){
                LOG.info("Returning private project record #{}", projectRecord.getId());
                return projectRecord;
                } else {
                    throw new UnauthorizedException("Not the current user's project");
                }
            }
        } 
        
        // Project record is unavailable
        return null;
    }

    
    /**
     * Return a list of projects.
     * 
     * @param idUser
     * @param sort
     * @param order
     * @param limit
     * @param offset
     * @return 
     */
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

    
    /**
     * Obtain a list of community projects
     * 
     * @param sort
     * @param order
     * @param limit
     * @param offset
     * @return 
     */
    @Override
    public List<ProjectRecord> getSharedProjects(
            TableSort sort, 
            TableOrder order, 
            Integer limit, 
            Integer offset) {

        return projectDao.getSharedProjects(sort, order, limit, offset);
    }

    @Override
    public List<ProjectRecord> getSharedProjectsByUser(
            TableSort sort,
            TableOrder order,
            Integer limit,
            Integer offset,
            Long idUser) {

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

    
    /**
     * Delete a project
     * 
     * Remove the shared project link if one exists before removing the project.
     * 
     * @param idProject
     * @return 
     */
    @Override
    public boolean deleteProject(Long idProject) {
        
        LOG.info("Deleting project {}", idProject);
        
        // Remove the project shared key if it exists.
        projectSharingService.deleteSharedProject(idProject);

        return projectDao.deleteProject(idProject);
    }


    /**
     * Update the code block in the specified project
     *
     * @param idProject
     * @param code
     * @return
     */
    @Override
    public ProjectRecord saveProjectCode(Long idProject, String code) {
        return projectDao.updateProjectCode(idProject, code);
    }


    /**
     * Create a new project, specifying a new project name and board type, based on an existing project
     *
     * @param idProject  the primary key ID of the source project
     *
     * @param code is the code blocks to add to the new project
     *
     * @param newName is the nae that will be assigned to the new project
     *
     * @param newBoard is the new board type that will be assigned to the new project
     *
     * @return a ProjectRecord representing the newly created project
     */
    @Override
    public ProjectRecord saveProjectCodeAs(
            Long idProject,
            String code,
            String newName,
            String newBoard) {

        return projectDao.saveProjectCodeAs(idProject, code, newName, newBoard);
    }

}
