import { Page, expect } from "@playwright/test";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config();

export class addBusiness {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  private errorMessage = "span[aria-live='polite']";
  private dropDown = "[name='businessTypeId']";
  private heroImage = "#businessHeroImage";
  private logo = "#businessLogo";
  private businessCount = '[data-sentry-element="Badge"]';
  private downloadQR = '[data-sentry-component="QrCode"]';
  private copy = '[data-sentry-component="CopyIcon"]';
  private sort = "[alt='sort-arrow']";

  async clickOnAddBusienss() {
    await this.page.getByRole("link", { name: "Add Business" }).click();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await expect(this.page.getByRole("heading", { name: "Add a business" })).toBeVisible();
    await this.page.getByRole("button", { name: "Add business" }).click();
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  async getErrorMessage() {
    const error = await this.page.locator(this.errorMessage).allInnerTexts();
    const validationError = error.map((name) => name.trim());
    console.log("Error Messages:", validationError);
  }

  async fillDetails() {
    const CorpName = this.page.getByPlaceholder("Corporation Name");
    const selectBusiness = this.page.getByLabel("art gallery");
    const city = this.page.getByPlaceholder("City");
    const yelp = this.page.getByLabel("Yelp Link");
    const google = this.page.getByLabel("Google Link");
    await CorpName.fill("Test ltd");
    await this.page.getByPlaceholder("Business Name").fill("Test Apple");
    //await this.page.getByPlaceholder('Foursquare Business ID').fill('');// optional
    await this.page.getByRole("combobox").click();
    await selectBusiness.click();
    await city.fill("Bangaluru");
    await new Promise((resolve) => setTimeout(resolve, 2000));

    //updload
    const businessImage = path.resolve(__dirname, "../../TestData/Business.jpeg");
    const heroImage = path.resolve(__dirname, "../../TestData/logo.jpeg");

    await this.page.locator(this.heroImage).setInputFiles(businessImage);
    await this.page.locator(this.logo).setInputFiles(heroImage);
    //await this.page.locator('fieldset').filter({ hasText: 'Business LogoUpload*Only .jpg' }).click();
    await yelp.fill("https://introvert.com/?domain=suggestly.com");
    await google.fill("https://introvert.com/?domain=suggestly.com");
    await this.page.getByRole("radio", { name: "Enabled" }).click();
    await this.page.getByPlaceholder("Type more to add").fill("prashantg@geekyants.com");
    await this.page.keyboard.press("Enter");
    await this.page.getByLabel("Create new QR code").click();
    await this.page.getByRole("button", { name: "Add business" }).click();
    const businessText = await this.page.locator(this.businessCount).textContent();
    console.log("Total Business:", businessText?.trim() || "No text found");

    //Edit Bussiness
    await this.page.getByPlaceholder("Search").fill("Test Apple");
    //await this.page.getByRole("heading", { name: "VK", exact: true }).waitFor({ state: "visible" });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await this.page.getByRole("link", { name: "Edit" }).first().click();
    await this.page.getByRole("heading", { name: "Edit Test Apple" }).waitFor({ state: "visible" });
    await CorpName.fill("");
    await CorpName.fill("Orange ltd");
    await this.page.getByRole("combobox").click();
    await selectBusiness.click();
    await city.fill("Bangaluru");
    await yelp.fill("https://introvert.com/?domain=suggestly.com");
    const saveButton = this.page.getByRole("button", { name: "Save Changes" });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await saveButton.click();
    //await this.page.pause();
    await this.page.waitForSelector("text=Business edited successfully!", { state: "visible" });
    //await expect(this.page.getByText("Business edited successfully!")).toBeVisible();

    //Click on Lead option
    await this.page.getByRole("link", { name: "Leads" }).click();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const firstAddBusiness = this.page.getByText("Add business").nth(0);
    await firstAddBusiness.click();
    //Add a business
    await this.page.getByText("Add a business").waitFor({ state: "visible" });
    await this.page.getByRole("link", { name: "Cancel" }).click();
    //await saveButton.click();

    //Download QR code and copy url
    await expect(this.page.locator(this.downloadQR).nth(0)).toBeEnabled();
    try {
      await this.page.locator(this.downloadQR).nth(0).click();
      console.log("QR Code is downloaded");
    } catch (error) {
      console.error("QR code Element is not clickable:", error);
    }

    await expect(this.page.locator(this.copy).nth(0)).toBeEnabled();

    try {
      await this.page.locator(this.copy).nth(0).click();
      console.log("URl is coppied to clipboard");
    } catch (error) {
      console.error("Copy url Element is not clickable:", error);
    }
  }
}
