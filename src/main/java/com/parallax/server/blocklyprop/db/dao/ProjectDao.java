/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.db.dao;

import com.parallax.server.blocklyprop.TableOrder;
import com.parallax.server.blocklyprop.db.enums.ProjectType;
import com.parallax.server.blocklyprop.db.generated.tables.records.ProjectRecord;
import java.util.List;

/**
 *
 * @author Michel
 */
public interface ProjectDao {

    ProjectRecord getProject(Long idProject);

    ProjectRecord createProject(String name, String description, String code, ProjectType type, String board, boolean privateProject, boolean sharedProject);

    ProjectRecord createProject(String name, String description, ProjectType type, String board, boolean privateProject, boolean sharedProject);

    ProjectRecord updateProject(Long idProject, String name, String description, boolean privateProject, boolean sharedProject);

    ProjectRecord updateProject(Long idProject, String name, String description, String code, boolean privateProject, boolean sharedProject);

    ProjectRecord saveCode(Long idProject, String code);

    List<ProjectRecord> getUserProjects(Long idUser, TableOrder order, Integer limit, Integer offset);

    List<ProjectRecord> getSharedProjects(TableOrder order, Integer limit, Integer offset);

    int countUserProjects(Long idUser);

    int countSharedProjects();

    ProjectRecord cloneProject(Long idProject);

    boolean deleteProject(Long idProject);

}
