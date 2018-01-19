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
import java.util.Random;


/**
 *
 * @author Michel
 *
 * TODO: add details.
 */
@Singleton
public class ProjectDaoImpl implements ProjectDao {

    /**
     * 
     */
    private static final int Min_BlocklyCodeSize = 48;
    
    /**
     * 
     */
    private static final Logger LOG = LoggerFactory.getLogger(ProjectDao.class);
    
    /**
     * 
     */
    private DSLContext create;

    @Inject
    public void setDSLContext(DSLContext dsl) {
        this.create = dsl;
    }

    /**
     *
     * Create a ProjectRecord object from an existing project.
     *
     * Note: There are private getProject methods that retrieve a project record
     * based on a number of parameters passed in.
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

        if (record == null) {
            LOG.warn("Unable to retreive project {}", idProject);
            return null;
        }
        // Return the project after checking if for depricated blocks
        return alterReadRecord(record);
    }

    /**
     *
     * Create a new project with supplied code.
     *
     * @param name Project name
     * @param description Project description
     * @param descriptionHtml HTML version of the project description
     * @param code  XML representing the project blocks
     * @param type  Project type TODO: Expand on this
     * @param board Text representing the hardware being programmed
     * @param privateProject Flag to indicate if the project is private
     * @param sharedProject Flag to indicate if the project is a community project
     * @return
     */
    @Override
    public ProjectRecord createProject( 
            String name,
            String description,
            String descriptionHtml,
            String code,
            ProjectType type, 
            String board, 
            boolean privateProject,
            boolean sharedProject,
            Long idProjectBasedOn) {

        LOG.info("Creating a new project with existing code.");
        ProjectRecord record = null;

        Long idUser = BlocklyPropSecurityUtils.getCurrentUserId();
        if (idUser == null) {
            LOG.error("Null BP UserID");
            return record;
        }
        
        Long idCloudUser = BlocklyPropSecurityUtils.getCurrentSessionUserId();
        if (idCloudUser == null) {
            LOG.error("Null cloud user ID");
        }
        
        try {
            record = create
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
        }
        catch (org.jooq.exception.DataAccessException sqex) {
            LOG.error("Database error encountered {}", sqex.getMessage());
        }
        
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
        
        // TODO: Add based_on field to end of argument list
        return createProject(
                name, 
                description, 
                descriptionHtml, 
                "", 
                type, 
                board, 
                privateProject, 
                sharedProject,
                null);
    }


    // Used by the randomString function
    
    static final String AB = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!#()*-+./:;=@[]^_`{|}~";
    static Random rnd = new Random();

    /**
     *
     * Create a random string to use as a blockID.
     *
     * TODO: add details.
     *
     * @param len
     * @return
     */
    String randomString(int len) {
        StringBuilder sb = new StringBuilder(len);
        for (int i = 0; i < len; i++) {
            sb.append(AB.charAt(rnd.nextInt(AB.length())));
        }
        return sb.toString();
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
            Long idProject, String name,
            String description,
            String descriptionHtml,
            boolean privateProject,
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
            Long idProject,
            String name,
            String description,
            String descriptionHtml,
            String code,
            boolean privateProject,
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
            ProjectRecord returningRecord = create
                    .update(Tables.PROJECT)
                    .set(record)
                    .returning()
                    .fetchOne();
            return returningRecord;
        }
        LOG.error("Unable to save code for project {}", idProject);
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
     * Save the current project as a new project
     *
     * @param idProject
     * @param code
     * @param newName
     * @return
     */
    @Override
    public ProjectRecord saveProjectCodeAs(Long idProject, String code, String newName) {
        
        LOG.info("Saving project code as '{}'", newName);

        // Retreive the source project
        ProjectRecord original = getProject(idProject);
        if (original == null) {
            LOG.error("Original project {} is missing. Unable to save code as...", idProject);
            throw new NullPointerException("Project doesn't exist");
        }
        
        // Obtain the current bp user record. 
        Long idUser = BlocklyPropSecurityUtils.getCurrentUserId();
        
        if (idUser != null) {
            // Create a copy of the source project is the source project is owned
            // by the current user OR if the source project is designated as a
            // shared or community project
            // --------------------------------------------------------------------
            if (original.getIdUser().equals(idUser) || original.getShared()) {
                ProjectRecord cloned = createProject(
                        newName, 
                        original.getDescription(),
                        original.getDescriptionHtml(),
                        code,
                        original.getType(),
                        original.getBoard(),
                        true,                   // Set project private
                        false,                  // Set project unshared
                        original.getId());

                return cloned;
            }
        } else {
            LOG.info("Unable to retreive BP user id");
        }
        return null;
    }

