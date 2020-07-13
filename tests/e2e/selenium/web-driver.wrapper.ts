import { By, Condition, Locator, until, WebDriver, WebElement } from 'selenium-webdriver';

export interface WebDriverWrapper extends WebDriver {}

const locate = (s: string | Locator): Locator => (typeof s === 'string' ? By.css(s) : s);

export class WebDriverWrapper {
  static readonly WAIT_UNTIL_TIME = 20000;

  constructor(private driver: WebDriver) {
    return Object.assign(Object.create(driver), {
      waitTimeout: this.waitTimeout.bind(this),
      querySelector: this.querySelector.bind(this),
      querySelectorAll: this.querySelectorAll.bind(this),
      clearSessionStorage: this.clearSessionStorage.bind(this),
      clearLocalStorage: this.clearLocalStorage.bind(this),
    });
  }

  async waitTimeout<T>(
    condition: PromiseLike<T> | Condition<T> | ((driver: WebDriver) => T | PromiseLike<T>),
    message?: string
  ): Promise<T> {
    return this.driver.wait(condition, WebDriverWrapper.WAIT_UNTIL_TIME, message);
  }

  async querySelector(selector: string | Locator): Promise<WebElement> {
    const element = await this.waitTimeout(until.elementLocated(locate(selector)));
    return this.waitElementVisible(element);
  }

  async querySelectorAll(selector: string | Locator): Promise<WebElement[]> {
    const elements = await this.waitTimeout(until.elementsLocated(locate(selector)));
    return Promise.all(elements.map((e) => this.waitElementVisible(e)));
  }

  private async waitElementVisible(element: WebElement): Promise<WebElement> {
    await this.waitTimeout(until.elementIsVisible(element));
    return element;
  }

  async clearSessionStorage(): Promise<void> {
    await this.driver.executeScript('window.sessionStorage.clear();');
  }

  async clearLocalStorage(): Promise<void> {
    await this.driver.executeScript('window.localStorage.clear();');
  }
}
