import { Page } from "@playwright/test";

export class emilLogin {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async loginWithToken(tokenEmail: string) {
    const response = await this.page.request.post(
      "https://staging-be.mytwocents.io/v1/auth/verify",
      {
        data: { token: tokenEmail },
        headers: {
          "Content-Type": "application/json",
          "x-referer": "user",
          "device-id": "0193cdda-60f4-7374-a150-08074178d186",
        },
      },
    );

    if (!response.ok()) {
      console.error("Failed to fetch API key:", response.status());
      throw new Error("API token fetch failed");
    }

    const responseData: { data: { access_token: string } } = await response.json();
    const accessToken = responseData.data.access_token;
    console.log("Fetched Access Token:", accessToken);

    // Add cookies and localStorage setup
    await this.page.context().addCookies([
      { name: "accesstoken", value: accessToken, url: "https://staging-fe.mytwocents.io" },
      { name: "anonymous_user", value: "no", url: "https://staging-fe.mytwocents.io" },
      {
        name: "device_id",
        value: "0193cdda-60f4-7374-a150-08074178d186",
        url: "https://staging-fe.mytwocents.io",
      },
      {
        name: "roles",
        value: "%5B%22patron%22%2C%22business_owner%22%5D",
        url: "https://staging-fe.mytwocents.io",
      },
      { name: "xReferer", value: "user", url: "https://staging-fe.mytwocents.io" },
    ]);

    await this.page.context().addInitScript(() => {
      localStorage.setItem(
        "analytics_user",
        '{"id":"e4a2fd8a-62a0-409e-85c5-e59285f702e8","deviceId":"0193cdda-60f4-7374-a150-08074178d186","userType":"patron"}',
      );
      localStorage.setItem("business_id", "af3fef06-ac44-4d0d-878d-12c7cb03c027");
      localStorage.setItem("device_id", "0193cdda-60f4-7374-a150-08074178d186");
      localStorage.setItem(
        "mp_0a96a4d844cc1ab25b16b1b469c7c5f8_mixpanel",
        '{"distinct_id": "e4a2fd8a-62a0-409e-85c5-e59285f702e8","$device_id": "193cdda60f61503-050ac8f73e55518-432d2f37-13c680-193cdda60f61503","$initial_referrer": "$direct","$initial_referring_domain": "$direct","__mps": {},"__mpso": {},"__mpus": {},"__mpa": {},"__mpu": {},"__mpr": [],"__mpap": [],"$user_id": "e4a2fd8a-62a0-409e-85c5-e59285f702e8"}',
      );
      localStorage.setItem("user_id", "e4a2fd8a-62a0-409e-85c5-e59285f702e8");
      localStorage.setItem("username", "Ayush K");
    });
  }

  async navigateToDashboard() {
    await this.page.goto("https://staging-fe.mytwocents.io/");
    await this.page
      .getByRole("heading", { name: "Health Check Chart" })
      .waitFor({ state: "visible" });
    console.log("Navigated to Dashboard");
  }
}