    // Private over-ride of the public getProject()
    //
    // 
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

                // Todo: Verify that the record was fetched - it sometimes is not.
                return alterReadRecord(record);
            } else {
                LOG.error("User {} attempted to edit project {} without authorization.",
                        idUser, idProject);
                throw new UnauthorizedException();
            }
        }

        // Return the project after checking if for depricated blocks
        //
        // Todo: Verify that the record was fetched - it sometimes is not.
        return alterReadRecord(record);
    }

    private ProjectRecord doProjectClone(ProjectRecord original) {
        
        // TODO: Add based_on parameter as last argument
        ProjectRecord cloned = createProject(
                original.getName(),
                original.getDescription(),
                original.getDescriptionHtml(),
                original.getCode(),
                original.getType(),
                original.getBoard(),
                original.getPrivate(),
                original.getShared(),
                original.getId()
        );

//        cloned.setBasedOn(original.getId());
//        cloned.update();

        // WHAT IS THIS DOING?
        create.update(Tables.PROJECT)
                .set(Tables.PROJECT.BASED_ON, original.getId())
                .where(Tables.PROJECT.ID.equal(cloned.getId()));
        
        return cloned;
    }

    // Evaluate project code and replace any depricated or updated blocks
    //
    // Return a ProjectRecord object. The code field may be altered to correct
    // any old, depricated or updated blocks. The method will throw an
    // exception if the ProjectRecord parameter is null or something has gone
    // horribly wrong with the string conversions.
    //
    private ProjectRecord alterReadRecord(ProjectRecord record) {
        String currentCode, newCode;

        if (record == null) {
            LOG.error("alterReadRecod detected a null project record.");
            return null;
        }

        try {
            LOG.info("Verify project {} block characteristics", record.getId());
            currentCode = record.getCode();

            // Return immediately if there is no code to adjust
            if (currentCode == null) {
                LOG.warn("Project () code block is empty.", record.getId());
                return record;
            }
            
            if (currentCode.length() < Min_BlocklyCodeSize ) {
                LOG.warn("Project code appears to be missing");
            }

            /*
             * Make a copy of the project. We will use this after the updates
             * to determine if anything was changed. This ensures that we do
             * not do any database I/O unless we actually changed something.
             */
            newCode = currentCode;

            //if (record.getType() == ProjectType.SPIN) {
            //    newCode = fixSpinProjectBlocks(newCode);

            //} else if (record.getType() == ProjectType.PROPC) {
                newCode = fixPropcProjectBlocks(newCode, record.getType());
            //}

            // Check for any difference from the original code
            if (!currentCode.equals(newCode)) {
                LOG.info("Updated depricated project code blocks in project {}.", record.getId());
                record.setCode(newCode);
            }
        } catch (Exception ex) {
            LOG.error("Exception trapped. Message is: {}", ex.getMessage());
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

    private String fixPropcProjectBlocks(String newCode, ProjectType projType) {
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

        newCode = newCode.replaceAll("block type=\"spin_comment\"",
                "block type=\"comment\"");

        newCode = newCode.replaceAll("field name=\"COMMENT\">",
                "field name=\"COMMENT_TEXT\">");

        newCode = newCode.replaceAll("block type=\"controls_boolean_if\"",
                "block type=\"controls_if\"");

        newCode = newCode.replaceAll("block type=\"logic_boolean_compare\"",
                "block type=\"logic_compare\"");

        newCode = newCode.replaceAll("block type=\"logic_boolean_operation\"",
                "block type=\"logic_operation\"");

        newCode = newCode.replaceAll("block type=\"logic_boolean_negate\"",
                "block type=\"logic_negate\"");
        
        newCode = newCode.replaceAll("_000 / ", "000 / ");

        // Fix a small issue with calling the wrong project type.
        newCode = newCode.replaceAll("block type=\"spin_integer\"",
                "block type=\"math_number\"");
        
        if (!newCode.contains("block type=\"math_number\"") && projType == ProjectType.SPIN) {
            // Change all math number blocks to the same kind
            newCode = newCode.replaceAll("block type=\"math_int_angle\"",
                    "block type=\"math_number\"");
            newCode = newCode.replaceAll("block type=\"math_integer\"",
                    "block type=\"math_number\"");
            newCode = newCode.replaceAll("block type=\"scribbler_random_number\"",
                    "block type=\"math_random\"");
            newCode = newCode.replaceAll("field name=\"INT_VALUE\"",
                    "field name=\"NUM\"");
            newCode = newCode.replaceAll("field name=\"ANGLE_VALUE\"",
                    "field name=\"NUM\"");

            newCode = newCode.replaceAll("block type=\"digital_input\"",
                    "block type=\"check_pin\"");
            newCode = newCode.replaceAll("block type=\"digital_output\"",
                    "block type=\"make_pin\"");
            newCode = newCode.replaceAll("block type=\"scribbler_servo\"",
                    "block type=\"servo_move\"");
            newCode = newCode.replaceAll("field name=\"SERVO_PIN\"",
                    "field name=\"PIN\"");
            newCode = newCode.replaceAll("field name=\"SERVO_ANGLE\"",
                    "field name=\"ANGLE\"");
            newCode = newCode.replaceAll("<block type=\"serial_",
                    "<block type=\"scribbler_serial_");
            newCode = newCode.replaceAll("field name=\"TIMESCALE\">1000<",
                    "field name=\"TIMESCALE\">Z1<");
            newCode = newCode.replaceAll("field name=\"TIMESCALE\">1<",
                    "field name=\"TIMESCALE\">Z1000<");
            newCode = newCode.replaceAll("field name=\"TIMESCALE\">10<",
                    "field name=\"TIMESCALE\">100<");
            newCode = newCode.replaceAll("field name=\"TIMESCALE\">Z",
                    "field name=\"TIMESCALE\">");
            
            newCode = newCode.replaceAll("Scribbler#CS","256");
            newCode = newCode.replaceAll("Scribbler#NL","10");
            newCode = newCode.replaceAll("Scribbler#LF","13");
            newCode = newCode.replaceAll("Scribbler#BS","127");
            
            newCode = newCode.replaceAll("block type=\"scribbler_loop\"",
                    "block type=\"controls_repeat\"");
            newCode = newCode.replaceAll("statement name=\"LOOP\"",
                    "statement name=\"DO\"");
            //newCode = newCode.replaceAll("<block type=\"scribbler_loop\" id=(.*)><statement name=\"LOOP\">",       
            //"<block type=\"controls_repeat\" id=$1><mutation type=\"FOREVER\"></mutation><field name=\"TYPE\">FOREVER</field><statement name=\"DO\">");
            newCode = newCode.replaceAll("<block type=\"scribbler_limited_loop\" id=(.*)><field name=\"LOOP_COUNT\">(.*)</field><statement name=\"LOOP\">",       
            "<block type=\"controls_repeat\" id=$1><mutation type=\"TIMES\"></mutation><field name=\"TYPE\">TIMES</field><value name=\"TIMES\"><block type=\"math_number\" id=\"" + randomString(20) + "\"><field name=\"NUM\">$2</field></block></value><statement name=\"DO\">");      

/*
            // These aren't working consistently - so the fallback to to leave the old blocks alone, 
            // Replace old "simple" s3 blocks with equavalent block combinations

            newCode = newCode.replaceAll("scribbler_if_line\" id=(.*)><mutation state=\"(.*)\"></mutation><field name=\"LINE_CONDITION\">(.*)</field><field name=\"LINE_POSITION\">(.*)</field><field name=\"LINE_COLOR\">(.*)</field><statement name=\"IF_LINE",
                    "controls_if\" id=$1><value name=\"IF0\"><block type=\"scribbler_simple_line\" id=\"" + randomString(20) + "\"><mutation state=\"$2\"></mutation><field name=\"LINE_CONDITION\">$3</field><field name=\"LINE_POSITION\">$4</field><field name=\"LINE_COLOR\">$5</field></block></value><statement name=\"DO0");

            // Not sure if I need non-mutation replacers - if not included, they will likely get cleaned on the second save (first one adds them, second one replaces)
            //newCode = newCode.replaceAll("scribbler_if_obstacle\" id=(.*)><field name=\"OBSTACLE_CONDITION\">(.*)</field><field name=\"OBSTACLE_POSITION\">(.*)</field><statement name=\"IF_OBSTACLE",
            //        "controls_if\" id=$1><value name=\"IF0\"><block type=\"scribbler_simple_obstacle\" id=\"" + randomString(20) + "\"><field name=\"OBSTACLE_CONDITION\">$2</field><field name=\"OBSTACLE_POSITION\">$3</field></block></value><statement name=\"DO0");

            newCode = newCode.replaceAll("scribbler_if_obstacle\" id=(.*)><mutation state=\"(.*)\"></mutation><field name=\"OBSTACLE_CONDITION\">(.*)</field><field name=\"OBSTACLE_POSITION\">(.*)</field><statement name=\"IF_OBSTACLE",
                    "controls_if\" id=$1><value name=\"IF0\"><block type=\"scribbler_simple_obstacle\" id=\"" + randomString(20) + "\"><mutation state=\"$2\"></mutation><field name=\"OBSTACLE_CONDITION\">$3</field><field name=\"OBSTACLE_POSITION\">$4</field></block></value><statement name=\"DO0");

            newCode = newCode.replaceAll("<field name=\"OBSTACLE_SENSOR_CHOICE\">RIGHT</field>",
                    "<mutation state=\"IS\"></mutation><field name=\"OBSTACLE_CONDITION\">IS</field><field name=\"OBSTACLE_POSITION\">RIGHT</field>");
            newCode = newCode.replaceAll("<field name=\"OBSTACLE_SENSOR_CHOICE\">LEFT</field>",
                    "<mutation state=\"IS\"></mutation><field name=\"OBSTACLE_CONDITION\">IS</field><field name=\"OBSTACLE_POSITION\">LEFT</field>");
            newCode = newCode.replaceAll("<field name=\"OBSTACLE_SENSOR_CHOICE\">&amp;&amp;</field>",
                    "<mutation state=\"IS\"></mutation><field name=\"OBSTACLE_CONDITION\">IS</field><field name=\"OBSTACLE_POSITION\">CENTER</field>");
            newCode = newCode.replaceAll("<field name=\"OBSTACLE_SENSOR_CHOICE\">\\|\\|</field>",
                    "<mutation state=\"IS\"></mutation><field name=\"OBSTACLE_CONDITION\">IS</field><field name=\"OBSTACLE_POSITION\">DETECTED</field>");
            newCode = newCode.replaceAll("<block type=\"obstacle_sensor\"",
                    "<block type=\"scribbler_simple_obstacle\"");

            newCode = newCode.replaceAll("scribbler_if_light\" id=(.*)><mutation state=\"(.*)\"></mutation><field name=\"LIGHT_CONDITION\">(.*)</field><field name=\"LIGHT_POSITION\">(.*)</field><statement name=\"IF_LIGHT",
                    "controls_if\" id=$1><value name=\"IF0\"><block type=\"scribbler_simple_light\" id=\"" + randomString(20) + "\"><mutation state=\"$2\"></mutation><field name=\"LIGHT_CONDITION\">$3</field><field name=\"LIGHT_POSITION\">$4</field></block></value><statement name=\"DO0");
*/
        }
        
        // Replace the Robot init block with two blocks, need to generate unique 20-digit blockID:
        if (!newCode.contains("block type=\"ab_drive_ramping\"")) {
            newCode = newCode.replaceAll("</field><field name=\"RAMPING\">", 
                    "</field></block><block type=\"ab_drive_ramping\" id=\"" + randomString(20) + "\"><field name=\"RAMPING\">");
        }
        
        
        return newCode;
    }
}
