# Test Case: Feeds Functionality

## Login As Patron

**FilePath:** `apps/frontend/e2e/tests/AdminTest/adminFeeds_Test.spec.ts`

**EndPoint:** `https://staging-fe.mytwocents.io/admin/login/`

**Authentication:** 'Yes'

**Login:**

- Login with valid credentials
- Enter Email and Password
- Click on Continue

**Feeds Module:**

- Click on Feeds
- Click on 7 days soption
- Get total suggestion, High Quality suggetsion and Low quality suggestion
- Clickk on 30 days option
- Get total suggestion, High Quality suggetsion and Low quality suggestion

**Search feedback:**

- Search feed
- Click on See suggestion
- Get Feedback details like
  - Business Name
  - Selected Category
  - Anonymous or User
  - Feedback input
  - How likely I am to return...
  - Status of feedback
- Click on close
