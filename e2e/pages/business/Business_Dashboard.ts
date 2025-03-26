import { Page } from "@playwright/test";
import chalk from "chalk";

export class businessDashboard {
  navigateToLogin() {
    throw new Error("Method not implemented.");
  }
  private page: Page;
  private chategory = "[class='flex w-full items-center justify-between gap-[3px]']";
  private Sentiment = "[class='flex w-full items-center justify-between gap-0.5']";
  private profile = "[aria-haspopup='menu']";
  private noSuggestion = "//p[text()='No suggestions available for this category.']";
  private resolvedOption = "//div[text()='Resolved']"; //[class='flex items-center gap-4']:visible
  private archiveOption = "//div[text()='Archived']";

  constructor(page: Page) {
    this.page = page;
  }

  async healthCheckChart() {
    await this.page
      .locator("[data-sentry-component='ChartCard']")
      .first()
      .waitFor({ state: "visible" });
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const categories = await this.page.locator(this.chategory).all();
    const sentimentAvg = await this.page.locator(this.Sentiment).all();

    let healtChartData: string[] = []; // Store formatted output

    for (let i = 0; i < categories.length; i++) {
      let categoryText = await categories[i].textContent();
      let avgText = await sentimentAvg[i]?.textContent(); // Use optional chaining to avoid errors

      if (categoryText && avgText) {
        // Format category text (Add space between words and numbers)
        categoryText = categoryText
          .replace(/([a-zA-Z])(\d)/g, "$1 $2")
          .replace(/(\d)([a-zA-Z])/g, "$1 $2");
        // Format sentiment text (Add space between percentage values)
        avgText = avgText.replace(/(\d+)%(\d+)%/g, "$1% $2%");
        // Store formatted output in array
        healtChartData.push(`Category ${i + 1}: ${categoryText}, Average Sentiment [ ${avgText} ]`);
      }
    }
    // Print all formatted data
    healtChartData.forEach(data => console.log(chalk.green(data)));
  }

  async suggestionsInbox() {
    const noSuggestionsText = this.page.locator(this.noSuggestion).first();
    // Check if the "No suggestions available" text is visible
    if (await noSuggestionsText.isVisible()) {
      console.log("Suggestions are empty.");
    } else {
      // Click on the first suggestion if available
      const elem = this.page.locator("[class='flex items-center gap-4']:visible").first();
      //await elem.scrollIntoViewIfNeeded();
      await this.page
        .locator("[class='flex items-center gap-4']:visible")
        .first()
        .click({ force: true });
      //await this.page.c.click({fo});
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Locate the "Resolve" and "Acknowledge" buttons
      const respondButton = this.page.getByRole("button", { name: "Respond" });
      const acknowledgeButton = this.page.getByRole("button", { name: "Acknowledge" });
      const archiveButton = this.page.getByRole("button", { name: "Archive" });
      const back = this.page.getByText("Back", { exact: true });

      // Perform actions based on button visibility
      if (await acknowledgeButton.isVisible()) {
        await acknowledgeButton.click();
      }
      if (await respondButton.isVisible()) {
        await respondButton.click();
        // await this.page.getByPlaceholder('Write your message here...').fill("Responded by Script");
        // await this.page.getByRole('button', { name: 'Send' }).click();
      } else if (await archiveButton.isVisible()) {
        await archiveButton.click();
        await archiveButton.click();
        await back.scrollIntoViewIfNeeded();
        await back.click();
      } else {
        console.log("No actionable buttons are visible.");
      }
    }
    //Resolved
    await this.page.locator(this.resolvedOption).first().click();
    await this.page
      .locator("[class='flex items-center gap-4']:visible")
      .first()
      .click({ force: true });
    const back = this.page.getByText("Back", { exact: true });
    // if (await back.isVisible) {
    //   await back.scrollIntoViewIfNeeded();
    //   await back.click();
    // } else {
    //   await this.page
    //     .locator("[class='flex items-center gap-4']:visible")
    //     .first()
    //     .click({ force: true });
    // }
    //const noSuggestionsText = this.page.getByText("No suggestions available for").first();
    // if (await noSuggestionsText.isVisible()) {
    //   console.log("Resolved: Suggestions are empty.");
    // } else {
    //   //Click on Resolve option
    //   await this.page
    //     .locator("[class='flex items-center gap-4']:visible")
    //     .first()
    //     .click({ force: true });
    //   await this.page
    //     .getByRole("heading", { name: "Their suggestion relates to..." })
    //     .waitFor({ state: "visible" });
    // }

    //Click on Archive option
    const archive = this.page.locator(this.archiveOption).first();
    //await archive.scrollIntoViewIfNeeded();
    await archive.click();
    await this.page
      .locator("[class='flex items-center gap-4']:visible")
      .first()
      .click({ force: true });
    if (await back.isVisible()) {
      // await back.scrollIntoViewIfNeeded();
      await back.click();
    } else {
      await this.page
        .locator("[class='flex items-center gap-4']:visible")
        .first()
        .click({ force: true });
      await this.page
        .getByRole("heading", { name: "Their two cents is about..." })
        .waitFor({ state: "visible" });
    }
    if (await noSuggestionsText.isVisible()) {
      console.log("Archived: Suggestions are empty.");
    } else {
      await this.page
        .locator("[class='flex items-center gap-4']:visible")
        .first()
        .click({ force: true });
      await this.page
        .getByRole("heading", { name: "Their two cents is about..." })
        .waitFor({ state: "visible" });
    }
  }

  async account() {
    //await new Promise((resolve) => setTimeout(resolve, 1000));
    //locator('button').filter({ hasText: 'My account' }) - my account
    //getByRole('link', { name: 'Account' }) - my aaccount web
    const accDescktop = this.page.getByRole("link", { name: "Account" });
    const accMobile = this.page.locator("button").filter({ hasText: "My account" });

    if (await accDescktop.isVisible()) {
      await accDescktop.scrollIntoViewIfNeeded();
      await accDescktop.click();
      await accMobile.hover();
      await this.page.getByRole("menuitem", { name: "Logout" }).click();
      console.log("“User has been successfully logged out.”");
    } else {
      await accMobile.scrollIntoViewIfNeeded();
      await accMobile.hover();
      await this.page.getByRole("menuitem", { name: "Logout" }).click();
      console.log("Business Owner has been successfully logged out.”");
    }

    // //getByRole('banner').locator('path') - hamburger for mobile view
    // // locator for back button - getByText('Back', { exact: true })

    // const menu = this.page.locator(this.profile);
    // await menu.hover();
    // await this.page.getByRole("menuitem", { name: "Log out" }).click();
    // console.log("“User has been successfully logged out.”");
  }
}
