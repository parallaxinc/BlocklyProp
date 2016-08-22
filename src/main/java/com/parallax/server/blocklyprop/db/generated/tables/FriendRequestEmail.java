/**
 * This class is generated by jOOQ
 */
package com.parallax.server.blocklyprop.db.generated.tables;


import com.parallax.server.blocklyprop.db.generated.Blocklyprop;
import com.parallax.server.blocklyprop.db.generated.Keys;
import com.parallax.server.blocklyprop.db.generated.tables.records.FriendRequestEmailRecord;

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
		"jOOQ version:3.6.1"
	},
	comments = "This class is generated by jOOQ"
)
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class FriendRequestEmail extends TableImpl<FriendRequestEmailRecord> {

	private static final long serialVersionUID = -154149183;

	/**
	 * The reference instance of <code>blocklyprop.friend_request_email</code>
	 */
	public static final FriendRequestEmail FRIEND_REQUEST_EMAIL = new FriendRequestEmail();

	/**
	 * The class holding records for this type
	 */
	@Override
	public Class<FriendRequestEmailRecord> getRecordType() {
		return FriendRequestEmailRecord.class;
	}

	/**
	 * The column <code>blocklyprop.friend_request_email.id</code>.
	 */
	public final TableField<FriendRequestEmailRecord, Long> ID = createField("id", org.jooq.impl.SQLDataType.BIGINT.nullable(false), this, "");

	/**
	 * The column <code>blocklyprop.friend_request_email.idRequestUser</code>.
	 */
	public final TableField<FriendRequestEmailRecord, Long> IDREQUESTUSER = createField("idRequestUser", org.jooq.impl.SQLDataType.BIGINT.nullable(false), this, "");

	/**
	 * The column <code>blocklyprop.friend_request_email.email</code>.
	 */
	public final TableField<FriendRequestEmailRecord, Long> EMAIL = createField("email", org.jooq.impl.SQLDataType.BIGINT.nullable(false), this, "");

	/**
	 * The column <code>blocklyprop.friend_request_email.accept_Key</code>.
	 */
	public final TableField<FriendRequestEmailRecord, String> ACCEPT_KEY = createField("accept_Key", org.jooq.impl.SQLDataType.VARCHAR.length(255).nullable(false), this, "");

	/**
	 * The column <code>blocklyprop.friend_request_email.requested</code>.
	 */
	public final TableField<FriendRequestEmailRecord, Timestamp> REQUESTED = createField("requested", org.jooq.impl.SQLDataType.TIMESTAMP.nullable(false).defaulted(true), this, "");

	/**
	 * The column <code>blocklyprop.friend_request_email.request_sent_count</code>.
	 */
	public final TableField<FriendRequestEmailRecord, Integer> REQUEST_SENT_COUNT = createField("request_sent_count", org.jooq.impl.SQLDataType.INTEGER.nullable(false).defaulted(true), this, "");

	/**
	 * The column <code>blocklyprop.friend_request_email.request_last_sent</code>.
	 */
	public final TableField<FriendRequestEmailRecord, Timestamp> REQUEST_LAST_SENT = createField("request_last_sent", org.jooq.impl.SQLDataType.TIMESTAMP.defaulted(true), this, "");

	/**
	 * The column <code>blocklyprop.friend_request_email.refused</code>.
	 */
	public final TableField<FriendRequestEmailRecord, Boolean> REFUSED = createField("refused", org.jooq.impl.SQLDataType.BIT.nullable(false).defaulted(true), this, "");

	/**
	 * Create a <code>blocklyprop.friend_request_email</code> table reference
	 */
	public FriendRequestEmail() {
		this("friend_request_email", null);
	}

	/**
	 * Create an aliased <code>blocklyprop.friend_request_email</code> table reference
	 */
	public FriendRequestEmail(String alias) {
		this(alias, FRIEND_REQUEST_EMAIL);
	}

	private FriendRequestEmail(String alias, Table<FriendRequestEmailRecord> aliased) {
		this(alias, aliased, null);
	}

	private FriendRequestEmail(String alias, Table<FriendRequestEmailRecord> aliased, Field<?>[] parameters) {
		super(alias, Blocklyprop.BLOCKLYPROP, aliased, parameters, "");
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public Identity<FriendRequestEmailRecord, Long> getIdentity() {
		return Keys.IDENTITY_FRIEND_REQUEST_EMAIL;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public UniqueKey<FriendRequestEmailRecord> getPrimaryKey() {
		return Keys.KEY_FRIEND_REQUEST_EMAIL_PRIMARY;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public List<UniqueKey<FriendRequestEmailRecord>> getKeys() {
		return Arrays.<UniqueKey<FriendRequestEmailRecord>>asList(Keys.KEY_FRIEND_REQUEST_EMAIL_PRIMARY, Keys.KEY_FRIEND_REQUEST_EMAIL_FRIEND_REQUEST_EMAIL_IDREQUESTUSER_IDREQUESTEDUSER_UINDEX, Keys.KEY_FRIEND_REQUEST_EMAIL_ACCEPT_KEY);
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public List<ForeignKey<FriendRequestEmailRecord, ?>> getReferences() {
		return Arrays.<ForeignKey<FriendRequestEmailRecord, ?>>asList(Keys.FRIEND_REQUEST_EMAIL_REQUEST_USER_ID_FK);
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	public FriendRequestEmail as(String alias) {
		return new FriendRequestEmail(alias, this);
	}

	/**
	 * Rename this table
	 */
	public FriendRequestEmail rename(String name) {
		return new FriendRequestEmail(name, null);
	}
}
