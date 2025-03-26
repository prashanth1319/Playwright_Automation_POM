# Test Case: Suggest a Business as a Non-Logged-In User


**FilePath:** `apps/frontend/e2e/tests/UserTest/non_login_feedback.spec.ts`

**EndPoint:** `https://staging-fe.mytwocents.io/`

**Authentication:** 'No'

**Description for non-logged user**

- Enter URl and wait until landing page loads

## Search business

- Search business by selecting first business from the business list (it can be any new business are added)
- Click on comment icon to make a suggestion

## Suggestions flow

- Naviagte to Suggestion flow
- Select all available category and Click on "Next"
- Enter "Feedback" input and Click on "Next"
- Drag element for "How likely return.." and click on "Next"
- This business will be optio appear, as per new changes by default one radio button is selected, directly click on "Next" Button
- Get Entered details like , Catrgory, Feedback input, likey return, Anonomyous or User
- Click on Edit icon to update Feedback, Update feedback by clicking on save button
- Click on Edit icon and to update "rating" click on save button
- Click on Edit icon and to update "Anonymous/User" click on save button
- Click on Submit Button to submit suggestion
- Get Rewards points and Click on Continue CTA

