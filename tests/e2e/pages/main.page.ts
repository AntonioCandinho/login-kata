import { WebDriverWrapper } from '../selenium/web-driver.wrapper';
import { By } from 'selenium-webdriver';

export class MainPage {
  public static readonly MAIN_PAGE_SELECTOR = '[data-testid=main-page-container]';
  public static readonly LOGOUT_BUTTON_SELECTOR = '[data-testid=logout-button]';

  constructor(private driver: WebDriverWrapper) {}

  async isMainPage(): Promise<boolean> {
    return this.driver.isVisible(MainPage.MAIN_PAGE_SELECTOR);
  }

  async isMainPageInvisible(): Promise<boolean> {
    const elements = await this.driver.findElements(By.css(MainPage.MAIN_PAGE_SELECTOR));
    return elements.length == 0;
  }

  async logout(): Promise<void> {
    const logoutButton = await this.driver.querySelector(MainPage.LOGOUT_BUTTON_SELECTOR);
    return logoutButton.click();
  }
}
