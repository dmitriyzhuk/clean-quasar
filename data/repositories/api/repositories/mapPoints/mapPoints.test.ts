import { describe, expect, it } from '@jest/globals';
import SetupTests from '../../setupTests';
import { MapPointsRepository, IMapPointResponse } from '.';

describe('MapPointsRepository', () => {
  let mapPointsRepository: MapPointsRepository;
  let mapPoints: IMapPointResponse[];
  beforeEach(() => {
    const axiosInstance = new SetupTests().init();
    if (axiosInstance) {
      mapPointsRepository = new MapPointsRepository(axiosInstance);
    }
  });

  describe('list', () => {
    it('should return a list of Course instances', async () => {
      const response = await mapPointsRepository.list();
      if (response?.data) {
        mapPoints = response.data;
      }
      expect(mapPoints).toBeDefined();
    });
  });
});
