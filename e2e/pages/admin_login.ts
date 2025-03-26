import { Page } from "@playwright/test";

export class adminLogin{
    private page: Page;
    constructor(page: Page) {
      this.page = page;
    }

    private emailField='#email';
    private passwordField='#password';
    private continueButton="[type='submit']";
    private eyeIcon=".lucide";



    async gotoUrl(){
         await this.page.goto("https://staging-fe.mytwocents.io/admin/login/email");

    }

    async login(emailId:string, password:string){
        await this.page.fill(this.emailField, emailId);
        await this.page.fill(this.passwordField,password);
        await this.page.click(this.eyeIcon);
        await this.page.waitForTimeout(3000);
        await this.page.click(this.continueButton);

    }

    async searchAndCopyURl(search:string){
        await this.page.getByPlaceholder('Search').fill(search);
        await this.page.locator('td:nth-child(5) > div > .flex').click();

        const copiedUrl = await this.page.evaluate(() => navigator.clipboard.readText());
        console.log("Copied URL:", copiedUrl);
        await this.page.goto(copiedUrl);
       // await this.page.getByRole('link', { name: 'Edit' }).click();
    }
    
}