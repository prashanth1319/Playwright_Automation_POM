import { Page, expect } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config();

export class Continue_Feedback_Without_Account {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private field_error_messages = "span[aria-live='polite']";
  private successful_Message = "div[aria-live='polite']";

  async gotoURL() {
    await this.page.goto("/");
  }

  async fillBusinessForm() {
    //Click on Submit button
    await this.page.getByRole("banner").getByRole("img").click();
    await this.page.getByRole("link", { name: "Business Owner Sign Up Icon" }).click();
    await expect(this.page.getByRole("heading", { name: "Get on twocents" })).toBeVisible();
    const submit = this.page.getByRole("button", { name: "Submit" });
    await submit.click();
    await new Promise((resolve) => setTimeout(resolve, 2000));

    //Get all error messages
    const error_messages = await this.page.locator(this.field_error_messages).allInnerTexts();
    const validationPromts = error_messages.map((name) => name.trim());
    console.log("Error message for Fields:", validationPromts);

    //Enter Name
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await this.page.getByPlaceholder("Enter your name").fill("Testing TwoCents");
    await this.page.getByPlaceholder("Enter your business name").fill("TwoCentsBuiness Test");
    await this.page.getByPlaceholder("Enter your city").fill("Toronto");
    await this.page.getByPlaceholder("Enter your email").fill("test123@gmail.com");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await submit.click();

    //verify  succuess message
    const success = await this.page.locator(this.successful_Message);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await expect(success).toBeVisible();
    const successMessageText = await success.textContent();
    console.log(`Submited success Message : ${successMessageText}`);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await this.page.goBack();
  }

  async clickOnUserFeedback() {
    await this.page.getByRole("banner").getByRole("img").click();
    await this.page.getByRole("link", { name: "User Feedback / Bug Report" }).click();
  }
}
