/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package eu.creatingfuture.propeller.blocklyprop.db.dao;

import eu.creatingfuture.propeller.blocklyprop.db.generated.tables.records.ProjectRecord;

/**
 *
 * @author Michel
 */
public interface ProjectDao {

    void create(ProjectRecord project);

}
