import { Page } from "@playwright/test";

export class businessAccess {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  private table = "[class='relative w-full overflow-auto']";
  private businessAccess = "img[alt*='sign in']";

  async verifyTable() {
    await this.page.locator(this.table).waitFor({ state: "visible" });
    await this.page.pause();
  }

  async BusinessNavigation() {
    // Click on the element to open a new tab
    const [newPage] = await Promise.all([
      this.page.waitForEvent("popup"), // Wait for new tab
      this.page.locator(this.businessAccess).nth(0).click(), // Click to open
    ]);

    await newPage.waitForLoadState("load");
    console.log("New Tab URL:", newPage.url());
    await newPage.close();
  }

  async backToAdmin() {
    await this.page.goto("https://staging-fe.mytwocents.io/admin/dashboard/customers");
  }
}
