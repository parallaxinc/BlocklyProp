/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eu.creatingfuture.propeller.blocklyprop.services.impl;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.google.inject.persist.Transactional;
import eu.creatingfuture.propeller.blocklyprop.db.dao.ProjectDao;
import eu.creatingfuture.propeller.blocklyprop.db.enums.ProjectType;
import eu.creatingfuture.propeller.blocklyprop.db.generated.tables.records.ProjectRecord;
import eu.creatingfuture.propeller.blocklyprop.services.ProjectService;
import java.util.List;

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
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public ProjectRecord createProject(String name, String description, String code, ProjectType type, boolean privateProject, boolean sharedProject) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public ProjectRecord createProject(String name, String description, ProjectType type, boolean privateProject, boolean sharedProject) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public ProjectRecord updateProject(Long idProject, String name, String description, boolean privateProject, boolean sharedProject) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public ProjectRecord updateProject(Long idProject, String name, String description, String code, boolean privateProject, boolean sharedProject) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public ProjectRecord saveCode(Long idProject, String code) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public List<ProjectRecord> getUserProjects(Long idUser) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

}
