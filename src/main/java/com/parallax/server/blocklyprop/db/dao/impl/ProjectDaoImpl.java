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
 * 
 * TODO: add details.
 */
@Singleton
public class ProjectDaoImpl implements ProjectDao {
    private static final Logger LOG = LoggerFactory.getLogger(ProjectDao.class);
    private DSLContext create;

    @Inject
    public void setDSLContext(DSLContext dsl) {
        this.create = dsl;
    }

    /**
     *
     * Create a ProjectRecord object from an existing project.
     * 
     * TODO: add details.
     * 
     * @param idProject
     * @return
     */
    @Override
    public ProjectRecord getProject(Long idProject) {
        LOG.info("Retreiving project: {}", idProject);

        ProjectRecord record = create
                .selectFrom(Tables.PROJECT)
                .where(Tables.PROJECT.ID.equal(idProject))
                .fetchOne();

        // Return the project after checking if for depricated blocks
        return alterReadRecord(record);
    }

    /**
     *
     * Create a new project with supplied code.
     * 
     * TODO: add details.
     * 
     * @param name
     * @param description
     * @param descriptionHtml
     * @param code
     * @param type
     * @param board
     * @param privateProject
     * @param sharedProject
     * @return
     */
    @Override
    public ProjectRecord createProject(
            String name, String description, String descriptionHtml, 
            String code, ProjectType type, String board, boolean privateProject, 
            boolean sharedProject) {

        LOG.info("Creating a new project with existing code.");
        Long idUser = BlocklyPropSecurityUtils.getCurrentUserId();
        Long idCloudUser = BlocklyPropSecurityUtils.getCurrentSessionUserId();
        
        ProjectRecord record = create
                .insertInto(Tables.PROJECT, 
                            Tables.PROJECT.ID_USER, 
                            Tables.PROJECT.ID_CLOUDUSER, 
                            Tables.PROJECT.NAME, 
                            Tables.PROJECT.DESCRIPTION, 
                            Tables.PROJECT.DESCRIPTION_HTML, 
                            Tables.PROJECT.CODE, 
                            Tables.PROJECT.TYPE, 
                            Tables.PROJECT.BOARD, 
                            Tables.PROJECT.PRIVATE, 
                            Tables.PROJECT.SHARED)
                .values(idUser, 
                        idCloudUser, 
                        name, 
                        description, 
                        descriptionHtml, 
                        code, 
                        type, 
                        board, 
                        privateProject, 
                        sharedProject)
                .returning()
                .fetchOne();

        return record;
    }

    /**
     *
     * Create a new project based on an existing project.
     * 
     * Note: This is an overload of createProject() with existing blocks.
     * 
     * TODO: add details.
     * 
     * @param name
     * @param description
     * @param descriptionHtml
     * @param code
     * @param type
     * @param board
     * @param privateProject
     * @param sharedProject
     * @param idProjectBasedOn
     * @return
     */
    public ProjectRecord createProject(
            String name, String description, String descriptionHtml, 
            String code, ProjectType type, String board, boolean privateProject, 
            boolean sharedProject, Long idProjectBasedOn) {
        
        LOG.info("Creating a new project from existing project.");
        Long idUser = BlocklyPropSecurityUtils.getCurrentUserId();
        Long idCloudUser = BlocklyPropSecurityUtils.getCurrentSessionUserId();

        ProjectRecord record = create
                .insertInto(Tables.PROJECT, 
                            Tables.PROJECT.ID_USER, 
                            Tables.PROJECT.ID_CLOUDUSER, 
                            Tables.PROJECT.NAME, 
                            Tables.PROJECT.DESCRIPTION, 
                            Tables.PROJECT.DESCRIPTION_HTML, 
                            Tables.PROJECT.CODE, 
                            Tables.PROJECT.TYPE, 
                            Tables.PROJECT.BOARD, 
                            Tables.PROJECT.PRIVATE, 
                            Tables.PROJECT.SHARED, 
                            Tables.PROJECT.BASED_ON)
                .values(idUser, 
                        idCloudUser, 
                        name, 
                        description, 
                        descriptionHtml, 
                        code, 
                        type, 
                        board, 
                        privateProject, 
                        sharedProject, 
                        idProjectBasedOn)
                .returning()
                .fetchOne();

        LOG.info("New project saved as {}.", record.getName());
        return record;
    }

