import 'chromedriver';
import 'selenium-webdriver/chrome';
import { AppPage } from './pages/app.page';
import { WebDriverFactory } from './selenium/web-driver.factory';
import { WebDriverWrapper } from './selenium/web-driver.wrapper';

describe('e2e/app.spec.ts', () => {
  let driver: WebDriverWrapper;
  let appPage: AppPage;

  beforeAll(async () => {
    driver = await new WebDriverFactory().createInsecureChrome();
    appPage = await AppPage.createAppPage(driver);
  });

  afterAll(async () => driver.quit());

  it('should show a hello world', async () => {
    expect(await appPage.getGreeting()).toEqual('Hello World!');
  });
});
