/**
 * This class is generated by jOOQ
 */
package eu.creatingfuture.propeller.blocklyprop.db.tables;


import eu.creatingfuture.propeller.blocklyprop.db.Blocklyprop;
import eu.creatingfuture.propeller.blocklyprop.db.Keys;
import eu.creatingfuture.propeller.blocklyprop.db.tables.records.UserRecord;

import java.sql.Timestamp;
import java.util.Arrays;
import java.util.List;

import javax.annotation.Generated;

import org.jooq.Field;
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
		"jOOQ version:3.6.1"
	},
	comments = "This class is generated by jOOQ"
)
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class User extends TableImpl<UserRecord> {

	private static final long serialVersionUID = -1895127665;

	/**
	 * The reference instance of <code>blocklyprop.user</code>
	 */
	public static final User USER = new User();

	/**
	 * The class holding records for this type
	 */
	@Override
	public Class<UserRecord> getRecordType() {
		return UserRecord.class;
	}

	/**
	 * The column <code>blocklyprop.user.id</code>.
	 */
	public final TableField<UserRecord, Integer> ID = createField("id", org.jooq.impl.SQLDataType.INTEGER.nullable(false), this, "");

	/**
	 * The column <code>blocklyprop.user.screenname</code>.
	 */
	public final TableField<UserRecord, String> SCREENNAME = createField("screenname", org.jooq.impl.SQLDataType.VARCHAR.length(255).nullable(false), this, "");

	/**
	 * The column <code>blocklyprop.user.email</code>.
	 */
	public final TableField<UserRecord, String> EMAIL = createField("email", org.jooq.impl.SQLDataType.VARCHAR.length(255).nullable(false), this, "");

	/**
	 * The column <code>blocklyprop.user.password</code>.
	 */
	public final TableField<UserRecord, String> PASSWORD = createField("password", org.jooq.impl.SQLDataType.VARCHAR.length(255).nullable(false), this, "");

	/**
	 * The column <code>blocklyprop.user.salt</code>.
	 */
	public final TableField<UserRecord, String> SALT = createField("salt", org.jooq.impl.SQLDataType.VARCHAR.length(255).nullable(false), this, "");

	/**
	 * The column <code>blocklyprop.user.blocked</code>.
	 */
	public final TableField<UserRecord, Boolean> BLOCKED = createField("blocked", org.jooq.impl.SQLDataType.BOOLEAN.nullable(false).defaulted(true), this, "");

	/**
	 * The column <code>blocklyprop.user.created</code>.
	 */
	public final TableField<UserRecord, Timestamp> CREATED = createField("created", org.jooq.impl.SQLDataType.TIMESTAMP.nullable(false).defaulted(true), this, "");

	/**
	 * The column <code>blocklyprop.user.modified</code>.
	 */
	public final TableField<UserRecord, Timestamp> MODIFIED = createField("modified", org.jooq.impl.SQLDataType.TIMESTAMP.nullable(false).defaulted(true), this, "");

	/**
	 * Create a <code>blocklyprop.user</code> table reference
	 */
	public User() {
		this("user", null);
	}

	/**
	 * Create an aliased <code>blocklyprop.user</code> table reference
	 */
	public User(String alias) {
		this(alias, USER);
	}

	private User(String alias, Table<UserRecord> aliased) {
		this(alias, aliased, null);
	}

	private User(String alias, Table<UserRecord> aliased, Field<?>[] parameters) {
		super(alias, Blocklyprop.BLOCKLYPROP, aliased, parameters, "");
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public UniqueKey<UserRecord> getPrimaryKey() {
		return Keys.KEY_USER_PRIMARY;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public List<UniqueKey<UserRecord>> getKeys() {
		return Arrays.<UniqueKey<UserRecord>>asList(Keys.KEY_USER_PRIMARY, Keys.KEY_USER_SCREENNAME_UNIQUE, Keys.KEY_USER_EMAIL_UNIQUE);
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public User as(String alias) {
		return new User(alias, this);
	}

	/**
	 * Rename this table
	 */
	public User rename(String name) {
		return new User(name, null);
	}
}
