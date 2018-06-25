/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.db.dao;

import com.parallax.server.blocklyprop.TableOrder;
import com.parallax.server.blocklyprop.TableSort;
import com.parallax.server.blocklyprop.db.enums.ProjectType;
import com.parallax.server.blocklyprop.db.generated.tables.records.ProjectRecord;
import java.util.List;

/**
 * Interface for the blocklyprop.project table
 * 
 * @author Michel
 * 
 * Fields:
 *  id:             Unique record number within the table.
 * 
 * id_user:         Link to primary key in the blocklyprop.user table.
 * 
 * id_clouduser:    Link to the primary key in the cloudsession.user table.
 * 
 * name:            Project name
 * 
 * description:     Project description formatted in plain text
 * 
 * description_html:Project description formatted in HTML
 * 
 * code:            XML content that hold the project block structure.
 * 
 * type:            Project source language (SPIN or PROPC) 
 * 
 * board:           Descriptor for the target device the project will use.
 * 
 * private:         Flag to indicate if the project is visible to anyone but
 *                  the project owner.This flag is mutually exclusive with the
 *                  'shared' flag.
 * 
 * shared:          Flag to indicate if the project is available for viewing by
 *                  anyone.This flag is mutually exclusive with the 'private'
 *                  flag.
 * 
 * created:         Timestamp indicating when the project record was created.
 * 
 * modified:        Timestamp indicating when the project record was last changed.
 * 
 * based_on:        The id from the project that is the parent of the current
 *                  project record.
 * 
 */
public interface ProjectDao {

    ProjectRecord getProject(Long idProject);

    ProjectRecord createProject(
            String name, 
            String description, 
            String descriptionHtml, 
            String code, 
            ProjectType type, 
            String board, 
            boolean privateProject, 
            boolean sharedProject,
            Long idProjectBasedOn);

    ProjectRecord createProject(
            String name, 
            String description, 
            String descriptionHtml, 
            ProjectType type, 
            String board, 
            boolean privateProject, 
            boolean sharedProject);

    ProjectRecord updateProject(
            Long idProject, 
            String name, 
            String description, 
            String descriptionHtml, 
            boolean privateProject, 
            boolean sharedProject);

    ProjectRecord updateProject(
            Long idProject, 
            String name, 
            String description, 
            String descriptionHtml, 
            String code, 
            boolean privateProject, 
            boolean sharedProject);

    ProjectRecord saveCode(
            Long idProject, 
            String code);

    List<ProjectRecord> getUserProjects(
            Long idUser, 
            TableSort sort, 
            TableOrder order, 
            Integer limit, 
            Integer offset);

    // Return a list of community projects
    List<ProjectRecord> getSharedProjects(
            TableSort sort, 
            TableOrder order, 
            Integer limit, 
            Integer offset);

    List<ProjectRecord> getSharedProjectsByUser(
            TableSort sort, 
            TableOrder order, 
            Integer limit, 
            Integer offset, 
            Long idUser);

    int countUserProjects(Long idUser);

    int countSharedProjects(Long idUser);

    int countSharedProjectsByUser(Long idUser);

    ProjectRecord cloneProject(Long idProject);

    boolean deleteProject(Long idProject);

    ProjectRecord updateProjectCode(
            Long idProject, 
            String code);

    ProjectRecord saveProjectCodeAs(
            Long idProject, 
            String code, 
            String newName);

}
