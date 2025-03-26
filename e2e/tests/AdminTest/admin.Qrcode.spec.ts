import { test } from "@playwright/test";
import * as dotenv from "dotenv";

import { qrCode } from "../../pages/admin/admin_QR_code";
import { adminLogin } from "../../pages/admin/admin_login";

dotenv.config();

test.describe("Feedback Test", () => {
  let qr: qrCode;
  let admin: adminLogin;

  test.beforeEach(async ({ page }) => {
    qr = new qrCode(page);
    admin = new adminLogin(page);
  });

  test("Admin flow", async ({ page }) => {
    await admin.gotoUrl();
    await admin.login(process.env.AdminEmail, process.env.AdminPasswrod);

    await qr.Naviagte_QRCode();
    await qr.search();
    await qr.note();
  });
});
