# Test Case: Redirect screen Functionality

## Login As Admin

**FilePath:** `apps/frontend/e2e/tests/AdminTest/admin.Redirect_Test.spec.ts`

**EndPoint:** `https://staging-fe.mytwocents.io/admin/login/`

**Authentication:** 'Yes'

**Login:**

- Login with valid credentials
- Enter Email and Password
- Click on Continue

**Redirect:**

- Navigate to redirect sceen
- Search Active redirect link
- Before searching, the search input fetch fromfrom active list
- Click on edit
- Click on `Temporary Redirect`
- Click on 'Redircet' button to save
