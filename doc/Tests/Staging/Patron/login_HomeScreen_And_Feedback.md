# Test Case: Login, Home, and Feedback Functionality

## Login As Patron

**FilePath:** `apps/frontend/e2e/tests/UserTest/login_makeSuggestion.spec.ts`

**EndPoint:** `https://staging-fe.mytwocents.io/`

**Authentication:** 'Login with Number'

**Description for Login**

- Enter URl and click on login option
- Clik on login with phone number (bypassed OTP for login only for this number on staging)
- Select country code and Enter mobile number
- Click on continue and enter OTP and Click on Continue
- Naviagte to home screen and Validate the title

## Search business

- Search business by selecting first business from the business list (it can be any new business are added)
- Click on comment icon to make suggestion

## Suggestions flow

- Naviagte to Suggestion flow
- Select all available category and Click on "Next"
- Enter "Feedback" input and Click on "Next"
- Drag element for "How likely return.." and click on "Next"
- This business will be optio appear, as per new changes by default one radio button is selected, directly click on "Next" Button
- Get Entered details like , Catrgory, Feedback input, likey return, Anonomyous or User
- Click on Edit icon to update Feedback, Update feedback by clicking on save button
- Click on Edit icon and click on save button
- Click on Edit icon and click on save button
- Click on Submit Button
- Get Rewards points and Click on Continue CTA

## Home screen

- Click on Hamburger icon Click on "my twocentsoption"
- Get all the suggested business list(Name)
- Click on the first "view suggestion" CTA form the lsit
- Navigate to Suggestion details page
- Get deatils of Sugestion
  - Business name
  - Business status
  - User or anonymous
  - likely retur
  - Feedback input
- Click on close - will redirect to business list screen
- Again clock on close - will redirect to home screen

## My Account

- Once navigate to my account screen
- Get User details like , Name, Number and Email
- Get total reward points

## Logout

- Hover on Account option
- Click on logout
