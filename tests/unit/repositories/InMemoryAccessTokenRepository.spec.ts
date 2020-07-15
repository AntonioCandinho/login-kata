import { InMemoryAccessTokenRepository } from '../../../src/repositories/InMemoryAccessTokenRepository';

describe('InMemoryAccessTokenRepository', () => {
  let memoryAccessToken: InMemoryAccessTokenRepository;

  beforeEach(() => {
    memoryAccessToken = new InMemoryAccessTokenRepository();
  });

  it('getting a token without previously storing it throws an error', () => {
    expect(() => memoryAccessToken.get()).toThrowError(/Access token not found/);
  });

  describe('given a token is stored', () => {
    const accessToken = `${Math.random()}`;

    beforeEach(() => {
      memoryAccessToken.save(accessToken);
    });

    it('should be able to retrieve it', () => {
      expect(memoryAccessToken.get()).toEqual(accessToken);
    });

    it('should be able to delete it', () => {
      memoryAccessToken.delete();
      expect(() => memoryAccessToken.get()).toThrow();
    });
  });
});
