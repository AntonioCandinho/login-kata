import DefaultConfig from './default.config';

export class ConfigLoader {
  private static config: typeof DefaultConfig;

  static async getConfig(): Promise<typeof DefaultConfig> {
    const config = process.env.E2E_CONFIG || 'default';
    if (!ConfigLoader.config) {
      ConfigLoader.config = (await import(`./${config.toLowerCase()}.config.ts`)).default;
    }
    return ConfigLoader.config;
  }
}