    /**
     *
     * Create a new project with a blank canvas.
     * 
     * TODO: add details.
     * 
     * @param name
     * @param description
     * @param descriptionHtml
     * @param type
     * @param board
     * @param privateProject
     * @param sharedProject
     * @return
     */
    @Override
    public ProjectRecord createProject(
            String name, String description, String descriptionHtml, 
            ProjectType type, String board, boolean privateProject, 
            boolean sharedProject) {
        
        LOG.info("Creating a new, empty project from existing project.");
        return createProject(name, description, descriptionHtml, "", type, board, privateProject, sharedProject);
    }

    /**
     *
     * Update a project.
     * 
     * TODO: add details.
     * 
     * @param idProject
     * @param name
     * @param description
     * @param descriptionHtml
     * @param privateProject
     * @param sharedProject
     * @return
     */
    @Override
    public ProjectRecord updateProject(
            Long idProject, String name, String description,
            String descriptionHtml, boolean privateProject,
            boolean sharedProject) {

        LOG.info("Update project {}.", idProject);

        ProjectRecord record = getProject(idProject, true);
        if (record == null) {
            LOG.warn("Unable to locate project {} to update it.", idProject);
            return null;
        }

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

    /**
     *
     * Update a project.
     * 
     * TODO: add details.
     * 
     * @param idProject
     * @param name
     * @param description
     * @param descriptionHtml
     * @param code
     * @param privateProject
     * @param sharedProject
     * @return
     */
    @Override
    public ProjectRecord updateProject(
            Long idProject, String name, String description, 
            String descriptionHtml, String code, boolean privateProject, 
            boolean sharedProject) {

        LOG.info("Update project {}.", idProject);
        
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
        
        LOG.warn("Unable to update project {}", idProject);
        return null;
    }

    /**
     * TODO: add details.
     * 
     * @param idProject
     * @param code
     * @return
     */
    @Override
    public ProjectRecord saveCode(Long idProject, String code) {
        LOG.info("Saving code for project {}.", idProject);

        ProjectRecord record = getProject(idProject, true);
        if (record != null) {
            record.setCode(code);
            ProjectRecord returningRecord = create.update(Tables.PROJECT).set(record).returning().fetchOne();
            return returningRecord;
        }
        LOG.warn("Unable to save code for project {}", idProject);
        return null;
    }

    /**
     * TODO: add details.
     * 
     * @param idUser
     * @param sort
     * @param order
     * @param limit
     * @param offset
     * @return
     */
    @Override
    public List<ProjectRecord> getUserProjects(Long idUser, TableSort sort, TableOrder order, Integer limit, Integer offset) {
        LOG.info("Retreive projects for user {}.", idUser);
        
        SortField<String> orderField = Tables.PROJECT.NAME.asc();
        if (TableOrder.desc == order) {
            orderField = Tables.PROJECT.NAME.desc();
        }
        
        return create.selectFrom(Tables.PROJECT)
                .where(Tables.PROJECT.ID_USER.equal(idUser))
                .orderBy(orderField).limit(limit).offset(offset)
                .fetch();
    }

    /**
     * TODO: add details.
     * 
     * @param sort
     * @param order
     * @param limit
     * @param offset
     * @param idUser
     * @return
     */
    @Override
    public List<ProjectRecord> getSharedProjects(TableSort sort, TableOrder order, Integer limit, Integer offset, Long idUser) {
        LOG.info("Retreive shared projects.");
        
        SortField<?> orderField = sort == null ? Tables.PROJECT.NAME.asc() : sort.getField().asc();
        if (TableOrder.desc == order) {
            orderField = sort == null ? Tables.PROJECT.NAME.desc() : sort.getField().desc();
        }
        Condition conditions = Tables.PROJECT.SHARED.eq(Boolean.TRUE);
        if (idUser != null) {
            conditions = conditions.or(Tables.PROJECT.ID_USER.eq(idUser));
        }
        return create.selectFrom(Tables.PROJECT)
                .where(conditions)
                .orderBy(orderField).limit(limit).offset(offset)
                .fetch();
    }

    /**
     * TODO: add details.
     * 
     * @param sort
     * @param order
     * @param limit
     * @param offset
     * @param idUser
     * @return
     */
    @Override
    public List<ProjectRecord> getSharedProjectsByUser(TableSort sort, TableOrder order, Integer limit, Integer offset, Long idUser) {
        LOG.info("Retreive shared projects.");
        
        SortField<?> orderField = sort == null ? Tables.PROJECT.NAME.asc() : sort.getField().asc();
        if (TableOrder.desc == order) {
            orderField = sort == null ? Tables.PROJECT.NAME.desc() : sort.getField().desc();
        }
        Condition conditions = Tables.PROJECT.SHARED.eq(Boolean.TRUE);
        if (idUser != null) {
            conditions = conditions.and(Tables.PROJECT.ID_USER.eq(idUser));
        }
        return create.selectFrom(Tables.PROJECT)
                .where(conditions)
                .orderBy(orderField).limit(limit).offset(offset)
                .fetch();
    }

    /**
     * TODO: add details.
     * 
     * @param idUser
     * @return
     */
    @Override
    public int countUserProjects(Long idUser) {
        LOG.info("Count project for user {}.", idUser);

        return create.fetchCount(Tables.PROJECT, Tables.PROJECT.ID_USER.equal(idUser));
    }

    /**
     *
     * TODO: add details.
     * 
     * @param idUser
     * @return
     */
    @Override
    public int countSharedProjects(Long idUser) {
        LOG.info("Count shared projects for user {}.", idUser);

        Condition conditions = Tables.PROJECT.SHARED.equal(Boolean.TRUE);
        if (idUser != null) {
            conditions = conditions.or(Tables.PROJECT.ID_USER.eq(idUser));
        }
        return create.fetchCount(Tables.PROJECT, conditions);
    }

    /**
     *
     * TODO: add details.
     * 
     * @param idUser
     * @return
     */
    @Override
    public int countSharedProjectsByUser(Long idUser) {
        LOG.info("Count shared projects for user {}.", idUser);

        Condition conditions = Tables.PROJECT.SHARED.equal(Boolean.TRUE);
        if (idUser != null) {
            conditions = conditions.and(Tables.PROJECT.ID_USER.eq(idUser));
        }
        return create.fetchCount(Tables.PROJECT, conditions);
    }

    /**
     * TODO: add details.
     * 
     * @param idProject
     * @return
     */
    @Override
    public ProjectRecord cloneProject(Long idProject) {
        LOG.info("Clone existing project {} to a new project.", idProject);

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

    /**
     * TODO: add details.
     * 
     * @param idProject
     * @return
     */
    @Override
    public boolean deleteProject(Long idProject) {
        LOG.info("Delete project {}.", idProject);
        return create.deleteFrom(Tables.PROJECT)
                .where(Tables.PROJECT.ID.equal(idProject))
                .execute() > 0;
    }

    /**
     * TODO: add details.
     * 
     * @param idProject
     * @param code
     * @return
     */
    @Override
    public ProjectRecord updateProjectCode(Long idProject, String code) {
        LOG.info("Update code for project {}.", idProject);
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
                LOG.error("User {} tried and failed to update project {}.", idUser, idProject);
                throw new UnauthorizedException();
            }
        } else {
            LOG.warn("Unable to project {}. Unknown reason.", idProject);
            return null;
        }
    }

