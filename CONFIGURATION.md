# BlocklyProp configuration

Database connection, cdn and download file locations, backend servers and oauth can be configured using a properties file.
The application will look for a file called **blocklyprop.properties** in the home directory of the user that started the tomcat at startup.

If changes are made to the configuration file, the server will need to be restarted to put these into effect.

## Database configuration
To configure the database connection use the following configuration property:

- Connection url: **database.url**. Defaults to: *jdbc:mysql://localhost:3306/blocklyprop*
- Database username: **database.username**. Defaults to: *blocklyprop*
- Database password: **database.password**. Defaults to: *blocklyprop*

## cdn and download files location
CDN and download files can be provided by the tomcat, or they can be served by an other server

- CDN files: **cdnfiles.baseurl**. Defaults to: *http://localhost:8080/cdn*
- CDN https files: **cdnfiles.baseurl**. (Only required if not using default ports, if not defined, it takes the cdn files url and converts it from http to https.)
- Download files: **downloadfiles.baseurl**. Defaults to: *http://localhost:8080/download*


## Backend servers
BlocklyProp can not work without its backend server.

- Cloud session: **cloudsession.baseurl**. Defaults to: *http://localhost:5011*
- Cloud compiler: **cloudcompiler.baseurl**. Defaults to: *http://localhost:5000*

## OAuth authentication providers
The different oauth authentication providers can be enabled individually. Also the key, secret and callback url need to be configured.

For each provider:

- Cloud session: **oauth.<provider>.enabled**. Defaults to: *false*
- OAuth provider key: **oauth.<provider>.key**. No default, needs to be configured if provider is enabled.
- OAuth provider secret: **oauth.<provider>.secret**. No default, needs to be configured if provider is enabled.
- Callback url: **oauth.<provider>.callback**. No default, needs to be configured if provider is enabled.