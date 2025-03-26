import { Page } from "@playwright/test";

export class SuggestionFlow {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  private cardName = "[class*='relative z-10']"; //this fo get buiness
  private suggestRelatesOptins = "[class*='relative mt-2.5']"; // this is for select any one or more from options by test
  private Submit = "text=Submit"; // Selector for mobile number input
  private messageTextBox = "#message"; // enter suggestion
  private upArrow = "[class*='lucide']"; //after feddbacj click on up arrow/submit
  private VerifySelectedRelates = "[class='flex flex-col gap-2']";
  private dragArrow = "#dragArrow"; //drag the arrow
  private targetElement = "[alt='Bulbmoji happy']";
  //use same submit to submit suggestion
  private Percentage = "textarea.text-heading-lg"; //get likely percentage
  private comment = "[name='message']"; //Get suggestion form this component
  private anonymousText = "span[class='text-paragraph-lg-bold']"; // here verify toggle is turn off or on true/fales, if off turn on
  //use same submit button
  private earnedPoints = "h4[class='text-paragraph-md']";
  private submittext = "p[class*='text-center']"; // this is get text submitted succesfully
  private continue = "text=Continue";
  private username = "[class='opacity-100 flex-1 text-paragraph-md']";
  private ernedPoints = "h4[class='text-paragraph-md']";
  private edit = "[alt='Edit Pen Icon']";

  async suggestBusiness(suggest: any) {
    await this.page.pause();
    await this.page.getByRole("button", { name: "Let's do it" }).click();
    const BusinessName = await this.page.locator(this.cardName).textContent();
    console.log("Business Name : ", BusinessName);
    await this.page.waitForTimeout(3000);
    const badgeElements = this.page.locator('[data-sentry-component="Badge"]');
    const count = await badgeElements.count();
    for (let i = 0; i < count; i++) {
      await badgeElements.nth(i).click();
    }
    const nextCta = this.page.getByRole("button", { name: "Next" });
    await nextCta.click();
    const message = this.page.getByPlaceholder("Write your two cents here...");
    await message.waitFor({ state: "visible" });
    await message.fill(suggest);
    await nextCta.click();
    await this.page.waitForLoadState("load");
  }

  async verifySelectedSuggest() {
    const badgeElements = this.page.locator('[data-sentry-component="Badge"]');
    const count = await badgeElements.count();

    // Loop through each element
    for (let i = 1; i < count; i++) {
      const isVisible = await badgeElements.nth(i).isVisible();

      if (isVisible) {
        const text = await badgeElements.nth(i).textContent();
        console.log(`Selected Category  ${i + 0}: ${text?.trim()}`);
      } else {
        console.log(`Selected Category ${i + 0} is not visible.`);
      }
    }
  }

  async rateYourself(suggest: any) {
    const targetElement = this.page.locator(this.targetElement);
    await targetElement.click();

    console.log("Drag operation completed");
    const nextCta = this.page.getByRole("button", { name: "Next" });
    await nextCta.click();

    await this.page.getByText("Do you want to stay anonymous?").waitFor({ state: "visible" });
    await this.page.getByLabel("You can include my name").click();
    await nextCta.click();

    //Edit
    await this.page.locator(this.edit).nth(0).click();
    const saveCta = this.page.getByRole("button", { name: "Save" });
    await this.page.getByPlaceholder("Write your two cents here...").fill("");
    await this.page.getByPlaceholder("Write your two cents here...").fill(suggest);
    await saveCta.click();

    await this.page.locator(this.edit).nth(1).click();
    await saveCta.click();

    await this.page.locator(this.edit).nth(2).click();
    await saveCta.click();
  }

  async suggestDetails() {
    const likelyReturn = await this.page.locator(this.Percentage).textContent();
    console.log("How likely I am to return... is : ", likelyReturn?.trim());
    const visibleFeedback = await this.page.locator(this.comment).textContent();
    console.log("My suggestion is : ", visibleFeedback);
    const anonomys = await this.page.locator(this.anonymousText).textContent();
    console.log("This business will see", anonomys?.trim());

    // If it's off (false), click to turn it on
    // if (!isToggledOn) {
    //   await toggleButton.click(); // Click to turn it on
    //   console.log("Toggle turned ON.");
    // } else {
    //   console.log("Toggle is already ON.");
    // }
    // const userName= await this.page.locator(this.username).textContent();
    // console.log('Suggested by :', userName?.trim());
    await this.page.getByRole("button", { name: "Submit" }).click();
    await this.page.waitForTimeout(3000);

    //Get reward points
    const earnedPointsLocator = this.page.locator(this.earnedPoints);
    if (await earnedPointsLocator.isVisible()) {
      const earnedPoints = await earnedPointsLocator.textContent();
      console.log("Earned Points:", earnedPoints?.trim());
    } else {
      console.log("Non_logged in user Suggestion");
    }
    await this.page.getByRole("link", { name: "Continue" }).click();
  }
}
