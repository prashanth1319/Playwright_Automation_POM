# Test Case: Suggest a Business for Twocents & Submit Business Contact Form


**FilePath:** `apps/frontend/e2e/tests/UserTest/non_login_Twocents_Feedback.spec.ts`

**EndPoint:** `https://staging-fe.mytwocents.io/`

**Authentication:** 'No'

**Description for non-logged user**

- Enter URl and wait until landing page loads
- Click on Hamburger icon 
- Click on `Business Owner Sign Up` opton from modal

**Business Contact Form**
- Business form will display
- Get all error message of all test fields
- Enter Name 
- Enter Business Name
- Enter city 
- Enter Email
- Click on "Submit" Button
- Validate and get toast message `Message received.Tom or Drew will reach out ASAP!`
- Back to Home screen

## Suggestions flow

- Click on Hamburger icon 
- Click on `User Feedback/ Bug report` opton from modal
- Naviagte to Suggestion flow
- Select all available category and Click on "Next"
- Enter "Feedback" input and Click on "Next"
- Drag element for `How likely return..` and click on "Next"
- This business will be optio appear, as per new changes by default one radio button is selected directly click on "Next" Button
- Get Entered details like , Catrgory, Feedback input, likey return, Anonomyous or User
- Click on Edit icon to update Feedback, Update feedback by clicking on save button
- Click on Edit icon and to update "rating" click on save button
- Click on Edit icon and to update "Anonymous/User" click on save button
- Click on Submit Button to submit suggestion
- Click on Continue CTA

