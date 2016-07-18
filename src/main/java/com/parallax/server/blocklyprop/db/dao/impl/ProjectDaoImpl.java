/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.db.dao.impl;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.parallax.server.blocklyprop.TableOrder;
import com.parallax.server.blocklyprop.TableSort;
import com.parallax.server.blocklyprop.db.dao.ProjectDao;
import com.parallax.server.blocklyprop.db.enums.ProjectType;
import com.parallax.server.blocklyprop.db.generated.Tables;
import com.parallax.server.blocklyprop.db.generated.tables.records.ProjectRecord;
import com.parallax.server.blocklyprop.security.BlocklyPropSecurityUtils;
import java.util.List;
import org.apache.shiro.authz.UnauthorizedException;
import org.jooq.Condition;
import org.jooq.DSLContext;
import org.jooq.SortField;

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
            if (!toEdit || record.getIdUser().equals(idUser)) {
                return record;
            } else {
                throw new UnauthorizedException();
            }

        }

        return record;
    }

    @Override
    public ProjectRecord createProject(String name, String description, String descriptionHtml, String code, ProjectType type, String board, boolean privateProject, boolean sharedProject) {
        Long idUser = BlocklyPropSecurityUtils.getCurrentUserId();
        Long idCloudUser = BlocklyPropSecurityUtils.getCurrentSessionUserId();
        ProjectRecord record = create.insertInto(Tables.PROJECT, Tables.PROJECT.ID_USER, Tables.PROJECT.ID_CLOUDUSER, Tables.PROJECT.NAME, Tables.PROJECT.DESCRIPTION, Tables.PROJECT.DESCRIPTION_HTML, Tables.PROJECT.CODE, Tables.PROJECT.TYPE, Tables.PROJECT.BOARD, Tables.PROJECT.PRIVATE, Tables.PROJECT.SHARED)
                .values(idUser, idCloudUser, name, description, descriptionHtml, code, type, board, privateProject, sharedProject).returning().fetchOne();

        return record;
    }

    @Override
    public ProjectRecord createProject(String name, String description, String descriptionHtml, ProjectType type, String board, boolean privateProject, boolean sharedProject) {
        return createProject(name, description, descriptionHtml, "", type, board, privateProject, sharedProject);
    }

    @Override
    public ProjectRecord updateProject(Long idProject, String name, String description, String descriptionHtml, boolean privateProject, boolean sharedProject) {
        ProjectRecord record = getProject(idProject, true);
        if (record != null) {
            record.setName(name);
            record.setDescription(description);
            record.setDescriptionHtml(descriptionHtml);
            record.setPrivate(privateProject);
            record.setShared(sharedProject);
            record.update();
            return record;
        }
        return null;
    }

    @Override
    public ProjectRecord updateProject(Long idProject, String name, String description, String descriptionHtml, String code, boolean privateProject, boolean sharedProject) {
        ProjectRecord record = getProject(idProject, true);
        if (record != null) {
            record.setName(name);
            record.setDescription(description);
            record.setDescriptionHtml(descriptionHtml);
            record.setCode(code);
            record.setPrivate(privateProject);
            record.setShared(sharedProject);
            record.update();
            return record;
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
    public List<ProjectRecord> getUserProjects(Long idUser, TableSort sort, TableOrder order, Integer limit, Integer offset) {
        SortField<String> orderField = Tables.PROJECT.NAME.asc();
        if (TableOrder.desc == order) {
            orderField = Tables.PROJECT.NAME.desc();
        }
        return create.selectFrom(Tables.PROJECT).where(Tables.PROJECT.ID_USER.equal(idUser)).orderBy(orderField).limit(limit).offset(offset).fetch();
    }

    @Override
    public List<ProjectRecord> getSharedProjects(TableSort sort, TableOrder order, Integer limit, Integer offset, Long idUser) {
        SortField<?> orderField = sort == null ? Tables.PROJECT.NAME.asc() : sort.getField().asc();
        if (TableOrder.desc == order) {
            orderField = sort == null ? Tables.PROJECT.NAME.desc() : sort.getField().desc();
        }
        Condition conditions = Tables.PROJECT.SHARED.eq(Boolean.TRUE);
        if (idUser != null) {
            conditions = conditions.or(Tables.PROJECT.ID_USER.eq(idUser));
        }
        return create.selectFrom(Tables.PROJECT).where(conditions).orderBy(orderField).limit(limit).offset(offset).fetch();
    }

    @Override
    public int countUserProjects(Long idUser) {
        return create.fetchCount(Tables.PROJECT, Tables.PROJECT.ID_USER.equal(idUser));
    }

    @Override
    public int countSharedProjects(Long idUser) {
        Condition conditions = Tables.PROJECT.SHARED.equal(Boolean.TRUE);
        if (idUser != null) {
            conditions = conditions.or(Tables.PROJECT.ID_USER.eq(idUser));
        }
        return create.fetchCount(Tables.PROJECT, conditions);
    }

    @Override
    public ProjectRecord cloneProject(Long idProject) {
        ProjectRecord original = getProject(idProject);
        if (original == null) {
            throw new NullPointerException("Project doesn't exist");
        }
        Long idUser = BlocklyPropSecurityUtils.getCurrentUserId();
        if (original.getIdUser().equals(idUser) || original.getShared()) {
            return doProjectClone(original);
        }
        return null;
    }

    private ProjectRecord doProjectClone(ProjectRecord original) {
        ProjectRecord cloned = createProject(original.getName(), original.getDescription(), original.getDescriptionHtml(), original.getCode(), original.getType(), original.getBoard(), original.getPrivate(), original.getShared());
        cloned.setBasedOn(original.getId());
        return cloned;
    }

    @Override
    public boolean deleteProject(Long idProject) {
        ProjectRecord project = getProject(idProject);
        project.delete();
        return true;
    }

    @Override
    public ProjectRecord updateProjectCode(Long idProject, String code) {
        ProjectRecord record = create.selectFrom(Tables.PROJECT).where(Tables.PROJECT.ID.equal(idProject)).fetchOne();
        if (record != null) {
            Long idUser = BlocklyPropSecurityUtils.getCurrentUserId();
            if (record.getIdUser().equals(idUser)) {
                record.setCode(code);
                record.update();
                return record;
            } else {
                if (record.getShared()) {
                    ProjectRecord cloned = doProjectClone(record);
                    cloned.setCode(code);
                    cloned.update();
                    return cloned;
                }
                throw new UnauthorizedException();
            }
        } else {
            return null;
        }
    }

}
