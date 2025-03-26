import { Page, expect } from "@playwright/test";

export class adminfeeds {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  private sugestions = '[class="flex items-center gap-1"]';
  private see_suggestion = "text=See suggestion";
  private suggestDetails = "[aria-label='Suggestion details']";
  private username = "p[class='opacity-100 flex-1 text-black']";
  private businessName = "h2[class*='line-clamp-3']";
  private category = "[class='flex flex-col gap-2']";
  private suggestion = "p[class='flex-wrap break-words text-paragraph-md']";
  private percentage = "h3.text-heading-lg";
  private status = "[class='text-paragraph-md text-black/60']";
  private feedbackSelect = "h4[class='truncate text-sm font-semibold capitalize']";
  private BusinessResponse = "p[class='text-xs font-normal']";

  async navigateToFeeds() {
    await this.page.getByRole("link", { name: "Feed" }).click(); //Suggestion Analytics
    await this.page.waitForSelector(this.sugestions, { state: "visible" });
  }
  async last_7days() {
    await this.page.getByRole("link", { name: "Last 7 days" }).click();
    const totalSug = await this.page.locator(this.sugestions).nth(0).textContent();
    console.log("7 Days total suggestions = ", totalSug?.trim());
    const highQuality = await this.page.locator(this.sugestions).nth(1).textContent();
    console.log("7 Days high quality total suggestions = ", highQuality?.trim());
    const lowQuality = await this.page.locator(this.sugestions).nth(2).textContent();
    console.log("7 Days total low Quality suggestions = ", lowQuality?.trim());
  }
  async last_30days() {
    await this.page.getByRole("link", { name: "Last 30 days" }).click();
    const totalSug = await this.page.locator(this.sugestions).nth(0).textContent();
    console.log("30 Days total suggestions = ", totalSug?.trim());
    const highQuality = await this.page.locator(this.sugestions).nth(1).textContent();
    console.log("30 Days high quality total suggestions = ", highQuality?.trim());
    const lowQuality = await this.page.locator(this.sugestions).nth(2).textContent();
    console.log("30 Days low Quality total suggestions = ", lowQuality?.trim());
  }

  async searchfeed(): Promise<void> {
    const firstFeedback: string | null = await this.page
      .locator(this.feedbackSelect)
      .nth(0)
      .textContent();

    if (!firstFeedback) {
      throw new Error("QR code text content is null or undefined.");
    }

    const searchField = this.page.getByPlaceholder("Search");
    await searchField.click();
    await searchField.fill(firstFeedback);
    await this.page.getByRole("button", { name: "Clear" }).click();
    await searchField.fill(firstFeedback);

    // await this.page.waitForTimeout(3000); // Replaces setTimeout for better readability
  }

  async suggestionDetails() {
    await this.page.locator(this.see_suggestion).nth(0).click();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Current URL:", this.page.url());

    const suggestionDetails = this.page.locator(this.suggestDetails);
    await expect(suggestionDetails).toBeVisible();
    await this.page.pause();
    //Get business name
    const user = await this.page.locator(this.businessName).textContent();
    await expect(this.page.locator(this.businessName)).toBeVisible();
    console.log("Business name ;", user?.trim());

    //Get Category name
    const categorySelected = await this.page.locator(this.category).allTextContents();
    await expect(this.page.locator(this.category)).toBeVisible();
    console.log(
      "Selected Categories:",
      categorySelected.map((text) => text.trim()),
    );

    //Get user name
    const Bname = await this.page.locator(this.username).nth(0).textContent();
    await expect(this.page.locator(this.username).nth(0)).toBeVisible();
    console.log("Suggested by ;", Bname?.trim().search(" "));

    //My Suggestion user name
    const suggest = await this.page.locator(this.suggestion).textContent();
    await expect(this.page.locator(this.suggestion)).toBeVisible();
    console.log("Feedback ;", suggest?.trim());

    if (await this.page.locator(this.BusinessResponse).isVisible()) {
      const response = await this.page.locator(this.BusinessResponse).textContent();
      console.log("Business Response:", response?.trim());
    } else {
      console.log("Business not yet responded");
    }

    //Get Percentage
    const rating = await this.page.locator(this.percentage).textContent();
    await expect(this.page.locator(this.percentage)).toBeVisible();
    console.log("Rating ;", rating?.trim());

    //Get status
    const feedbackStatus = await this.page.locator(this.status).textContent();
    await expect(this.page.locator(this.status)).toBeVisible();
    console.log("Status of Suggestion name ;", feedbackStatus?.trim());
    await this.page.getByRole("link", { name: "Close" }).click();
  }
}
