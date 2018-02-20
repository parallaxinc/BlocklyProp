/**
 * This class is generated by jOOQ
 */
package com.parallax.server.blocklyprop.db.generated.tables;


import com.parallax.server.blocklyprop.db.enums.Role;
import com.parallax.server.blocklyprop.db.generated.Blocklyprop;
import com.parallax.server.blocklyprop.db.generated.Keys;
import com.parallax.server.blocklyprop.db.generated.tables.records.SecRoleRecord;
import com.parallax.server.blocklyprop.db.utils.RoleConverter;

import java.util.Arrays;
import java.util.List;

import javax.annotation.Generated;

import org.jooq.Field;
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
public class SecRole extends TableImpl<SecRoleRecord> {

	private static final long serialVersionUID = 1675331090;

	/**
	 * The reference instance of <code>blocklyprop.sec_role</code>
	 */
	public static final SecRole SEC_ROLE = new SecRole();

	/**
	 * The class holding records for this type
	 */
	@Override
	public Class<SecRoleRecord> getRecordType() {
		return SecRoleRecord.class;
	}

	/**
	 * The column <code>blocklyprop.sec_role.id</code>.
	 */
	public final TableField<SecRoleRecord, Long> ID = createField("id", org.jooq.impl.SQLDataType.BIGINT.nullable(false), this, "");

	/**
	 * The column <code>blocklyprop.sec_role.name</code>.
	 */
	public final TableField<SecRoleRecord, Role> NAME = createField("name", org.jooq.impl.SQLDataType.VARCHAR.length(255).nullable(false), this, "", new RoleConverter());

	/**
	 * Create a <code>blocklyprop.sec_role</code> table reference
	 */
	public SecRole() {
		this("sec_role", null);
	}

	/**
	 * Create an aliased <code>blocklyprop.sec_role</code> table reference
	 */
	public SecRole(String alias) {
		this(alias, SEC_ROLE);
	}

	private SecRole(String alias, Table<SecRoleRecord> aliased) {
		this(alias, aliased, null);
	}

	private SecRole(String alias, Table<SecRoleRecord> aliased, Field<?>[] parameters) {
		super(alias, Blocklyprop.BLOCKLYPROP, aliased, parameters, "");
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Identity<SecRoleRecord, Long> getIdentity() {
		return Keys.IDENTITY_SEC_ROLE;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public UniqueKey<SecRoleRecord> getPrimaryKey() {
		return Keys.KEY_SEC_ROLE_PRIMARY;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public List<UniqueKey<SecRoleRecord>> getKeys() {
		return Arrays.<UniqueKey<SecRoleRecord>>asList(Keys.KEY_SEC_ROLE_PRIMARY, Keys.KEY_SEC_ROLE_NAME_UNIQUE);
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public SecRole as(String alias) {
		return new SecRole(alias, this);
	}

	/**
	 * Rename this table
	 */
	public SecRole rename(String name) {
		return new SecRole(name, null);
	}
}
