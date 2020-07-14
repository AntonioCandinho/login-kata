import { WebDriverWrapper } from '../selenium/web-driver.wrapper';
import { By } from 'selenium-webdriver';

export class MainPage {
  public static readonly MAIN_PAGE_SELECTOR = '[data-testid=main-page-container]';

  constructor(private driver: WebDriverWrapper) {}

  async isMainPage(): Promise<boolean> {
    return this.driver.isVisible(MainPage.MAIN_PAGE_SELECTOR);
  }

  async isMainPageInvisible(): Promise<boolean> {
    const elements = await this.driver.findElements(By.css(MainPage.MAIN_PAGE_SELECTOR));
    return elements.length == 0;
  }
}
