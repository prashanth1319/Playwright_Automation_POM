import { test } from "@playwright/test";
import dotenv from "dotenv";

import { HomeScreen } from "../../pages/user/Home_screen";
import { Make_Suggestion_Non_Logged_In } from "../../pages/user/Non_loggedin_makesuggestion";
import { SuggestionFlow } from "../../pages/user/feedback";
import { LoginPage } from "../../pages/user/login";

dotenv.config();

test.describe("Non login feedback test @Smoke", () => {
  let nonLoginUser: Make_Suggestion_Non_Logged_In;
  let suggestionflow: SuggestionFlow;
  let homeSearch: HomeScreen;
  let loginPage: LoginPage;
  let home: HomeScreen;

  test.beforeEach(async ({ page }) => {
    // Initialize the LoginPage with the current page context
    nonLoginUser = new Make_Suggestion_Non_Logged_In(page);
    suggestionflow = new SuggestionFlow(page);
    homeSearch = new HomeScreen(page);
    loginPage = new LoginPage(page);
    home = new HomeScreen(page);
  });

  test("Non logged in feedback", async ({ page }) => {
    // Click on the "Log in" button
    await nonLoginUser.gotoURL();
    await homeSearch.search();
    //await nonLoginUser.makeSuggestion();
    //Gving feedback to twocents
    await suggestionflow.suggestBusiness(process.env.Comment); // Submit the business feedback
    await suggestionflow.verifySelectedSuggest();
    await suggestionflow.rateYourself(process.env.Comment);
    await suggestionflow.suggestDetails();
    //await loginPage.navigate_phone();
    await loginPage.selectCountryCode(process.env.Country);
    await loginPage.enterNumber(process.env.Number);
    await loginPage.continueCta();
    await loginPage.enterOTP(process.env.OTP);
    await loginPage.getPageTitle(process.env.PageTitle);
    await home.menu();
    await home.yourSuggestion();
    await home.view_suggestion();
  });
});
