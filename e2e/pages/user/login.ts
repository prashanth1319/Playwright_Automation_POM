import { Page } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config();

export class LoginPage {
  private page: Page;
  private login = "text=Log in"; // Selector for login button
  private countryCode = "[role='combobox']"; // Selector for country code dropdown
  private countryCodeOption = ".dropdown-option"; // Dynamic selector for dropdown option
  private mobileNumber = "#mobileNumber"; // Selector for mobile number input
  private continueButton = 'button[type="submit"]'; // Selector for continue button
  private login_with_email = "text=Login with email address";
  private login_with_phone = "text=Login with phone number";
  private emailField = "#email";
  private otpfield = "#:r0:-form-item";

  constructor(page: Page) {
    this.page = page;
  }

  async goToUrl() {
    await this.page.goto("/");
  }

  // Navigate to login page
  async navigateToLoginPage() {
    await this.page.click(this.login);
    await this.page.pause();
  }
  //login with email
  async navigate_email() {
    await this.page.click(this.login_with_email);
  }
  async navigate_phone() {
    await this.page.getByRole("link", { name: "Use Phone instead" }).click();
  }

  async navigateToBusinessLogin() {
    await this.page.getByText("Login to a business account").click();
  }
  //Enter Email
  async enterEmail(email: any) {
    await this.page.click(this.emailField);
    await this.page.fill(this.emailField, email);
    await this.page.click(this.continueButton);
    await this.page.locator("[class='font-bold']").waitFor({ state: "visible" });
  }

  // Select country code from dropdown
  async selectCountryCode(code: any) {
    await this.page.getByRole("combobox").click();
    await this.page.getByLabel(code).click();
    // await this.page.click(this.countryCode);
    // await this.page.selectOption(this.countryCode, { label: code });
  }

  // Enter mobile number
  async enterNumber(number: any) {
    await this.page.fill(this.mobileNumber, number);
    await this.page.waitForTimeout(3000);
  }

  // Click the Continue button
  async continueCta() {
    await this.page.locator(this.continueButton).click();
  }

  async enterOTP(otp: any) {
    await this.page.waitForTimeout(3000);
    await this.page.keyboard.type(otp);
    await this.page.getByRole("button", { name: "Continue" }).click();
    await this.page
      .getByRole("heading", { name: "Win a dinner for 4 in" })
      .waitFor({ state: "visible" });
  }

  async getPageTitle(title: any) {
    // Retrieve and validate the page title
    const pageTitle = await this.page.title();
    console.log("Page Title:", pageTitle);

    // Validate the title
    const expectedTitle = title; // Replace with the expected title of your page
    if (pageTitle === expectedTitle) {
      console.log("Title Validation Passed!");
    } else {
      console.error(
        `Title Validation Failed! Expected: "${expectedTitle}", but got: "${pageTitle}"`,
      );
    }
  }
}
