import 'chromedriver';
import 'selenium-webdriver/chrome';
import { LoginPage } from './pages/login.page';
import { WebDriverFactory } from './selenium/web-driver.factory';
import { WebDriverWrapper } from './selenium/web-driver.wrapper';
import { MainPage } from './pages/main.page';
import { ConfigLoader } from './config/config-loader';

describe('Login e2e cases', () => {
  let driver: WebDriverWrapper;
  let loginPage: LoginPage;
  let mainPage: MainPage;

  const expectLoginPage = async () => {
    expect(await loginPage.isLoginPage()).toEqual(true);
    expect(await mainPage.isMainPageInvisible()).toEqual(true);
  };

  const expectMainPage = async () => {
    expect(await mainPage.isMainPage()).toEqual(true);
    expect(await loginPage.loginNotVisible()).toEqual(true);
  };

  beforeAll(async () => {
    driver = await new WebDriverFactory().createInsecureChrome();
    loginPage = await LoginPage.createLoginPage(driver);
    mainPage = new MainPage(driver);
  });

  afterAll(async () => driver.quit());

  it('the user should start at the login page', expectLoginPage);

  describe('when the user does a login', () => {
    beforeEach(async () => {
      const { username, password } = (await ConfigLoader.getConfig()).CREDENTIALS;
      await loginPage.login(username, password);
    });

    it('should be redirected to the main page', expectMainPage);

    describe('and when it does a logout', () => {
      beforeEach(async () => {
        await mainPage.logout();
      });

      it('should be redirected back to the login page', expectLoginPage);
    });
  });
});
