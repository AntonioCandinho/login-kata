import { LocalStorageAccessTokenRepository } from '../../../src/repositories/LocalStorageAccessTokenRepository';

describe('InMemoryAccessTokenRepository', () => {
  let repository: LocalStorageAccessTokenRepository;

  beforeEach(() => {
    let accessToken: null | string;
    const mockStorage: Storage = {
      length: 1,
      key: () => '',
      getItem: () => {
        return accessToken;
      },
      setItem: (_, value) => {
        accessToken = value;
      },
      removeItem: () => {
        accessToken = null;
      },
      clear: () => {
        accessToken = null;
      },
    };
    repository = new LocalStorageAccessTokenRepository(mockStorage);
  });

  it('getting a token without previously storing it throws an error', () => {
    expect(() => repository.get()).toThrowError(/Access token not found/);
  });

  describe('given a token is stored', () => {
    const accessToken = `${Math.random()}`;

    beforeEach(() => {
      repository.save(accessToken);
    });

    it('should be able to retrieve it', () => {
      expect(repository.get()).toEqual(accessToken);
    });

    it('should be able to delete it', () => {
      repository.delete();
      expect(() => repository.get()).toThrow();
    });
  });
});
