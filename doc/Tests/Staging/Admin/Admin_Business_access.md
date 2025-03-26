# Test Case: Add business and Edit Business Functionality

## Login As Patron

**FilePath:** `apps/frontend/e2e/tests/AdminTest/adminFeeds_Test.spec.ts`

**EndPoint:** `https://staging-fe.mytwocents.io/admin/login/`

**Authentication:** 'Yes'

**Login:**

- Login with valid credentials
- Enter Email and Password
- Click on Continue

**Home screen:**
- Once Home screen appears
- Click on new tap icon (Business access)

## Dashboard business

- Get Anlyatiscs of "Helath check chart"

## Inbox

- Check Inbox have suggestion or not
- If "Inbox" have suggestions, the click on first suggestion
- On opening the suggestion, click on either “Acknowledge” or “Resolve,” whichever is available.
- Back to list
- If the “Inbox” has no suggestions, it will display “No suggestions available”

## Resolved
- Click on Resolved option
- If "Resolved" have suggestions, then click on first suggestion
- View the resolved Suggestion
- Back to list

## Archive
- Click on Archive
- If "Archive" have suggestions, then click on first suggestion
- View the Archived Suggestion

## Account
- Click on Account option
- Mouse hover on hamburger icon
- Click on logout
