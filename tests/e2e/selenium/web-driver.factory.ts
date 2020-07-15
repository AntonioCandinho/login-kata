import { Builder } from 'selenium-webdriver';
import { Options as ChromeOptions } from 'selenium-webdriver/chrome';
import { WebDriverWrapper } from './web-driver.wrapper';

export class WebDriverFactory {
  async createInsecureChrome(): Promise<WebDriverWrapper> {
    const options = new ChromeOptions()
      //.headless()
      .windowSize({ width: 1366, height: 768 })
      .addArguments(
        '--no-sandbox',
        '--disable-web-security',
        '--no-first-run',
        '--disable-default-apps',
        '--ignore-certificate-errors',
        '--bswi',
        '--no-default-browser-check',
        '--use-fake-device-for-media-stream',
        '--use-fake-ui-for-media-stream'
      );
    const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    return new WebDriverWrapper(driver);
  }
}
