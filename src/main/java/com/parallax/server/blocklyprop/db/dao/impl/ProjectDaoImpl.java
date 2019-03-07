/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.db.dao.impl;

import com.parallax.server.blocklyprop.TableOrder;
import com.parallax.server.blocklyprop.TableSort;
import com.parallax.server.blocklyprop.db.dao.ProjectDao;
import com.parallax.server.blocklyprop.db.enums.ProjectType;
import com.parallax.server.blocklyprop.db.generated.Tables;
import com.parallax.server.blocklyprop.db.generated.tables.records.ProjectRecord;
import com.parallax.server.blocklyprop.security.BlocklyPropSecurityUtils;

//import com.parallax.server.blocklyprop.services.impl.ProjectSharingServiceImpl;
import com.parallax.server.blocklyprop.services.ProjectSharingService;

import com.google.inject.Inject;
import com.google.inject.Singleton;
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
 * DAO interface to the blocklyprop.project table.
 * 
 * @author Michel
 *
 */
@Singleton
public class ProjectDaoImpl implements ProjectDao {

    /**
     * The absolute lowest number of bytes that can exist in an
     * un-populated project.
     */
    private static final int Min_BlocklyCodeSize = 48;

    
    /**
     * Application logging facility
     */
    private static final Logger LOG = LoggerFactory.getLogger(ProjectDao.class);

    
    /**
     * Database connection
     */
    private DSLContext create;

    
    // Used by the randomString function
    static final String AB = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!#()*-+./:;=@[]^_`{|}~";
    static Random rnd = new Random();

    
    // Constants to clarify the edit flag in method calls
    static final boolean EDIT_MODE_OFF = false;
    private static final boolean EDIT_MODE_ON = true;
    
    // Constant to identify the current version of the blockly block library;
    public static final short BLOCKLY_LIBRARY_VERSION = 1;
    
    
    @Inject
    public void setDSLContext(DSLContext dsl) {
        this.create = dsl;
    }


    private ProjectSharingService projectSharingService;

    @Inject
    public void setProjectSharingContext(ProjectSharingService projectSharingService) {
        this.projectSharingService = projectSharingService;
    }


    /**
     *
     * Retrieve a new project record based from an existing project.
     *
     * Note: There are private getProject methods that retrieve a project record
     * based on a number of parameters passed in.
     *
     * This returns a ProjectRecord object that is a copy of the project
     * identified by the passed in project id. The new object is not yet
     * persisted in the database.
     *
     * @param idProject The id for the project that will be the source for the
     * new project record
     * 
     * @return ProjectRecord object containing a copy of the original project
     */
    @Override
    public ProjectRecord getProject(Long idProject) {
        LOG.info("Retrieving data for project #{}", idProject);

        ProjectRecord record = null;

        try {
            record = create
                    .selectFrom(Tables.PROJECT)
                    .where(Tables.PROJECT.ID.equal(idProject))
                    .fetchOne();

            if (record == null) {
                LOG.warn("Unable to retreive project {}", idProject);
                return null;
            }
            
        } catch (org.jooq.exception.DataAccessException sqex) {
            LOG.error("Database error encountered {}", sqex.getMessage());
            return null;
        } catch (Exception ex) {
            LOG.error("Unexpected exception retrieving a project record");
            LOG.error("Error Message: {}", ex.getMessage());
            return null;
        }

        // Return the project after checking if for deprecated blocks
        LOG.info("Cleaning project {} blocks", record.getId());

        ProjectRecord prjRecord =  alterReadRecord(record);

        if (prjRecord == null) {
            LOG.info("Hmm, Something broke the project record");
            return null;
        }

        LOG.info("Returning project {}.", prjRecord.getId());

        return prjRecord;
    }



