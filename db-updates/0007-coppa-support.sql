/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Add fields to user table to support US COPPA compliance
 * 
 * Author:  Jim Ewald
 * Created: Apr 27, 2017A
 *
 * birth_month  - is a range of [1 - 12]
 * birth_year   - is a range from [1930 - current year]
 * parent_email - is used to register a child under the ae of 13. This is the
 *                email address of the parent, guardian or instructor that is
 *                creating the account on behalf of the child
 * 
 * parent_email_source - is a integer designator to characterize the parent
 *                       email adress noted above. Current options are:
 *                       0 - undefined
 *                       1 - child's parent
 *                       2 - child's guardian
 *                       3 - child's instructor or teacher
 */

/*
 * This DDL has been moved to the Cloud Session Server project
 */

-- ALTER TABLE cloudsession.user ADD birth_month INT NOT NULL;
-- ALTER TABLE cloudsession.user ADD birth_year INT NOT NULL;
-- ALTER TABLE cloudsession.user ADD parent_email VARCHAR(250) NULL;
-- ALTER TABLE cloudsession.user ADD parent_email_source INT DEFAULT 0 NULL;
-- ALTER TABLE cloudsession.user DROP coach_email;