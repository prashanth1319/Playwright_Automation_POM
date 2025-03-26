import { test } from "@playwright/test";
import * as dotenv from "dotenv";

import { businessAccess } from "../../pages/admin/admin_business_access";
import { adminLogin } from "../../pages/admin/admin_login";
import { businessDashboard } from "../../pages/business/Business_Dashboard";

dotenv.config();

test.describe("Admin business dashboard access", () => {
  let admin: adminLogin;
  let businessAcc: businessAccess;
  let business: businessDashboard;

  test.beforeEach(async ({ page }) => {
    admin = new adminLogin(page);
    businessAcc = new businessAccess(page);
    business = new businessDashboard(page);
  });

  test("Admin flow", async ({ page }) => {
    await admin.gotoUrl();
    await admin.login(process.env.AdminEmail, process.env.AdminPasswrod);
    await businessAcc.verifyTable();
    await businessAcc.BusinessNavigation();
    // await business.healthCheckChart();
    // await business.suggestionsInbox();
    // await businessAcc.backToAdmin();
  });
});
