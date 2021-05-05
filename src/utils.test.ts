import { buildException } from './utils';

declare const expect: jest.Expect;
declare const it: jest.It;
declare const describe: jest.Describe;

describe('test utils', () => {
  describe('buildException', () => {
    it('should throw exception with proper message', () => {
      const message = `[cypress-selectors] Error type: INTERNAL ERROR, message: something went wrong`;
      expect(buildException('something went wrong', 'INTERNAL ERROR').message).toBe(message);
    });
  });
});
