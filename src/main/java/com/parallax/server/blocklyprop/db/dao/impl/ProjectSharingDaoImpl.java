/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.parallax.server.blocklyprop.db.dao.impl;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.parallax.server.blocklyprop.db.dao.ProjectSharingDao;
import com.parallax.server.blocklyprop.db.generated.Tables;
import com.parallax.server.blocklyprop.db.generated.tables.records.ProjectSharingRecord;
import java.util.List;
import org.jooq.DSLContext;

/**
 *
 * @author Michel
 */
@Singleton
public class ProjectSharingDaoImpl implements ProjectSharingDao {

    private DSLContext create;

    @Inject
    public void setDSLContext(DSLContext dsl) {
        this.create = dsl;
    }

    @Override
    public ProjectSharingRecord getProject(Long idProject, String accessKey) {
        return create.selectFrom(Tables.PROJECT_SHARING).where(Tables.PROJECT_SHARING.ID_PROJECT.equal(idProject).and(Tables.PROJECT_SHARING.SHAREKEY.equal(accessKey))).fetchOne();
    }

    @Override
    public ProjectSharingRecord shareProject(Long idProject, String shareKey) {
        return create.insertInto(Tables.PROJECT_SHARING).columns(Tables.PROJECT_SHARING.ID_PROJECT, Tables.PROJECT_SHARING.SHAREKEY).values(idProject, shareKey).returning().fetchOne();
    }

    @Override
    public int revokeSharing(Long idProject) {
        return create.deleteFrom(Tables.PROJECT_SHARING).where(Tables.PROJECT_SHARING.ID_PROJECT.equal(idProject)).execute();
    }

    @Override
    public List<ProjectSharingRecord> getSharingInfo(Long idProject) {
        return create.selectFrom(Tables.PROJECT_SHARING).where(Tables.PROJECT_SHARING.ID_PROJECT.equal(idProject)).fetch();
    }

}
