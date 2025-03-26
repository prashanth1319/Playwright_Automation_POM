import { test } from "@playwright/test";

import { emilLogin } from "../../pages/user/Email_login";
import { HomeScreen } from "../../pages/user/Home_screen";

test.describe("Patron email login", () => {
  let email: emilLogin;
  let home: HomeScreen;

  test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    email = new emilLogin(page);
    home = new HomeScreen(page);
  });

  test("Login with email account", async () => {
    const tokenEmail = "ayushk+tc@geekyants.com";

    // Login and setup token
    await email.loginWithToken(tokenEmail);
    await email.navigateToDashboard();
    await home.search();
  });
});
