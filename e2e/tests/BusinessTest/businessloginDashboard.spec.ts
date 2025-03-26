import { test } from "@playwright/test";

import { businessDashboard } from "../../pages/business/Business_Dashboard";
import { LoginPage } from "../../pages/business/businessLogin";

test.describe("Business Login", () => {
  let loginPage: LoginPage;
  let business: businessDashboard;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    business = new businessDashboard(page);
  });

  test("Login as business and navigate to Dashboard", async () => {
    const tokenEmail = "ayushk+tc@geekyants.com";

    // Login and setup token
    await loginPage.loginWithToken(tokenEmail);

    // Navigate to Dashboard
    await loginPage.navigateToDashboard();
    await business.healthCheckChart();
    await business.suggestionsInbox();
    await business.account();
  });
});
