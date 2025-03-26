import { Page, expect } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config();

export class Make_Suggestion_Non_Logged_In {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private field_error_messages = "span[aria-live='polite']";

  async gotoURL() {
    await this.page.goto("/");
  }

  async makeSuggestion() {
    const make_Suggest = this.page.locator(".flex > .w-fit").first();
    await expect(make_Suggest).toBeVisible();
    await make_Suggest.click();
  }
}
