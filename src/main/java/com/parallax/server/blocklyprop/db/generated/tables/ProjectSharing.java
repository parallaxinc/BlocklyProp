/**
 * This class is generated by jOOQ
 */
package com.parallax.server.blocklyprop.db.generated.tables;


import com.parallax.server.blocklyprop.db.generated.Blocklyprop;
import com.parallax.server.blocklyprop.db.generated.Keys;
import com.parallax.server.blocklyprop.db.generated.tables.records.ProjectSharingRecord;

import java.sql.Timestamp;
import java.util.Arrays;
import java.util.List;

import javax.annotation.Generated;

import org.jooq.Field;
import org.jooq.ForeignKey;
import org.jooq.Identity;
import org.jooq.Table;
import org.jooq.TableField;
import org.jooq.UniqueKey;
import org.jooq.impl.TableImpl;


/**
 * This class is generated by jOOQ.
 */
@Generated(
	value = {
		"http://www.jooq.org",
		"jOOQ version:3.7.4"
	},
	comments = "This class is generated by jOOQ"
)
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class ProjectSharing extends TableImpl<ProjectSharingRecord> {

	private static final long serialVersionUID = 1971663629;

	/**
	 * The reference instance of <code>blocklyprop.project_sharing</code>
	 */
	public static final ProjectSharing PROJECT_SHARING = new ProjectSharing();

	/**
	 * The class holding records for this type
	 */
	@Override
	public Class<ProjectSharingRecord> getRecordType() {
		return ProjectSharingRecord.class;
	}

	/**
	 * The column <code>blocklyprop.project_sharing.id</code>.
	 */
	public final TableField<ProjectSharingRecord, Long> ID = createField("id", org.jooq.impl.SQLDataType.BIGINT.nullable(false), this, "");

	/**
	 * The column <code>blocklyprop.project_sharing.id_project</code>.
	 */
	public final TableField<ProjectSharingRecord, Long> ID_PROJECT = createField("id_project", org.jooq.impl.SQLDataType.BIGINT.nullable(false), this, "");

	/**
	 * The column <code>blocklyprop.project_sharing.sharekey</code>.
	 */
	public final TableField<ProjectSharingRecord, String> SHAREKEY = createField("sharekey", org.jooq.impl.SQLDataType.VARCHAR.length(255), this, "");

	/**
	 * The column <code>blocklyprop.project_sharing.active</code>.
	 */
	public final TableField<ProjectSharingRecord, Boolean> ACTIVE = createField("active", org.jooq.impl.SQLDataType.BIT.defaulted(true), this, "");

	/**
	 * The column <code>blocklyprop.project_sharing.expires</code>.
	 */
	public final TableField<ProjectSharingRecord, Boolean> EXPIRES = createField("expires", org.jooq.impl.SQLDataType.BIT.defaulted(true), this, "");

	/**
	 * The column <code>blocklyprop.project_sharing.exprire_date</code>.
	 */
	public final TableField<ProjectSharingRecord, Timestamp> EXPRIRE_DATE = createField("exprire_date", org.jooq.impl.SQLDataType.TIMESTAMP, this, "");

	/**
	 * Create a <code>blocklyprop.project_sharing</code> table reference
	 */
	public ProjectSharing() {
		this("project_sharing", null);
	}

	/**
	 * Create an aliased <code>blocklyprop.project_sharing</code> table reference
	 */
	public ProjectSharing(String alias) {
		this(alias, PROJECT_SHARING);
	}

	private ProjectSharing(String alias, Table<ProjectSharingRecord> aliased) {
		this(alias, aliased, null);
	}

	private ProjectSharing(String alias, Table<ProjectSharingRecord> aliased, Field<?>[] parameters) {
		super(alias, Blocklyprop.BLOCKLYPROP, aliased, parameters, "");
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Identity<ProjectSharingRecord, Long> getIdentity() {
		return Keys.IDENTITY_PROJECT_SHARING;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public UniqueKey<ProjectSharingRecord> getPrimaryKey() {
		return Keys.KEY_PROJECT_SHARING_PRIMARY;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public List<UniqueKey<ProjectSharingRecord>> getKeys() {
		return Arrays.<UniqueKey<ProjectSharingRecord>>asList(Keys.KEY_PROJECT_SHARING_PRIMARY, Keys.KEY_PROJECT_SHARING_PROJECT_SHARING_ID_PROJECT_SHAREKEY_UINDEX);
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public List<ForeignKey<ProjectSharingRecord, ?>> getReferences() {
		return Arrays.<ForeignKey<ProjectSharingRecord, ?>>asList(Keys.PROJECT_SHARING_PROJECT_ID_FK);
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public ProjectSharing as(String alias) {
		return new ProjectSharing(alias, this);
	}

	/**
	 * Rename this table
	 */
	public ProjectSharing rename(String name) {
		return new ProjectSharing(name, null);
	}
}