    // V2 implementations
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
            Long idProjectBasedOn,
            String settings) {

        LOG.info("Creating a new project with existing code.");

        ProjectRecord record = null;

        // Get the logged in user's userID
        Long idUser = BlocklyPropSecurityUtils.getCurrentUserId();
        if (idUser == null) {
            LOG.error("Null BP UserID");
            return null;
        }

        // Get the cloud session user id from the current authenticated session
        Long idCloudUser = BlocklyPropSecurityUtils.getCurrentSessionUserId();
        if (idCloudUser == null) {
            LOG.error("Null cloud user ID");
            return null;
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
                            Tables.PROJECT.CODE_BLOCK_VERSION,
                            Tables.PROJECT.TYPE,
                            Tables.PROJECT.BOARD,
                            Tables.PROJECT.PRIVATE,
                            Tables.PROJECT.SHARED,
                            Tables.PROJECT.BASED_ON,
                            Tables.PROJECT.SETTINGS)
                    .values(idUser,
                            idCloudUser,
                            name,
                            description,
                            descriptionHtml,
                            code,
                            BLOCKLY_LIBRARY_VERSION,
                            type,
                            board,
                            privateProject,
                            sharedProject,
                            idProjectBasedOn,
                            settings)
                    .returning()
                    .fetchOne();
        }
        catch (org.jooq.exception.DataAccessException sqex) {
            LOG.error("Database error encountered {}", sqex.getMessage());
            return null;
        } catch (Exception ex) {
            LOG.error("Unexpected exception creating a project record");
            LOG.error("Error Message: {}", ex.getMessage());
            return null;
        }

        return record;

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
     * @param idProjectBasedOn Parent project id if the new project is cloned
     * from another project
     * 
     * @return a fully formed ProjectRecord or a null if an error is detected.
     */
    @Deprecated
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

        // Get the logged in user's userID
        Long idUser = BlocklyPropSecurityUtils.getCurrentUserId();
        if (idUser == null) {
            LOG.error("Null BP UserID");
            return null;
        }
        
        // Get the cloud session user id from the current authenticated session
        Long idCloudUser = BlocklyPropSecurityUtils.getCurrentSessionUserId();
        if (idCloudUser == null) {
            LOG.error("Null cloud user ID");
            return null;
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
                        Tables.PROJECT.CODE_BLOCK_VERSION,
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
                        BLOCKLY_LIBRARY_VERSION,
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
            return null;
        } catch (Exception ex) {
            LOG.error("Unexpected exception creating a project record");
            LOG.error("Error Message: {}", ex.getMessage());
            return null;
        }
        
        return record;
    }

    /**
     *
     * Create a new project with a blank canvas (no blocks).
     *
     * This is an overload of the base createProject method that omits
     * the code block.
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
            String name,
            String description,
            String descriptionHtml,
            ProjectType type,
            String board,
            boolean privateProject,
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


    /**
     *
     * Update project meta data.
     *
     * This method updates the project meta data but does not alter the project
     * code blocks.
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
            Long idProject,
            String name,
            String description,
            String descriptionHtml,
            boolean privateProject,
            boolean sharedProject) {

        LOG.info("Update project {}.", idProject);

        ProjectRecord record = getProject(idProject, EDIT_MODE_ON);
        if (record == null) {
            LOG.warn("Unable to locate project {} to update it.", idProject);
            return null;
        }

        record.setName(name);
        record.setDescription(description);
        record.setDescriptionHtml(descriptionHtml);
        record.setPrivate(privateProject);
        record.setShared(sharedProject);
        record.setModified(getCurrentTimestamp());
        record.setCodeBlockVersion(BLOCKLY_LIBRARY_VERSION);
        record.update();

        return record;
    }

    /**
     *
     * Update project meta data and code.
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

        ProjectRecord record = getProject(idProject, EDIT_MODE_ON);
        if (record != null) {
            record.setName(name);
            record.setDescription(description);
            record.setDescriptionHtml(descriptionHtml);
            record.setCode(code);
            record.setPrivate(privateProject);
            record.setShared(sharedProject);
            record.setModified(getCurrentTimestamp());
            record.setCodeBlockVersion(BLOCKLY_LIBRARY_VERSION);
            record.update();

            return record;
        }

        LOG.warn("Unable to update project {}", idProject);
        return null;
    }




    @Override
    public ProjectRecord updateProject(
            Long idProject,
            String name,
            String description,
            String descriptionHtml,
            String code,
            boolean privateProject,
            boolean sharedProject,
            String settings) {

        LOG.info("Update project {}.", idProject);

        ProjectRecord record = getProject(idProject, EDIT_MODE_ON);
        if (record != null) {
            record.setName(name);
            record.setDescription(description);
            record.setDescriptionHtml(descriptionHtml);
            record.setCode(code);
            record.setPrivate(privateProject);
            record.setShared(sharedProject);
            record.setSettings(settings);
            record.setModified(getCurrentTimestamp());
            record.setCodeBlockVersion(BLOCKLY_LIBRARY_VERSION);
            record.update();

            return record;
        }

        LOG.warn("Unable to update project {}", idProject);
        return null;
    }




    /**
     * Update the code blocks for a project
     *
     * @param idProject
     * @param code
     * @return
     */
    @Override
    public ProjectRecord saveCode(Long idProject, String code) {
        LOG.info("Saving code for project {}.", idProject);

        ProjectRecord record = getProject(idProject, EDIT_MODE_ON);
        if (record != null) {
            // Update project record details
            record.setCode(code);
            record.setCodeBlockVersion(BLOCKLY_LIBRARY_VERSION);
            record.setModified(getCurrentTimestamp());
            
            // Update the record
            ProjectRecord returningRecord = create
                    .update(Tables.PROJECT)
                    .set(record)
                    .returning()
                    .fetchOne();
            
            // Return a copy of the updated project record
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
    public List<ProjectRecord> getUserProjects(
            Long idUser, 
            TableSort sort, 
            TableOrder order, 
            Integer limit, 
            Integer offset) {
        
        LOG.info("Retrieve projects for user {}.", idUser);

        SortField<String> orderField;

        // Set sort order of the result
        if (TableOrder.desc == order) {
            orderField = Tables.PROJECT.NAME.desc();
        } else {
            orderField = Tables.PROJECT.NAME.asc();
        }

        return create
                .selectFrom(Tables.PROJECT)
                .where(Tables.PROJECT.ID_USER.equal(idUser))
                .orderBy(orderField)
                .limit(limit)
                .offset(offset)
                .fetch();
    }

    /**
     * Return a list of community projects constrained by the parameters
     *
     * @param sort
     * @param order
     * @param limit
     * @param offset

     * @return
     * Returns a list of ProjectRecord objects corresponding to the projects
     * matching the selection creiteria
     */
    @Override
    public List<ProjectRecord> getSharedProjects(
            TableSort sort, 
            TableOrder order, 
            Integer limit, 
            Integer offset) {
        
        LOG.info("List shared projects.");

        SortField<?> orderField = sort == null ? Tables.PROJECT.NAME.asc() : sort.getField().asc();
        if (TableOrder.desc == order) {
            orderField = sort == null ? Tables.PROJECT.NAME.desc() : sort.getField().desc();
        }

        // Search for community projects
        Condition conditions = Tables.PROJECT.SHARED.eq(Boolean.TRUE);
        
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
    public List<ProjectRecord> getSharedProjectsByUser(
            TableSort sort, 
            TableOrder order, 
            Integer limit, 
            Integer offset, 
            Long idUser) {
        
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

        int rows = create.fetchCount(Tables.PROJECT, Tables.PROJECT.ID_USER.equal(idUser));
        LOG.info("Found a total of {} projects for user: {}.",rows, idUser);

        return rows;
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
        
        // Shared projects are really community projects. We should not include
        // the logged in user's projects in the community listing. There is a
        // separate listing available for the logged in user's private projects.
        /*
        if (idUser != null) {
            conditions = conditions.or(Tables.PROJECT.ID_USER.eq(idUser));
        }
        */
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
     * Update the code block in the specified project
     *
     * @param idProject
     * @param code
     *
     * @return
     * Returns the specified project record, otherwise it returns a null if
     * the current user does not own the project and the project is not shared
     * or public, or the requested project record was not found.
     *
     * @implNote This method will actually create a new project record based on the
     * existing project under specific conditions. Since this is an update record method,
     * the creation of a new project my be unexpected at higher layers of the application.
     */
    @Override
    public ProjectRecord updateProjectCode(Long idProject, String code) {
        LOG.info("Update code for project {}.", idProject);

        // Retrieve the specified project
        ProjectRecord record = create.selectFrom(Tables.PROJECT)
                .where(Tables.PROJECT.ID.equal(idProject))
                .fetchOne();

        // Get a timestamp used to update the modified field of the project record
        GregorianCalendar cal = new GregorianCalendar();
        cal.setTime(new java.util.Date());

        if (record != null) {
            // Found the project. Verify that the current user owns it
            Long idUser = BlocklyPropSecurityUtils.getCurrentUserId();

            // TODO: Detecting a zero user id
            if (idUser == 0) {
                LOG.error("Detected current user ID is zero for project {}", idProject);
                return null;
            }

            if (record.getIdUser() == 0) {
                LOG.error("Detected project user ID is zero for project {}", idProject);
                return null;
            }

            // Update the project if the current user owns it
            if (record.getIdUser().equals(idUser)) {
                record.setCode(code);
                record.setModified(cal);
                record.setCodeBlockVersion(BLOCKLY_LIBRARY_VERSION);
                record.update();
                return record;
            } else {
                // If the project is a shared project, allow the current user
                // to clone the project into their library
                if (record.getShared()) {
                    ProjectRecord cloned = doProjectClone(record);
                    cloned.setCode(code);
                    cloned.setModified(cal);
                    cloned.setCodeBlockVersion(BLOCKLY_LIBRARY_VERSION);
                    cloned.setIdUser(idUser);   // The logged in user owns this copy of the project
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
     * @param newBoard
     * @return
     */
    @Override
    public ProjectRecord saveProjectCodeAs(Long idProject, String code, String newName, String newBoard) {
        
        LOG.info("Saving project code from project {} as '{}'", idProject,  newName);

        // Retreive the source project
        ProjectRecord original = getProject(idProject);

        if (original == null) {
            LOG.error("Original project {} is missing. Unable to save code as...", idProject);
            throw new NullPointerException("Project doesn't exist");
        }

        // Use the board type from the parent project if it was not provided
        if (newBoard == null) {
            newBoard = original.getBoard();
        }

        
        // Obtain the current bp user record. 
        Long idUser = BlocklyPropSecurityUtils.getCurrentUserId();
        
        if (idUser != null) {
            // Create a copy of the source project is the source project is owned
            // by the current user OR if the source project is designated as a
            // shared or community project
            // --------------------------------------------------------------------
            boolean sharedStatus = projectSharingService.isProjectShared(idProject);
            LOG.info("Project shared status: {}", sharedStatus);

           if (original.getIdUser().equals(idUser) ||       // Project is owned by currently logged in user
                   sharedStatus ||                          // Project is shared
                   (!original.getPrivate())) {              // Project is public

                ProjectRecord cloned = createProject(
                        newName, 
                        original.getDescription(),
                        original.getDescriptionHtml(),
                        code,
                        original.getType(),
                        newBoard,
                        true,                   // Set project private
                        false,                  // Set project unshared
                        original.getId());

                if (cloned == null) {
                    LOG.warn("Unable to create a copy of the project.");
                }
                return cloned;
            } else {
                LOG.warn("Unable to copy the project. UID: {}, PUID: {}, Shared: {}",
                        idUser, original.getIdUser(), original.getShared());
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
                original.getId(),        // set the parent project id
                original.getSettings()
        );

//        cloned.setBasedOn(original.getId());
//        cloned.update();

        // TODO: URGENT - Evaluate query to verify that it is updating only one record
        create.update(Tables.PROJECT)
                .set(Tables.PROJECT.BASED_ON, original.getId())
                .where(Tables.PROJECT.ID.equal(cloned.getId()));
        
        return cloned;
    }

    
    // Produce a current timestamp
    private GregorianCalendar getCurrentTimestamp() {
        GregorianCalendar cal = new GregorianCalendar();
        cal.setTime(new java.util.Date());
        
        return cal;
    }
    


    
    
    
    // Evaluate project code and replace any deprecated or updated blocks
    //
    // Return a ProjectRecord object. The code field may be altered to correct
    // any old, deprecated or updated blocks. The method will throw an
    // exception if the ProjectRecord parameter is null or something has gone
    // horribly wrong with the string conversions.
    //
    private ProjectRecord alterReadRecord(ProjectRecord record) {
        

        String currentCode, newCode;

        if (record == null) {
            LOG.error("alterReadRecord detected a null project record.");
            return null;
        }

        try {
            if (record.getCodeBlockVersion() == BLOCKLY_LIBRARY_VERSION) {
                LOG.info("Bypassing project block evaluation");
                return record;
            }
   
            LOG.info("Verify project {} block version {} characteristics",
                    record.getId(),
                    record.getCodeBlockVersion());
            
            currentCode = record.getCode();

            // Return immediately if there is no code to adjust
            if (currentCode == null) {
                LOG.warn("Project () code block is empty.", record.getId());
                return record;
            }
            
            if (currentCode.length() < Min_BlocklyCodeSize ) {
                LOG.warn("Project code appears to be empty. Code size:{}",currentCode.length());
                return record;
            }

            /* Store the evaluated code in a new variable so we can compare
             * the copy with the original project code. If the two images
             * are unalike, update the project code in the database with the
             * updated code.
             */
            newCode = fixPropcProjectBlocks(currentCode, record.getType());

            // Check for any difference from the original code
            if (!currentCode.equals(newCode)) {
                record.setCode(newCode);
            }
        } catch (Exception ex) {
            LOG.error("Exception trapped. Message is: {}", ex.getMessage());
        }

        LOG.info("Project blocks unchanged.");
        return record;
    }

        /**
     *
     * Create a random string to use as a blockID.
     *
     * This method is used to create a random block name for blocks that are
     * replaced in the deprecated block conversion routines.
     *
     * @param len
     * @return
     */
    private String randomString(int len) {
        StringBuilder sb = new StringBuilder(len);
        for (int i = 0; i < len; i++) {
            sb.append(AB.charAt(rnd.nextInt(AB.length())));
        }
        return sb.toString();
    }

    // Correct depricated block details related to Spin blocks
    @Deprecated
    private String fixSpinProjectBlocks(String newCode) {
        LOG.info("Looking for depricated Spin blocks.");

        newCode = newCode.replaceAll(
                "block type=\"controls_if\"",
                "block type=\"controls_boolean_if\"");

        newCode = newCode.replaceAll(
                "block type=\"logic_compare\"",
                "block type=\"logic_boolean_compare\"");

        newCode = newCode.replaceAll(
                "block type=\"logic_operation\"",
                "block type=\"logic_boolean_operation\"");

        newCode = newCode.replaceAll(
                "block type=\"logic_negate\"",
                "block type=\"logic_boolean_negate\"");

        newCode = newCode.replaceAll(
                "block type=\"math_number\"",
                "block type=\"spin_integer\"");
        
        return newCode;
    }

    /**
     * Find and replace deprecated project code blocks
     * 
     * @param originalCode is the project code that will be evaluated.
     * @param projType
     * @return 
     */
    private String fixPropcProjectBlocks(String originalCode, ProjectType projType) {
        LOG.info("Looking for depricated PropC blocks.");
        
        // Copy the original project code into a working variable
        String newCode = originalCode;

        newCode = newCode.replaceAll(
                "field name=\"OP\">ADD</field",
                "field name=\"OP\"> + </field");

        newCode = newCode.replaceAll(
                "field name=\"OP\">MINUS</field",
                "field name=\"OP\"> - </field");

        newCode = newCode.replaceAll(
                "field name=\"OP\">MULTIPLY</field",
                "field name=\"OP\"> * </field");

        newCode = newCode.replaceAll(
                "field name=\"OP\">DIVIDE</field",
                "field name=\"OP\"> / </field");

        newCode = newCode.replaceAll(
                "field name=\"OP\">MODULUS</field",
                "field name=\"OP\"> % </field");

        newCode = newCode.replaceAll(
                "field name=\"OP\">AND</field",
                "field name=\"OP\"> &amp;&amp; </field");

        newCode = newCode.replaceAll(
                "field name=\"OP\">AND_NOT</field",
                "field name=\"OP\"> &amp;&amp; !</field");

        newCode = newCode.replaceAll(
                "field name=\"OP\">LT</field",
                "field name=\"OP\">&lt;</field");

        newCode = newCode.replaceAll(
                "field name=\"OP\">GT</field",
                "field name=\"OP\">&gt;</field");

        newCode = newCode.replaceAll(
                "field name=\"OP\">LTE</field",
                "field name=\"OP\">&lt;=</field");

        newCode = newCode.replaceAll(
                "field name=\"OP\">GTE</field",
                "field name=\"OP\">&gt;=</field");

        newCode = newCode.replaceAll(
                "field name=\"OP\">EQ</field",
                "field name=\"OP\">==</field");

        newCode = newCode.replaceAll(
                "field name=\"OP\">NEQ</field",
                "field name=\"OP\">!=</field");

        newCode = newCode.replaceAll(
                "field name=\"UNIT\">INCHES</field",
                "field name=\"UNIT\">_inches</field");

        newCode = newCode.replaceAll(
                "field name=\"UNIT\">CM</field",
                "field name=\"UNIT\">_cm</field");

        newCode = newCode.replaceAll(
                "block type=\"spin_comment\"",
                "block type=\"comment\"");

        newCode = newCode.replaceAll(
                "field name=\"COMMENT\">",
                "field name=\"COMMENT_TEXT\">");

        newCode = newCode.replaceAll(
                "block type=\"controls_boolean_if\"",
                "block type=\"controls_if\"");

        newCode = newCode.replaceAll(
                "block type=\"logic_boolean_compare\"",
                "block type=\"logic_compare\"");

        newCode = newCode.replaceAll(
                "block type=\"logic_boolean_operation\"",
                "block type=\"logic_operation\"");

        newCode = newCode.replaceAll(
                "block type=\"logic_boolean_negate\"",
                "block type=\"logic_negate\"");
        
        newCode = newCode.replaceAll( "_000 / ", "000 / ");

        // Fix a small issue with calling the wrong project type.
        newCode = newCode.replaceAll(
                "block type=\"spin_integer\"",
                "block type=\"math_number\"");
        
        if (!newCode.contains("block type=\"math_number\"") && projType == ProjectType.SPIN) {
            // Change all math number blocks to the same kind
            newCode = newCode.replaceAll(
                    "block type=\"math_int_angle\"",
                    "block type=\"math_number\"");
            
            newCode = newCode.replaceAll(
                    "block type=\"math_integer\"",
                    "block type=\"math_number\"");
            
            newCode = newCode.replaceAll(
                    "block type=\"scribbler_random_number\"",
                    "block type=\"math_random\"");
            
            newCode = newCode.replaceAll(
                    "field name=\"INT_VALUE\"",
                    "field name=\"NUM\"");
            
            newCode = newCode.replaceAll(
                    "field name=\"ANGLE_VALUE\"",
                    "field name=\"NUM\"");

            newCode = newCode.replaceAll(
                    "block type=\"digital_input\"",
                    "block type=\"check_pin\"");
            
            newCode = newCode.replaceAll(
                    "block type=\"digital_output\"",
                    "block type=\"make_pin\"");
            
            newCode = newCode.replaceAll(
                    "block type=\"scribbler_servo\"",
                    "block type=\"servo_move\"");
            
            newCode = newCode.replaceAll(
                    "field name=\"SERVO_PIN\"",
                    "field name=\"PIN\"");
            
            newCode = newCode.replaceAll(
                    "field name=\"SERVO_ANGLE\"",
                    "field name=\"ANGLE\"");
            
            newCode = newCode.replaceAll(
                    "<block type=\"serial_",
                    "<block type=\"scribbler_serial_");
            
            newCode = newCode.replaceAll(
                    "field name=\"TIMESCALE\">1000<",
                    "field name=\"TIMESCALE\">Z1<");
            
            newCode = newCode.replaceAll(
                    "field name=\"TIMESCALE\">1<",
                    "field name=\"TIMESCALE\">Z1000<");
            
            newCode = newCode.replaceAll(
                    "field name=\"TIMESCALE\">10<",
                    "field name=\"TIMESCALE\">100<");
            
            newCode = newCode.replaceAll(
                    "field name=\"TIMESCALE\">Z",
                    "field name=\"TIMESCALE\">");
            
            newCode = newCode.replaceAll("Scribbler#CS","256");
            newCode = newCode.replaceAll("Scribbler#NL","10");
            newCode = newCode.replaceAll("Scribbler#LF","13");
            newCode = newCode.replaceAll("Scribbler#BS","127");
            
            newCode = newCode.replaceAll(
                    "block type=\"scribbler_loop\"",
                    "block type=\"controls_repeat\"");
            
            newCode = newCode.replaceAll(
                    "statement name=\"LOOP\"",
                    "statement name=\"DO\"");
            
            newCode = newCode.replaceAll(
                    "<block type=\"scribbler_limited_loop\" id=(.*)><field name=\"LOOP_COUNT\">(.*)</field><statement name=\"LOOP\">",
                    "<block type=\"controls_repeat\" id=$1><mutation type=\"TIMES\"></mutation><field name=\"TYPE\">TIMES</field><value name=\"TIMES\"><block type=\"math_number\" id=\"" + randomString(20) + "\"><field name=\"NUM\">$2</field></block></value><statement name=\"DO\">");      
        }
        
        // Replace the Robot init block with two blocks, need to generate unique 20-digit blockID:
        if (!newCode.contains("block type=\"ab_drive_ramping\"")) {
            newCode = newCode.replaceAll(
                    "</field><field name=\"RAMPING\">", 
                    "</field></block><block type=\"ab_drive_ramping\" id=\""
                            + randomString(20) 
                            + "\"><field name=\"RAMPING\">");
        }
        
        return newCode;
    }
}
