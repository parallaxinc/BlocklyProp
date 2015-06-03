/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eu.creatingfuture.propeller.blocklyprop.db.dao.impl;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import eu.creatingfuture.propeller.blocklyprop.db.dao.ProjectDao;
import eu.creatingfuture.propeller.blocklyprop.db.enums.ProjectType;
import eu.creatingfuture.propeller.blocklyprop.db.generated.Tables;
import eu.creatingfuture.propeller.blocklyprop.db.generated.tables.records.ProjectRecord;
import eu.creatingfuture.propeller.blocklyprop.security.BlocklyPropSecurityUtils;
import java.util.List;
import org.apache.shiro.authz.UnauthorizedException;
import org.jooq.DSLContext;

/**
 *
 * @author Michel
 */
@Singleton
public class ProjectDaoImpl implements ProjectDao {

    private DSLContext create;

    @Inject
    public void setDSLContext(DSLContext dsl) {
        this.create = dsl;
    }

    @Override
    public ProjectRecord getProject(Long idProject) {
        return create.selectFrom(Tables.PROJECT).where(Tables.PROJECT.ID.equal(idProject)).fetchOne();
    }

    private ProjectRecord getProject(Long idProject, boolean toEdit) {
        ProjectRecord record = create.selectFrom(Tables.PROJECT).where(Tables.PROJECT.ID.equal(idProject)).fetchOne();
        if (record != null) {
            Long idUser = BlocklyPropSecurityUtils.getCurrentUserId();
            if (record.getIdUser().equals(idUser)) {
                return record;
            } else {
                throw new UnauthorizedException();
            }

        }

        return record;
    }

    @Override
    public ProjectRecord createProject(String name, String description, String code, ProjectType type, boolean privateProject, boolean sharedProject) {
        Long idUser = BlocklyPropSecurityUtils.getCurrentUserId();
        ProjectRecord record = create.insertInto(Tables.PROJECT, Tables.PROJECT.ID_USER, Tables.PROJECT.NAME, Tables.PROJECT.DESCRIPTION, Tables.PROJECT.CODE, Tables.PROJECT.TYPE, Tables.PROJECT.PRIVATE, Tables.PROJECT.SHARED)
                .values(idUser, name, description, code, type, privateProject, sharedProject).returning().fetchOne();

        return record;
    }

    @Override
    public ProjectRecord createProject(String name, String description, ProjectType type, boolean privateProject, boolean sharedProject) {
        return createProject(name, description, "", type, privateProject, sharedProject);
    }

    @Override
    public ProjectRecord updateProject(Long idProject, String name, String description, boolean privateProject, boolean sharedProject) {
        ProjectRecord record = getProject(idProject, true);
        if (record != null) {
            record.setName(name);
            record.setDescription(description);
            record.setPrivate(privateProject);
            record.setShared(sharedProject);
            ProjectRecord returningRecord = create.update(Tables.PROJECT).set(record).returning().fetchOne();
            return returningRecord;
        }
        return null;
    }

    @Override
    public ProjectRecord updateProject(Long idProject, String name, String description, String code, boolean privateProject, boolean sharedProject) {
        ProjectRecord record = getProject(idProject, true);
        if (record != null) {
            record.setName(name);
            record.setDescription(description);
            record.setCode(code);
            record.setPrivate(privateProject);
            record.setShared(sharedProject);
            ProjectRecord returningRecord = create.update(Tables.PROJECT).set(record).returning().fetchOne();
            return returningRecord;
        }
        return null;
    }

    @Override
    public ProjectRecord saveCode(Long idProject, String code) {
        ProjectRecord record = getProject(idProject, true);
        if (record != null) {
            record.setCode(code);
            ProjectRecord returningRecord = create.update(Tables.PROJECT).set(record).returning().fetchOne();
            return returningRecord;
        }
        return null;
    }

    @Override
    public List<ProjectRecord> getUserProjects(Long idUser) {
        return create.selectFrom(Tables.PROJECT).where(Tables.PROJECT.ID_USER.equal(idUser)).fetch();
    }

}
