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
import java.util.GregorianCalendar;
import java.util.List;
import org.apache.shiro.authz.UnauthorizedException;
import org.jooq.Condition;
import org.jooq.DSLContext;
import org.jooq.SortField;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author Michel
 */
@Singleton
public class ProjectDaoImpl implements ProjectDao {
    private static final Logger LOG = LoggerFactory.getLogger(ProjectDao.class);
    private DSLContext create;

    @Inject
    public void setDSLContext(DSLContext dsl) {
        this.create = dsl;
    }

    // Swap out old block definitions
    private ProjectRecord alterReadRecord(ProjectRecord record) {
        LOG.info("Updating outdated block definitions");
        String newCode;
        
        if (record == null) {
            LOG.error("Null project record detected.");
            throw new NullPointerException("Cannot alter a null project record.");
        }

        try {
            newCode = record.getCode();

            // Return immediately if there is no code to adjust
            if (newCode == null) {
                return record;
            }
            
            if (record.getType() == ProjectType.SPIN) {
                newCode = newCode.replaceAll("block type=\"controls_if\"", "block type=\"controls_boolean_if\"");
                newCode = newCode.replaceAll("block type=\"logic_compare\"", "block type=\"logic_boolean_compare\"");
                newCode = newCode.replaceAll("block type=\"logic_operation\"", "block type=\"logic_boolean_operation\"");
                newCode = newCode.replaceAll("block type=\"logic_negate\"", "block type=\"logic_boolean_negate\"");
                newCode = newCode.replaceAll("block type=\"math_number\"", "block type=\"spin_integer\"");
            } else if (record.getType() == ProjectType.PROPC){
                newCode = newCode.replaceAll("field name=\"OP\">ADD</field", "field name=\"OP\"> + </field");
                newCode = newCode.replaceAll("field name=\"OP\">MINUS</field", "field name=\"OP\"> - </field");
                newCode = newCode.replaceAll("field name=\"OP\">MULTIPLY</field", "field name=\"OP\"> * </field");
                newCode = newCode.replaceAll("field name=\"OP\">DIVIDE</field", "field name=\"OP\"> / </field");
                newCode = newCode.replaceAll("field name=\"OP\">MODULUS</field", "field name=\"OP\"> % </field");
                newCode = newCode.replaceAll("field name=\"OP\">AND</field", "field name=\"OP\"> &amp;&amp; </field");
                newCode = newCode.replaceAll("field name=\"OP\">AND_NOT</field", "field name=\"OP\"> &amp;&amp; !</field");

                newCode = newCode.replaceAll("field name=\"OP\">LT</field", "field name=\"OP\">&lt;</field");
                newCode = newCode.replaceAll("field name=\"OP\">GT</field", "field name=\"OP\">&gt;</field");
                newCode = newCode.replaceAll("field name=\"OP\">LTE</field", "field name=\"OP\">&lt;=</field");
                newCode = newCode.replaceAll("field name=\"OP\">GTE</field", "field name=\"OP\">&gt;=</field");
                newCode = newCode.replaceAll("field name=\"OP\">EQ</field", "field name=\"OP\">==</field");
                newCode = newCode.replaceAll("field name=\"OP\">NEQ</field", "field name=\"OP\">!=</field");

                newCode = newCode.replaceAll("field name=\"UNIT\">INCHES</field", "field name=\"UNIT\">_inches</field");
                newCode = newCode.replaceAll("field name=\"UNIT\">CM</field", "field name=\"UNIT\">_cm</field");
            
                newCode = newCode.replaceAll("block type=\"controls_boolean_if\"", "block type=\"controls_if\"");
                newCode = newCode.replaceAll("block type=\"logic_boolean_compare\"", "block type=\"logic_compare\"");
                newCode = newCode.replaceAll("block type=\"logic_boolean_operation\"", "block type=\"logic_operation\"");
                newCode = newCode.replaceAll("block type=\"logic_boolean_negate\"", "block type=\"logic_negate\"");
            }

            record.setCode(newCode);
        }
        
        catch (Exception ex) {
            System.out.print(ex.getMessage());
        }

        return record;
    }

    @Override
    public ProjectRecord getProject(Long idProject) {
        ProjectRecord record = create.selectFrom(Tables.PROJECT).where(Tables.PROJECT.ID.equal(idProject)).fetchOne();

        return alterReadRecord(record);
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

        return alterReadRecord(record);
    }

    @Override
    public ProjectRecord createProject(String name, String description, String descriptionHtml, String code, ProjectType type, String board, boolean privateProject, boolean sharedProject) {
        Long idUser = BlocklyPropSecurityUtils.getCurrentUserId();
        Long idCloudUser = BlocklyPropSecurityUtils.getCurrentSessionUserId();
        ProjectRecord record = create.insertInto(Tables.PROJECT, Tables.PROJECT.ID_USER, Tables.PROJECT.ID_CLOUDUSER, Tables.PROJECT.NAME, Tables.PROJECT.DESCRIPTION, Tables.PROJECT.DESCRIPTION_HTML, Tables.PROJECT.CODE, Tables.PROJECT.TYPE, Tables.PROJECT.BOARD, Tables.PROJECT.PRIVATE, Tables.PROJECT.SHARED)
                .values(idUser, idCloudUser, name, description, descriptionHtml, code, type, board, privateProject, sharedProject).returning().fetchOne();

        return record;
    }

