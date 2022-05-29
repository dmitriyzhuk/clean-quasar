import { describe, expect, it } from '@jest/globals';
import SetupTests from '../../setupTests';
import { SlidesRepository, ISlideResponse } from '.';

describe('SlidesRepository', () => {
  let slidesRepository: SlidesRepository;
  let slides: ISlideResponse[];
  beforeEach(() => {
    const axiosInstance = new SetupTests().init();
    if (axiosInstance) {
      slidesRepository = new SlidesRepository(axiosInstance);
    }
  });

  describe('list', () => {
    it('should return a list of Slides', async () => {
      const response = await slidesRepository.list();
      if (response?.data) {
        slides = response.data;
      }
      console.log(slides);
      expect(slides).toBeDefined();
    });
  });
});
