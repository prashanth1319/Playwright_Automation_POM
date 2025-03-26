import { Page } from "@playwright/test";

export class redirect {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  private getQRLink =
    "[class='max-w-48 truncate text-ellipsis break-all text-xs font-normal sm:max-w-full']";
  private copiedUrl: string = "";
  private copyUrl = "p[class*='truncate']";

  async copyBusinessURL() {
    await this.page.locator("td:nth-child(6) > div > .flex").first().click();

    // Check if the browser is WebKit
    const browserName = this.page.context().browser()?.browserType().name();

    if (browserName === "webkit") {
      // WebKit: Use alternative clipboard handling
      await this.page.context().grantPermissions(["clipboard-read"]);
      const clipboardTextHandle = await this.page.evaluateHandle(() =>
        navigator.clipboard.readText(),
      );
      this.copiedUrl = await clipboardTextHandle.jsonValue();
    } else {
      // Other browsers: Use standard clipboard API
      this.copiedUrl = await this.page.evaluate(async () => {
        return await navigator.clipboard.readText();
      });
    }

    console.log("Copied URL:", this.copiedUrl);
    // await this.page.locator("td:nth-child(6) > div > .flex").first().click();
    // this.copiedUrl = await this.page.evaluate(async () => {
    //   return await navigator.clipboard.readText();
    // });
    // console.log("Copied URL:", this.copiedUrl);
  }
  async navigateRedirect() {
    await this.page.getByRole("link", { name: "Redirects" }).click();
    await this.page
      .getByRole("heading", { name: "Active Redirects" })
      .waitFor({ state: "visible" });
  }
  async AddNewRedirect() {
    const uniqueId = Date.now();
    const randomNames = ["Orange", "Rocky", "Gamma", "Beta", "Tom", "Joseph"];
    const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
    await this.page
      .getByRole("textbox", { name: "Origin Location" })
      .fill(`https://staging-fe.mytwocents.io/business/qr/TCQR${uniqueId}`);
    await this.page
      .getByRole("textbox", { name: "Target Location" })
      .fill(`https://staging-fe.mytwocents.io/business/Test${randomName}`);

    await this.page.getByRole("radio", { name: "Temporary Redirect" }).click();
    await this.page.getByRole("button", { name: "Redirect" }).click();
  }
  async searchAndEditRedirect() {
    const redirectURL = await this.page.locator(this.getQRLink).nth(0).textContent();
    if (redirectURL) {
      await this.page.getByPlaceholder("Search").fill(redirectURL.trim());
    } else {
      throw new Error("Failed to retrieve text content from the QR link.");
    }
    await this.page.getByRole("button", { name: "Edit" }).nth(0).click();
    await this.page.getByPlaceholder("Enter your Business URL here").fill(this.copiedUrl);
    await this.page.getByLabel("Temporary Redirect").click();
    await this.page.getByRole("button", { name: "Redirect" }).click();
  }
}
