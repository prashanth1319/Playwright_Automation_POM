import { Page } from "@playwright/test";

export class LoginPage {
  private page: Page;
  private login = "text=Log in"; // Selector for login button
  private countryCode = "#countryCode"; // Selector for country code dropdown
  private countryCodeOption = ".dropdown-option"; // Dynamic selector for dropdown option
  private mobileNumber = "#mobileNumber"; // Selector for mobile number input
  private continueButton = 'button[type="submit"]'; // Selector for continue button
  private login_with_email = "text=Login with email address";
  private emailField = "#email";

  constructor(page: Page) {
    this.page = page;
  }

  async gotToUrl() {
    await this.page.goto("https://staging-fe.mytwocents.io/"); // Automatically uses the baseURL defined in playwright.config.ts
  }

  // Navigate to login page
  async navigateToLoginPage() {
    await this.page.click(this.login);
  }
  //login with email
  async navigate_email() {
    await this.page.click(this.login_with_email);
  }
  //Enter Email

  async enterEmail(email: string) {
    await this.page.click(this.emailField);
    await this.page.fill(this.emailField, email);
    await this.page.click(this.continueButton);
  }

  // Select country code from dropdown
  async selectCountryCode(code: string) {
    await this.page.click(this.countryCode); // Type the country code
    await this.page.selectOption(this.countryCode, { label: code });
  }

  // Enter mobile number
  async enterNumber(number: string) {
    await this.page.fill(this.mobileNumber, number);
  }

  // Click the Continue button
  async continueCta() {
    await this.page.click(this.continueButton, { timeout: 5000 });
  }
}