    /**
     * TODO: add details.
     * 
     * @param idProject
     * @param code
     * @param newName
     * @return
     */
    @Override
    public ProjectRecord saveProjectCodeAs(Long idProject, String code, String newName) {
        LOG.info("Saving project code as '{}'", newName);
                
        ProjectRecord original = getProject(idProject);
        if (original == null) {
            LOG.error("Original project {} is missing. Unable to save code as...", idProject);
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

        
    private ProjectRecord getProject(Long idProject, boolean toEdit) {
        LOG.info("Retreiving project {}.", idProject);
        ProjectRecord record = create
                .selectFrom(Tables.PROJECT)
                .where(Tables.PROJECT.ID.equal(idProject))
                .fetchOne();
        
        if (record != null) {
            Long idUser = BlocklyPropSecurityUtils.getCurrentUserId();
            
            // Return a project if the edit flag is off or the edit flag is
            // on and the project owner is the current user
            if (!toEdit || record.getIdUser().equals(idUser)) {
                return alterReadRecord(record);
            } else {
                LOG.error("User {} attempted to edit project {} without authorization.",
                        idUser, idProject);
                throw new UnauthorizedException();
            }
        }

        // Return the project after checking if for depricated blocks
        return alterReadRecord(record);
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


        // Swap out old block definitions
    private ProjectRecord alterReadRecord(ProjectRecord record) {
        LOG.info("Verify project block characteristics");
        String currentCode, newCode;
        
        
        if (record == null) {
            LOG.error("Null project record detected.");
            throw new NullPointerException("Cannot alter a null project record.");
        }

        try {
            currentCode = record.getCode();

            // Return immediately if there is no code to adjust
            if (currentCode == null) {
                LOG.warn("Project is empty.");
                return record;
            }
            
            /*
             * Make a copy of the project. We will use this after the updates
             * to determine if anything was changed. This ensures that we do
             * not do any database I/O unless we actually changed something.
             */
            newCode = currentCode;
            
            if (record.getType() == ProjectType.SPIN) {
                newCode = fixSpinProjectBlocks(newCode);

            } else if (record.getType() == ProjectType.PROPC){
                newCode = fixSpinProjectBlocks(newCode);
            }

            // Check for any difference from the original code
            if (! currentCode.equals(newCode)) {
                LOG.info("Updating converted project.");
                record.setCode(newCode);
            }
        }
        
        catch (Exception ex) {
            LOG.error("Exception trapped. Messate is: {}", ex.getMessage());
        }

        return record;
    }

    // Correct depricated block details related to Spin blocks
    private String fixSpinProjectBlocks(String newCode) {
        LOG.info("Looking for depricated Spin blocks.");

        newCode = newCode.replaceAll("block type=\"controls_if\"",
                "block type=\"controls_boolean_if\"");

        newCode = newCode.replaceAll("block type=\"logic_compare\"",
                "block type=\"logic_boolean_compare\"");

        newCode = newCode.replaceAll("block type=\"logic_operation\"",
                "block type=\"logic_boolean_operation\"");
                
        newCode = newCode.replaceAll("block type=\"logic_negate\"",
                "block type=\"logic_boolean_negate\"");
                
        newCode = newCode.replaceAll("block type=\"math_number\"",
                "block type=\"spin_integer\"");
        return newCode;
    }
    
    private String fixPropcProjectBlocks(String newCode) {
        LOG.info("Looking for depricated PropC blocks.");
        
        newCode = newCode.replaceAll("field name=\"OP\">ADD</field",
                "field name=\"OP\"> + </field");
        
        newCode = newCode.replaceAll("field name=\"OP\">MINUS</field",
                "field name=\"OP\"> - </field");
                
        newCode = newCode.replaceAll("field name=\"OP\">MULTIPLY</field",
                "field name=\"OP\"> * </field");
                
        newCode = newCode.replaceAll("field name=\"OP\">DIVIDE</field",
                "field name=\"OP\"> / </field");
                
        newCode = newCode.replaceAll("field name=\"OP\">MODULUS</field",
                "field name=\"OP\"> % </field");
                
        newCode = newCode.replaceAll("field name=\"OP\">AND</field",
                "field name=\"OP\"> &amp;&amp; </field");
                
        newCode = newCode.replaceAll("field name=\"OP\">AND_NOT</field",
                "field name=\"OP\"> &amp;&amp; !</field");

        newCode = newCode.replaceAll("field name=\"OP\">LT</field",
                "field name=\"OP\">&lt;</field");
                
        newCode = newCode.replaceAll("field name=\"OP\">GT</field",
                "field name=\"OP\">&gt;</field");
                
        newCode = newCode.replaceAll("field name=\"OP\">LTE</field",
                "field name=\"OP\">&lt;=</field");
                
        newCode = newCode.replaceAll("field name=\"OP\">GTE</field",
                "field name=\"OP\">&gt;=</field");
                
        newCode = newCode.replaceAll("field name=\"OP\">EQ</field",
                "field name=\"OP\">==</field");
                
        newCode = newCode.replaceAll("field name=\"OP\">NEQ</field",
                "field name=\"OP\">!=</field");

        newCode = newCode.replaceAll("field name=\"UNIT\">INCHES</field",
                "field name=\"UNIT\">_inches</field");
                
        newCode = newCode.replaceAll("field name=\"UNIT\">CM</field",
                "field name=\"UNIT\">_cm</field");
            
        newCode = newCode.replaceAll("block type=\"controls_boolean_if\"",
                "block type=\"controls_if\"");
                
        newCode = newCode.replaceAll("block type=\"logic_boolean_compare\"",
                "block type=\"logic_compare\"");
                
        newCode = newCode.replaceAll("block type=\"logic_boolean_operation\"",
                "block type=\"logic_operation\"");
                
        newCode = newCode.replaceAll("block type=\"logic_boolean_negate\"",
                "block type=\"logic_negate\"");

        return newCode;
    }
}