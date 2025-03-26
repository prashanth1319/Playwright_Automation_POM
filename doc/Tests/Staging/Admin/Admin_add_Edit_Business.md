# Test Case: Add and Edit business Functionality

## Login As Patron

**FilePath:** `apps/frontend/e2e/tests/AdminTest/admin_Business_access.spec.ts`

**EndPoint:** `https://staging-fe.mytwocents.io/admin/login/`

**Authentication:** 'Yes'

**Login:**

- Login with valid credentials
- Enter Email and Password
- Click on Continue

**Home Screen:**

- Navigate to Home screen
- Search customer business
- Click on Copy icon and download icon

**Add business:**

- Click on Add business button 
- Validate form is viisble or not
- Get error message of text field by click on Add business button
- Enter details
   - Enter Corporation Name
   - Enter Business Name
   - Select Business Type
   - Enter Business City
   - Upload Business Logo
   - Upload Business Hero Image
   - Add Yelp Link
   - Add Google Link
   - Send Invite to Business Owner
   - Select radio button for "Craete New QR code"
- Click on Add business button 
- New business is added successfualy

**Edit Business:**

- Sarch business 
- Click on edit option on searched business
- Validate edit business name on Edit page
- Update any details like
    - Enter Corporation Name
    - Enter Business Name
    - Select Business Type
    - Enter Business City
    - Upload Business Logo
    - Upload Business Hero Image
    - Add Yelp Link
    - Add Google Link
    - Send Invite to Business Owner
- Click on "Save changes" button
- Successfully updated business