    public ProjectRecord createProject(String name, String description, String descriptionHtml, String code, ProjectType type, String board, boolean privateProject, boolean sharedProject, Long idProjectBasedOn) {
        Long idUser = BlocklyPropSecurityUtils.getCurrentUserId();
        Long idCloudUser = BlocklyPropSecurityUtils.getCurrentSessionUserId();
        ProjectRecord record = create.insertInto(Tables.PROJECT, Tables.PROJECT.ID_USER, Tables.PROJECT.ID_CLOUDUSER, Tables.PROJECT.NAME, Tables.PROJECT.DESCRIPTION, Tables.PROJECT.DESCRIPTION_HTML, Tables.PROJECT.CODE, Tables.PROJECT.TYPE, Tables.PROJECT.BOARD, Tables.PROJECT.PRIVATE, Tables.PROJECT.SHARED, Tables.PROJECT.BASED_ON)
                .values(idUser, idCloudUser, name, description, descriptionHtml, code, type, board, privateProject, sharedProject, idProjectBasedOn).returning().fetchOne();
        System.out.println("Save as: " + record.getName());
        return record;
    }

    @Override
    public ProjectRecord createProject(String name, String description, String descriptionHtml, ProjectType type, String board, boolean privateProject, boolean sharedProject) {
        return createProject(name, description, descriptionHtml, "", type, board, privateProject, sharedProject);
    }

    @Override
    public ProjectRecord updateProject(
            Long idProject, String name, String description,
            String descriptionHtml, boolean privateProject,
            boolean sharedProject) {
        ProjectRecord record = getProject(idProject, true);
        if (record != null) {
            record.setName(name);
            record.setDescription(description);
            record.setDescriptionHtml(descriptionHtml);
            record.setPrivate(privateProject);
            record.setShared(sharedProject);

            GregorianCalendar cal = new GregorianCalendar();
            cal.setTime(new java.util.Date());

            record.setModified(cal);
            record.update();
            return record;
        }
        return null;
    }

    @Override
    public ProjectRecord updateProject(
            Long idProject, String name, String description, 
            String descriptionHtml, String code, boolean privateProject, 
            boolean sharedProject) {
        ProjectRecord record = getProject(idProject, true);
        if (record != null) {
            record.setName(name);
            record.setDescription(description);
            record.setDescriptionHtml(descriptionHtml);
            record.setCode(code);
            record.setPrivate(privateProject);
            record.setShared(sharedProject);
            
            GregorianCalendar cal = new GregorianCalendar();
            cal.setTime(new java.util.Date());

            record.setModified(cal);
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
        if (original.getIdUser().equals(idUser) || original.getShared()) { // TODO check if friends
            return doProjectClone(original);
        }
        return null;
    }

    private ProjectRecord doProjectClone(ProjectRecord original) {
        ProjectRecord cloned = createProject(
                original.getName(), 
                original.getDescription(), 
                original.getDescriptionHtml(), 
                original.getCode(), 
                original.getType(), 
                original.getBoard(), 
                original.getPrivate(), 
                original.getShared());
        
        cloned.setBasedOn(original.getId());
        cloned.update();
        
        create.update(Tables.PROJECT)
              .set(Tables.PROJECT.BASED_ON, original.getId())
              .where(Tables.PROJECT.ID.equal(cloned.getId()));
        return cloned;
    }

    @Override
    public boolean deleteProject(Long idProject) {
        return create.deleteFrom(Tables.PROJECT)
                .where(Tables.PROJECT.ID.equal(idProject))
                .execute() > 0;
    }

    @Override
    public ProjectRecord updateProjectCode(Long idProject, String code) {
        ProjectRecord record = create.selectFrom(Tables.PROJECT)
                .where(Tables.PROJECT.ID.equal(idProject))
                .fetchOne();

        GregorianCalendar cal = new GregorianCalendar();
        cal.setTime(new java.util.Date());

        if (record != null) {
            Long idUser = BlocklyPropSecurityUtils.getCurrentUserId();
            if (record.getIdUser().equals(idUser)) {
                record.setCode(code);
                record.setModified(cal);
                record.update();
                return record;
            } else {
                if (record.getShared()) {
                    ProjectRecord cloned = doProjectClone(record);
                    cloned.setCode(code);
                    cloned.setModified(cal);
                    cloned.update();
                    return cloned;
                }
                throw new UnauthorizedException();
            }
        } else {
            return null;
        }
    }

    @Override
    public ProjectRecord saveProjectCodeAs(Long idProject, String code, String newName) {
        ProjectRecord original = getProject(idProject);
        if (original == null) {
            throw new NullPointerException("Project doesn't exist");
        }
        Long idUser = BlocklyPropSecurityUtils.getCurrentUserId();
        if (original.getIdUser().equals(idUser) || original.getShared()) { // TODO check if friends
            ProjectRecord cloned = createProject(
                    newName, 
                    original.getDescription(), 
                    original.getDescriptionHtml(), 
                    code, 
                    original.getType(), 
                    original.getBoard(), 
                    original.getPrivate(), 
                    original.getShared(), 
                    original.getId());

            return cloned;
        }
        return null;
    }

}