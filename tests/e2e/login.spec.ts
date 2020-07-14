import 'chromedriver';
import 'selenium-webdriver/chrome';
import { LoginPage } from './pages/login.page';
import { WebDriverFactory } from './selenium/web-driver.factory';
import { WebDriverWrapper } from './selenium/web-driver.wrapper';
import { MainPage } from './pages/main.page';
import { ConfigLoader } from './config/config-loader';

describe('e2e/app.spec.ts', () => {
  let driver: WebDriverWrapper;
  let loginPage: LoginPage;
  let mainPage: MainPage;

  beforeAll(async () => {
    driver = await new WebDriverFactory().createInsecureChrome();
    loginPage = await LoginPage.createLoginPage(driver);
    mainPage = new MainPage(driver);
  });

  afterAll(async () => driver.quit());

  it('the user should start at the login page', async () => {
    expect(await loginPage.isLoginPage()).toEqual(true);
    expect(await mainPage.isMainPageInvisible()).toEqual(true);
  });

  describe('when the user does a successful login', () => {
    beforeEach(async () => {
      const { username, password } = (await ConfigLoader.getConfig()).CREDENTIALS;
      await loginPage.login(username, password);
    });

    it('should redirect users to the main page', async () => {
      expect(await mainPage.isMainPage()).toEqual(true);
      expect(await loginPage.loginNotVisible()).toEqual(true);
    });
  });
});
