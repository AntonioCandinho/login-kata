import { ConfigLoader } from '../config/config-loader';
import { WebDriverWrapper } from '../selenium/web-driver.wrapper';
import { By } from 'selenium-webdriver';

export class LoginPage {
  public static readonly USERNAME_SELECTOR = '[data-testid=login-username]';
  public static readonly PASSWORD_SELECTOR = '[data-testid=login-password]';
  public static readonly SUBMIT_SELECTOR = '[data-testid=login-submit]';

  constructor(private driver: WebDriverWrapper) {}

  static async createLoginPage(driver: WebDriverWrapper): Promise<LoginPage> {
    const page = new LoginPage(driver);
    await page.navigateTo();
    return page;
  }

  async navigateTo(url?: string): Promise<void> {
    const rootUrl = url || (await ConfigLoader.getConfig()).ROOT_URI;
    await this.driver.get(rootUrl);
  }

  async isLoginPage(): Promise<boolean> {
    const areVisible = await Promise.all([
      this.driver.isVisible(LoginPage.USERNAME_SELECTOR),
      this.driver.isVisible(LoginPage.PASSWORD_SELECTOR),
      this.driver.isVisible(LoginPage.SUBMIT_SELECTOR),
    ]);
    return areVisible.reduce((a, b) => a && b, true);
  }

  async loginNotVisible(): Promise<boolean> {
    const elements = await Promise.all([
      this.driver.findElements(By.css(LoginPage.USERNAME_SELECTOR)),
      this.driver.findElements(By.css(LoginPage.PASSWORD_SELECTOR)),
      this.driver.findElements(By.css(LoginPage.SUBMIT_SELECTOR)),
    ]);
    return elements.map((e) => e.length).reduce((a, b) => a + b, 0) === 0;
  }

  async login(username: string, password: string): Promise<void> {
    const [usernameInput, passwordInput, submitButton] = await Promise.all([
      this.driver.querySelector(LoginPage.USERNAME_SELECTOR),
      this.driver.querySelector(LoginPage.PASSWORD_SELECTOR),
      this.driver.querySelector(LoginPage.SUBMIT_SELECTOR),
    ]);
    await usernameInput.sendKeys(username);
    await passwordInput.sendKeys(password);
    await submitButton.click();
  }
}
