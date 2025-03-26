import { Page, expect } from "@playwright/test";

export class qrCode {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  private notes = "text=Notes";
  private addNote = "text=Add note";
  private downloadQR = '[data-sentry-component="QrCode"]';
  private copy = '[data-sentry-component="CopyIcon"]';
  private cross = "[class='lucide lucide-x text-black']";
  private upArrow = "[class='lucide lucide-arrow-up']";
  private QrHeader = "text=Notes";
  private toastMessage = "li[role='status']";
  private QRcode = "[class='truncate text-heading-sm']";

  async Naviagte_QRCode() {
    await this.page.getByRole("link", { name: "QR Codes" }).click();
    //await expect(this.page.locator(this.QrHeader)).toBeVisible();
    await this.page.waitForSelector(this.QrHeader, { state: "visible" });
  }

  async search(): Promise<void> {
    const firstQR: string | null = await this.page.locator(this.QRcode).nth(0).textContent();

    if (!firstQR) {
      throw new Error("QR code text content is null or undefined.");
    }

    const searchField = this.page.getByPlaceholder("Search");
    await searchField.click();
    await searchField.fill(firstQR);

    await this.page.waitForTimeout(3000); // Replaces setTimeout for better readability
  }

  // Add note and download QR and copy uRl
  async note() {
    await expect(this.page.locator(this.downloadQR).nth(0)).toBeEnabled();
    await this.page.locator(this.downloadQR).nth(0).click();
    await expect(this.page.locator(this.copy).nth(0)).toBeEnabled();
    await this.page.locator(this.copy).nth(0).click();
    const successfully = this.page.locator(this.toastMessage);
    try {
      await this.page.locator(this.downloadQR).click();
      await expect(successfully).toBeVisible();
    } catch (error) {
      console.error("QR code Element is not clickable:", error);
    }

    try {
      await this.page.locator(this.copy).click();
      await expect(successfully).toBeVisible();
    } catch (error) {
      console.error("Copy url Element is not clickable:", error);
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    await this.page.locator(this.notes).nth(0).click();
    await expect(this.page.getByText("Add note")).toBeVisible();
    const plusButton = this.page.locator(this.addNote);
    await plusButton.click();
    const writeNote = this.page.getByRole("textbox", { name: "Write note..." });
    await writeNote.fill("New note is added");
    await this.page.locator(this.cross).click();
    await plusButton.click();
    await writeNote.fill("QR code is reserved");
    await this.page.locator(this.upArrow).click();
  }
}
