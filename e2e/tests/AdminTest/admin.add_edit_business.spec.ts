import { test } from "@playwright/test";
import * as dotenv from "dotenv";

import { addBusiness } from "../../pages/admin/add_edit_Business";
import { adminLogin } from "../../pages/admin/admin_login";
import { SuggestionFlow } from "../../pages/user/feedback";

dotenv.config();

test.describe("Feedback Test", () => {
  let admin: adminLogin;
  let suggestionflow: SuggestionFlow;
  let AddBusiness: addBusiness;

  test.beforeEach(async ({ page }) => {
    admin = new adminLogin(page);
    suggestionflow = new SuggestionFlow(page);
    AddBusiness = new addBusiness(page);
  });

  test("Admin flow", async ({ page }) => {
    await admin.gotoUrl();
    await admin.login(process.env.AdminEmail, process.env.AdminPasswrod);
    await admin.searchAndCopyURl("GeekyAnts 2");
    await AddBusiness.clickOnAddBusienss();
    await AddBusiness.getErrorMessage();
    await AddBusiness.fillDetails();

    // await suggestionflow.suggestBusiness("New suggestion is added "); // Submit the business feedback
    // await suggestionflow.verifySelectedSuggest();
    // await suggestionflow.rateYourself();
    // await suggestionflow.suggestDetails();
  });
});
