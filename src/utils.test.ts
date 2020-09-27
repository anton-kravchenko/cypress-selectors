import { buildException } from './utils';

declare const expect: jest.Expect;
declare const it: jest.It;
declare const describe: jest.Describe;

describe('test utils', () => {
  describe('buildException', () => {
    it('should throw exception with proper message', () => {
      const message = `[cypress-selectors] Error type: UNKNOWN ERROR, message: something went wrong`;
      expect(buildException('something went wrong', 'UNKNOWN ERROR').message).toBe(message);
    });
  });
});
