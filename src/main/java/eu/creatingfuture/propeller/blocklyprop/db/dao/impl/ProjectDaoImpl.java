/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eu.creatingfuture.propeller.blocklyprop.db.dao.impl;

import com.google.inject.Singleton;
import com.google.inject.persist.Transactional;
import eu.creatingfuture.propeller.blocklyprop.db.dao.ProjectDao;
import eu.creatingfuture.propeller.blocklyprop.db.generated.Tables;
import eu.creatingfuture.propeller.blocklyprop.db.generated.tables.records.ProjectRecord;
import javax.inject.Inject;
import org.jooq.DSLContext;

/**
 *
 * @author Michel
 */
@Singleton
@Transactional
public class ProjectDaoImpl implements ProjectDao {

    private DSLContext create;

    @Inject
    public void setDSLContext(DSLContext dsl) {
        this.create = dsl;
    }

    @Override
    public void create(ProjectRecord project) {
        //create.insertInto(Tables.PROJECT).set(project).execute();
        ProjectRecord record = create.insertInto(Tables.PROJECT, Tables.PROJECT.CODE).values("test").returning().fetchOne();
    }

}
