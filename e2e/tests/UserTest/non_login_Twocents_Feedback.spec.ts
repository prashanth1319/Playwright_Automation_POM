import { test } from "@playwright/test";
import dotenv from "dotenv";

import { Continue_Feedback_Without_Account } from "../../pages/user/Non_loogedin_twocents";
import { SuggestionFlow } from "../../pages/user/feedback";

dotenv.config();

test.describe("Login test @Smoke ", () => {
  let nonLoginUser: Continue_Feedback_Without_Account;
  let suggestionflow: SuggestionFlow;

  test.beforeEach(async ({ page }) => {
    // Initialize the LoginPage with the current page context
    nonLoginUser = new Continue_Feedback_Without_Account(page);
    suggestionflow = new SuggestionFlow(page);
  });

  test("Feedback for user twoCents and contact business owner form", async ({ page }) => {
    // Click on the "Log in" button
    await nonLoginUser.gotoURL();
    await page.pause();
    await nonLoginUser.fillBusinessForm();
    //Gving feedback to twocents
    await nonLoginUser.clickOnUserFeedback();
    await suggestionflow.suggestBusiness(process.env.Comment); // Submit the business feedback
    await suggestionflow.verifySelectedSuggest();
    await suggestionflow.rateYourself(process.env.Comment);
    await suggestionflow.suggestDetails();
  });
});
