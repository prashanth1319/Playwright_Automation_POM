import { APIResponse, Page } from "@playwright/test";
import { v4 as uuidv4 } from "uuid";

export class LoginPage {
  private page: Page;
  context: any;

  constructor(page: Page) {
    this.page = page;
  }

  async loginWithToken(tokenEmail: string): Promise<void> {
    // Perform API request
    const deviceId = uuidv4();
    const response: APIResponse = await this.page.request.post(
      "https://staging-be.mytwocents.io/v1/auth/verify",
      {
        data: { token: tokenEmail },
        headers: {
          "Content-Type": "application/json",
          "x-referer": "business",
          "device-id": deviceId,
        },
      },
    );

    if (!response.ok()) {
      console.error("Failed to fetch API key:", response.status());
      throw new Error("API token fetch failed");
    }

    // Extract API key from response
    const responseData = await response.json();
    const apiKey: string = responseData.data.access_token;

    console.log("Fetched API Key:", apiKey);

    // Add cookies to browser context
    await this.page.context().addCookies([
      {
        name: "access_token",
        value: apiKey,
        url: "https://staging-fe.mytwocents.io",
      },
      {
        name: "anonymous_user",
        value: "no",
        url: "https://staging-fe.mytwocents.io",
      },
      {
        name: "device_id",
        value: deviceId,
        url: "https://staging-fe.mytwocents.io",
      },
      {
        name: "roles",
        value: "%5B%22business_owner%22%2C%22patron%22%5D",
        url: "https://staging-fe.mytwocents.io",
      },
      {
        name: "xReferer",
        value: "business",
        url: "https://staging-fe.mytwocents.io",
      },
    ]);

    // Add localStorage setup
    await this.page.context().addInitScript((id) => {
      localStorage.setItem(
        "analytics_user",
        JSON.stringify({
          id: "1bf812d8-70c1-4583-a755-7501879e8de7",
          deviceId: id,
          userType: "business_owner",
        }),
      );
      localStorage.setItem("business_id", "b2e86d29-c7e5-4253-b0ea-faadd7924f64");
      localStorage.setItem("device_id", id);
      localStorage.setItem(
        "mp_0a96a4d844cc1ab25b16b1b469c7c5f8_mixpanel",
        JSON.stringify({
          distinct_id: "1bf812d8-70c1-4583-a755-7501879e8de7",
          $device_id: `${id}-unique-device-id`,
          $initial_referrer: "$direct",
          $initial_referring_domain: "$direct",
        }),
      );
      localStorage.setItem("user_id", "1bf812d8-70c1-4583-a755-7501879e8de7");
      localStorage.setItem("username", "Ayush K");
    }, deviceId);
  }

  // async navigateToAccountPage(): Promise<void> {
  //   await this.page.goto("/business/dashboard");
  //   await this.page.waitForTimeout(10000); // Debugging delay
  // }

  async navigateToDashboard() {
    await this.page.goto("https://staging-fe.mytwocents.io/business/dashboard");
    await this.page
      .getByRole("heading", { name: "Health Check Chart" })
      .waitFor({ state: "visible" });
    console.log("Navigated to Dashboard");
    await this.page.pause();
  }
}
