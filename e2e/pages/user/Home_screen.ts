import { Page, expect } from "@playwright/test";

export class HomeScreen {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private businessNames = "[class='text-heading-md text-white']";
  private suggestDetails = "[aria-label='Suggestion details']";
  private username = "[class='opacity-100 flex-1 text-black']";
  private businessName = "h2[class*='line-clamp-3']";
  private category = "[class='flex flex-col gap-2']";
  private suggestion = "p[class='flex-wrap break-words text-paragraph-md']";
  private percentage = "h3.text-heading-lg";
  private status = "[class='text-paragraph-md text-black/60']";
  private profile = "[aria-haspopup='menu']";
  private fullName = "#fullname";
  private useremail = "#email";
  private number = "#mobileNumber";
  private viewCTA = "text='View suggestion'";
  private homeBusinessName = "h2#business-name-title";
  private makeSuggestionIcon = "svg[class*='make-suggestion-icon']";
  private giveawayTitle = "[class='text-title-lg']";
  private earnPointsDetails = "[class='flex w-full flex-col gap-1.5']";

  async menu() {
    await this.page.getByLabel("Open menu").click();
  }

  async rewardsPage() {
    await this.page.getByRole("link", { name: "Points and Rewards Info Icon" }).click();
  }

  async tandCPgae() {
    await this.page.getByRole("link", { name: "Terms and Conditions" }).click();
    await expect(this.page.getByRole("heading", { name: "Terms of Use" })).toBeVisible();
  }

  async privacyPolicy() {
    await this.page.getByRole("link", { name: "Privacy Policy" }).click();
    await expect(
      this.page.getByRole("heading", { name: "Privacy Policy", exact: true }),
    ).toBeVisible();
  }

  async yourSuggestion() {
    await this.page
      .getByRole("link", { name: "My Two Cents Icon My two" })
      .waitFor({ state: "visible" });
    await this.page.getByRole("link", { name: "My Two Cents Icon My two" }).click();
    await this.page.waitForTimeout(2000);
    const businessList = await this.page.locator(this.businessNames).allInnerTexts();
    const businessdNames = businessList.map((name) => name.trim());
    console.log("All Business Names:", businessdNames);
    const businesscount = await this.page.locator(this.businessNames).count();
    console.log("Total Number of Businesses:", businesscount);
  }

  async view_suggestion() {
    //View details
    const close = this.page.getByRole("link", { name: "Close" });
    const menu = this.page.locator(this.profile);

    await this.page.locator("div:nth-child(2) > a").first().click();
    const suggestionDetails = this.page.locator(this.suggestDetails);
    await expect(suggestionDetails).toBeVisible();
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
    await expect(this.page.locator(this.username)).toBeVisible();
    const Bname = await this.page.locator(this.username).textContent();
    console.log("Suggested  by ;", Bname?.trim());
    //My Suggestion user name
    await expect(this.page.locator(this.suggestion)).toBeVisible();
    const suggest = await this.page.locator(this.suggestion).textContent();
    console.log("suggested input ;", suggest?.trim());
    //Get Percentage
    await expect(this.page.locator(this.percentage)).toBeVisible();
    const rating = await this.page.locator(this.percentage).textContent();
    console.log("Rating ;", rating?.trim());
    //Get status
    await expect(this.page.locator(this.status)).toBeVisible();
    const feedbackStatus = await this.page.locator(this.status).textContent();
    console.log("Feedback status ;", feedbackStatus?.trim());
    await close.click();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await close.click();
  }

  async Account() {
    const menu = this.page.locator(this.profile);
    //User Account screen

    //await this.page.getByLabel("your suggestions").waitFor({ state: "visible" });
    await this.page.getByLabel("Open menu").click();
    //await this.page.getByRole("menuitem", { name: "Account" }).click();
    await this.page.getByRole("link", { name: "My Account Icon My Account" }).click();
    await this.page.getByText("Patron", { exact: true }).waitFor({ state: "visible" });
    const reward = await this.page.getByRole("heading", { name: "Reward Points" }).textContent();
    console.log("Reward Points:", reward?.trim());
    const fullName = await this.page.locator(this.fullName).getAttribute("value");
    console.log("Full name:", fullName?.trim());
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const email = await this.page.locator(this.useremail).getAttribute("value");
    console.log("Email:", email?.trim());
    const phoneNumber = await this.page.locator(this.number).getAttribute("value");
    console.log("Phone number:", phoneNumber?.trim());
    //await close.click();
    //Nagivate to giveaway screen
    await this.page.getByRole("link", { name: "Learn more" }).click();
    await expect(this.page.getByText("Points and Rewards Info", { exact: true })).toBeVisible();
    // const points = await this.page.locator(this.earnPointsDetails).textContent();
    // console.log("Earn Points details:", points?.trim());

    const points = await this.page.locator(this.earnPointsDetails).textContent();
    if (points) {
      const formattedPoints =
        "Action = Points\n" +
        points
          .replace(/(\d+ Points)/g, " = $1") // Add '=' before "Points" values
          .replace(/([a-z])([A-Z])/g, "$1\n$2") // Insert newline before capitalized words
          .trim();

      console.log("Formatted Earn Points details:", formattedPoints);
    }
    await this.page.getByRole("button", { name: "How it works" }).nth(1).click();
    await this.page.getByRole("link", { name: "View now" }).click();
    await expect(this.page.locator(this.giveawayTitle)).toBeVisible();
    await this.page.goBack();
  }

  async logout() {
    await this.page.getByLabel("Open profile menu").hover();
    //await this.page.getByRole("menuitem", { name: "Log out" }).waitFor({ state: "visible" });
    await this.page.getByRole("menuitem", { name: "Logout" }).click();
    console.log("“User has been successfully logged out.”");
  }

  async search() {
    await this.page.getByPlaceholder("Search").waitFor({ state: "visible" });
    const firstBusinessName = await this.page.locator(this.homeBusinessName).nth(0).textContent();
    if (firstBusinessName) {
      console.log(firstBusinessName);
      await this.page.getByPlaceholder("Search").fill(firstBusinessName);
    } else {
      console.log("No text found for the first business name.");
    }
    await this.page.keyboard.press("Enter");
    const messageIcon = this.page.locator(this.makeSuggestionIcon).first();
    await messageIcon.waitFor({ state: "visible" });
    await messageIcon.click();
    expect(this.page.getByText("Give your two cents")).toBeVisible();
    // await this.page.getByText("What's your two cents about?").waitFor({ state: "visible" });
  }
}
