import { Page, expect } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config();

export class adminLogin {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  private emailField = "#email";
  private passwordField = "#password";
  private continueButton = "[type='submit']";
  private eyeIcon = ".lucide";
  private downloadQR = '[data-sentry-component="QrCode"]';
  private copy = '[data-sentry-component="CopyIcon"]';

  async gotoUrl() {
    await this.page.goto("/admin/login/email");
  }

  async login(emailId: any, password: any) {
    await this.page.fill(this.emailField, emailId);
    await this.page.fill(this.passwordField, password);
    await this.page.click(this.eyeIcon);
    await this.page.waitForTimeout(3000);
    await this.page.click(this.continueButton);
  }

  async searchAndCopyURl(search: string) {
    await this.page.pause();
    await this.page.getByPlaceholder("Search").fill(search);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await expect(this.page.locator(this.downloadQR).nth(0)).toBeEnabled();
    await this.page.locator(this.downloadQR).nth(0).click();
    await expect(this.page.locator(this.copy).nth(0)).toBeEnabled();
    await this.page.locator(this.copy).nth(0).click();
    //await this.page.locator("td:nth-child(5) > div > .flex").click();
    //await new Promise((resolve) => setTimeout(resolve, 1000));
    // const copiedUrl = await this.page.evaluate(() => navigator.clipboard.readText());
    // console.log("Copied URL:", copiedUrl);
    //await this.page.goto(copiedUrl);
    // await this.page.getByRole('link', { name: 'Edit' }).click();
  }
}
