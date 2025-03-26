# Test Case: QR Code Functionality

## Login As Patron

**FilePath:** `apps/frontend/e2e/tests/AdminTest/admin.Qrcode.spec.ts`

**EndPoint:** `https://staging-fe.mytwocents.io/admin/login/`

**Authentication:** 'Yes'

**Login:**

- Login with valid credentials
- Enter Email and Password
- Click on Continue

**QR code Screen:**

- Navigate to QR code screen
- Search QR code `TCQR28`
- Check if the Download icon is enabled, and if it is, click on it.
- Check if the Copy icon is enabled, and if it is, click on it.
- Click on Note
- Click on Add note
- Add input to text field 
- Click on cross icon to clear text
- Click on Add note
- Enter input to text field
- Click on Uparrow
- Note is added successfully
