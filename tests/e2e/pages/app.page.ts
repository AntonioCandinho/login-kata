import { ConfigLoader } from '../config/config-loader';
import { WebDriverWrapper } from '../selenium/web-driver.wrapper';

export class AppPage {
  constructor(private driver: WebDriverWrapper) {}

  static async createAppPage(driver: WebDriverWrapper): Promise<AppPage> {
    const page = new AppPage(driver);
    await page.navigateTo();
    return page;
  }

  async navigateTo(url?: string): Promise<void> {
    const rootUrl = url || (await ConfigLoader.getConfig()).ROOT_URI;
    await this.driver.get(rootUrl);
  }

  async getGreeting(): Promise<string> {
    const text = await this.driver.querySelector('h1');
    return text.getText();
  }
}
