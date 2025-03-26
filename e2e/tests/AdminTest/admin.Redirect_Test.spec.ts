import { test } from "@playwright/test";
import * as dotenv from "dotenv";

import { adminLogin } from "../../pages/admin/admin_login";
import { redirect } from "../../pages/admin/admin_redirect";

dotenv.config();

test.describe("Feedback Test", () => {
  let redirectUrl: redirect;
  let admin: adminLogin;

  test.beforeEach(async ({ page }) => {
    redirectUrl = new redirect(page);
    admin = new adminLogin(page);
  });

  test("Admin flow", async ({ page, browserName }) => {
    if (browserName == "chromium") {
      await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
    }
    await admin.gotoUrl();
    await admin.login(process.env.AdminEmail, process.env.AdminPasswrod);
    await redirectUrl.copyBusinessURL();
    await redirectUrl.navigateRedirect();
    await redirectUrl.AddNewRedirect();
    await redirectUrl.searchAndEditRedirect();
  });
});
