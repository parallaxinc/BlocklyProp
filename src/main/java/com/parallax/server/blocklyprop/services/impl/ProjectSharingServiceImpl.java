/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.services.impl;

import com.parallax.server.blocklyprop.db.dao.ProjectDao;
import com.parallax.server.blocklyprop.db.dao.ProjectSharingDao;
import com.parallax.server.blocklyprop.db.generated.tables.records.ProjectRecord;
import com.parallax.server.blocklyprop.db.generated.tables.records.ProjectSharingRecord;
import com.parallax.server.blocklyprop.services.ProjectSharingService;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.google.inject.persist.Transactional;
import java.util.List;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author Michel
 */
@Singleton
@Transactional
public class ProjectSharingServiceImpl implements ProjectSharingService {

   /**
     * Application logging facility
     */
    private static final Logger LOG = LoggerFactory.getLogger(ProjectSharingService.class);

    private ProjectDao projectDao;
    private ProjectSharingDao projectSharingDao;

    // Inject dao connection to the project table
    @Inject
    public void setProjectDao(ProjectDao projectDao) {
        this.projectDao = projectDao;
    }

    // Inject connection to the project_sharing table
    @Inject
    public void setProjectSharingDao(ProjectSharingDao projectSharingDao) {
        this.projectSharingDao = projectSharingDao;
    }

    /*
     * Create a shared project key. If the shared project record does not exist,
     * the shareProject method will use the supplied key to create the record.
     * Otherwise, it will simply set the active flag in the existing
     * project_shared record
    */

    @Override
    public ProjectSharingRecord shareProject(Long idProject) {

        LOG.info("Sharing project: {}", idProject);
        
        List<ProjectSharingRecord> projectList = projectSharingDao.getSharingInfo(idProject);
        
        if (projectList == null | projectList.size() == 0) {
            LOG.debug("Project sharing record does not exist for project: {}.",
                    idProject);
            LOG.debug("Creating new project sharing link for project {}.",
                    idProject);
            
            // Create a shared project record
            return projectSharingDao.shareProject(
                    idProject,
                    UUID.randomUUID().toString());
        }
        
        LOG.debug("Activating project share for project: {}", idProject);
        
        // Project sharing record does exist. Activate it.
        return projectSharingDao.activateProject(projectList.get(0).getIdProject());
    }

    /**
     * Revoke the shared project ID
     * 
     * @param idProject
     * @return 
     */
    @Override
    public int revokeSharing(Long idProject) {
        LOG.info("Disabling shared link for project: {}", idProject);
        return projectSharingDao.revokeSharing(idProject);
    }

    @Override
    public List<ProjectSharingRecord> getSharingInfo(Long idProject) {

        LOG.debug("Looking for Project Sharing details for project {}", idProject);
        
        List<ProjectSharingRecord> records = projectSharingDao.getSharingInfo(idProject);

        if (records == null) {
            LOG.debug("No records found");
        } else {
            LOG.debug ("Found {} project sharing records.", records.size());
        }
        
        if (records != null && records.size() > 0) {
            // Get the first record. There should be no more than one,
            // but things happen
            ProjectSharingRecord record = records.get(0);
            
            LOG.debug("The record active state is:{} ", record.getActive());
            
            // If the first record is active, send back the list.
            if (record.getActive()) {
                LOG.debug("returning a record: {}", records);
                return records;
            }
        }
        
        LOG.debug("Returning without any records.");
        
        return null;
    }

    /*
     * Return a project record only if the project id and share key match, and
     * the active flag in the project_shared record is set to true (non-zero)
    */
    @Override
    public ProjectRecord getSharedProject(Long idProject, String shareKey) {
        LOG.debug("Getting active shared project record");
        
        ProjectSharingRecord projectSharingRecord = projectSharingDao.getProject(idProject, shareKey);
        
        if (projectSharingRecord != null) {
            if (projectSharingRecord.getActive()) {
                return projectDao.getProject(idProject);
            }
        }
        
        // Unable to return the shared project
        return null;
    }
    
    /**
     * Delete the shared project link record
     * 
     * @param idProject
     * @return 
     */
    @Override
    public boolean deleteSharedProject(Long idProject) {
        LOG.info("Deleting project share link for project {}", idProject);
        return projectSharingDao.deleteProjectSharingRecord(idProject);
    }
}
