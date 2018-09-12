/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.db.dao.impl;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.parallax.server.blocklyprop.db.dao.ProjectSharingDao;
import com.parallax.server.blocklyprop.db.generated.Tables;
import com.parallax.server.blocklyprop.db.generated.tables.records.ProjectSharingRecord;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.jooq.DSLContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;



/**
 *
 * @author Michel
 */
@Singleton
public class ProjectSharingDaoImpl implements ProjectSharingDao {
    
   /**
     * Application logging facility
     */
    private static final Logger LOG = LoggerFactory.getLogger(ProjectSharingDaoImpl.class);

    private DSLContext create;

    @Inject
    public void setDSLContext(DSLContext dsl) {
        this.create = dsl;
    }

    
    /**
     * 
     * @param idProject
     * @param accessKey
     * @return 
     */
    @Override
    public ProjectSharingRecord getProject(Long idProject, String accessKey) {
        
        return create
                .selectFrom(Tables.PROJECT_SHARING)
                .where(Tables.PROJECT_SHARING.ID_PROJECT
                        .equal(idProject)
                        .and(Tables.PROJECT_SHARING.SHAREKEY
                                .equal(accessKey)
                        )
                )
                .fetchOne();
    }

    
    /**
     * 
     * @param idProject
     * @param shareKey
     * @return 
     */
    @Override
    public ProjectSharingRecord shareProject(Long idProject, String shareKey) {
        
        return create
                .insertInto(Tables.PROJECT_SHARING)
                .columns(
                        Tables.PROJECT_SHARING.ID_PROJECT, 
                        Tables.PROJECT_SHARING.SHAREKEY,
                        Tables.PROJECT_SHARING.ACTIVE
                )
                .values(
                        idProject, 
                        shareKey,
                        true
                )
                .returning()
                .fetchOne();
    }

    
    /**
     * 
     * @param idProject
     * @return 
     */
    @Override
    public int revokeSharing(Long idProject) {

        // Retreive the project sharing record
        ProjectSharingRecord project = create
                .selectFrom(Tables.PROJECT_SHARING)
                .where(Tables.PROJECT_SHARING.ID_PROJECT
                        .equal(idProject))
                .fetchOne();
        
        if (project != null) {
            project.setActive(false);
            project.update();
        }
           
        return 1;
/*      
        return create
                .deleteFrom(Tables.PROJECT_SHARING)
                .where(Tables.PROJECT_SHARING.ID_PROJECT
                        .equal(idProject))
              .execute();
        */
    }

    
    /**
     * Return the project sharing details for an individual project
     * 
     * @param idProject
     * @return 
     */
    @Override
    public List<ProjectSharingRecord> getSharingInfo(Long idProject) {
        
        return create
                .selectFrom(Tables.PROJECT_SHARING)
                .where((Tables.PROJECT_SHARING.ID_PROJECT
                        .equal(idProject)))
                .fetch();
    }
    
    
    /**
     * Set the project sharing status to active
     * @param idProject
     * @return 
     */
    @Override
    public ProjectSharingRecord activateProject(Long idProject) {
        LOG.info("Locating project sharing record for project: {}", idProject);
        
        ProjectSharingRecord project = create
                .selectFrom(Tables.PROJECT_SHARING)
                .where(Tables.PROJECT_SHARING.ID_PROJECT
                        .equal(idProject))
                .fetchOne();
        
        if (project == null) {
            LOG.info("Unable to locate prject sharing record for project: " + idProject);
            return null;
        }else{
            project.setActive(true);
            project.update();
            
            LOG.info("Project active state is now: {}", project.getActive());
        }
        
        return project;
    }

    /**
     * Remove any project sharing records related to the specified project
     * 
     * @param idProject
     * @return 
     */
    @Override
    public boolean deleteProjectSharingRecord(Long idProject) {
        LOG.info("Delete sharing record for project {}.", idProject);
        
        return create.deleteFrom(Tables.PROJECT_SHARING)
                .where(Tables.PROJECT_SHARING.ID_PROJECT.equal(idProject))
                .execute() > 0;

    }

}
