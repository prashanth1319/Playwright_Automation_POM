import { test } from "@playwright/test";
import * as dotenv from "dotenv";

import { HomeScreen } from "../../pages/user/Home_screen";
import { SuggestionFlow } from "../../pages/user/feedback";
import { LoginPage } from "../../pages/user/login";

dotenv.config();

test.describe("Login suggest ", () => {
  let loginPage: LoginPage;
  let home: HomeScreen;
  let suggestionflow: SuggestionFlow;

  test.beforeEach(async ({ page }) => {
    // Initialize the LoginPage with the current page context
    loginPage = new LoginPage(page);
    home = new HomeScreen(page);
    suggestionflow = new SuggestionFlow(page);

    // Navigate to the login page
    //await loginPage.gotToUrl();
  });

  test("login,Home,make suggestion flow", async ({ page }) => {
    // Click on the "Log in" button
    await loginPage.goToUrl();
    // await expect(page).toHaveURL(/login/);
    await loginPage.navigateToLoginPage();
    //await loginPage.enterEmail(process.env.PatroEmail)
    //await loginPage.navigate_phone();
    await loginPage.selectCountryCode(process.env.Country);
    await loginPage.enterNumber(process.env.Number);
    //Click on the continue button
    await loginPage.continueCta();
    await loginPage.enterOTP(process.env.OTP);
    await loginPage.getPageTitle(process.env.PageTitle);
    await home.search();
    await suggestionflow.suggestBusiness(process.env.Comment); // Submit the business feedback
    await suggestionflow.verifySelectedSuggest();
    await suggestionflow.rateYourself(process.env.Comment);
    await suggestionflow.suggestDetails();
    await home.menu();
    await home.yourSuggestion();
    await home.view_suggestion();
    await home.Account();
    await home.menu();
    await home.tandCPgae();
    await home.menu();
    await home.privacyPolicy();
    await home.logout();
  });
});
