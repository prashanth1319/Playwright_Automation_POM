# Test Case: Login, Business Dashboard Functionality

## Login As Bsuiness Owner

**FilePath:** `apps/frontend/e2e/tests/BusinessTest/businessLoin_Test_login.spec.ts`

**EndPoint:** `https://staging-fe.mytwocents.io/Business/Dashboard`

**Authentication:** 'Login with Emial(Bypass)'

**Description for Login**

- Login with access toke using API
- Extract token
- Got to `https://staging-fe.mytwocents.io/Business/Dashboard`
- Set cookies and local storage

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
