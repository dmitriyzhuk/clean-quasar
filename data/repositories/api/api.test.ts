import { describe, expect, it } from '@jest/globals';
import SetupTests from './setupTests';

describe('SetupTests', () => {
  describe('init', () => {
    it('should not return undefined', () => {
      const axiosInstance = new SetupTests().init();
      expect(axiosInstance).toBeDefined();
    });
  });
});
