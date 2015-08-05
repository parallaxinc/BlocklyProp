/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.services;

import com.parallax.server.blocklyprop.TableOrder;
import com.parallax.server.blocklyprop.db.enums.ProjectType;
import com.parallax.server.blocklyprop.db.generated.tables.records.ProjectRecord;
import java.util.List;

/**
 *
 * @author Michel
 */
public interface ProjectService {

    ProjectRecord getProject(Long idProject);

    List<ProjectRecord> getUserProjects(Long idUser, TableOrder order, Integer limit, Integer offset);

    List<ProjectRecord> getSharedProjects(TableOrder order, Integer limit, Integer offset);

    int countUserProjects(Long idUser);

    int countSharedProjects();

    ProjectRecord saveProjectWithCode(Long idProject, String name, String description, boolean privateProject, boolean sharedProject, ProjectType type, String board, String code);

    ProjectRecord saveProject(Long idProject, String name, String description, boolean privateProject, boolean sharedProject, ProjectType type, String board);

}
