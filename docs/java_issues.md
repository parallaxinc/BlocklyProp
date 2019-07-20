2019-05-19 Timezone Issue in Oracle J-Connector


After upgrading the MySql J-Connector, the following error occurs when an attempt is made to connect to a MySQL server:

``
The server time zone value 'PST' is unrecognized or represents more than one time zone. You must
configure either the server or JDBC driver (via the serverTimezone configuration property) to use
a more specifc time zone value if you want to utilize time zone support.
```

Affected versions:
 5.1.33+, 8.0.*
 
 Bug Report link:
 https://bugs.mysql.com/bug.php?id=85816
 
 Online documentation that addresses this issue:
 https://dev.mysql.com/doc/connector-j/8.0/en/connector-j-other-changes.html
 
