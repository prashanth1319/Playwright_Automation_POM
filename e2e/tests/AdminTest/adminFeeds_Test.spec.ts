import { test } from "@playwright/test";
import * as dotenv from "dotenv";

import { adminfeeds } from "../../pages/admin/admin_feeds";
import { adminLogin } from "../../pages/admin/admin_login";

dotenv.config();

test.describe("Feedback Test", () => {
  let admin: adminLogin;
  let feeds: adminfeeds;

  test.beforeEach(async ({ page }) => {
    admin = new adminLogin(page);
    feeds = new adminfeeds(page);
  });

  test("Admin flow", async ({ page }) => {
    await admin.gotoUrl();
    await admin.login(process.env.AdminEmail, process.env.AdminPasswrod);
    await feeds.navigateToFeeds();
    await feeds.last_7days();
    await feeds.last_30days();
    await feeds.searchfeed();
    await feeds.suggestionDetails();
  });
});
