import { describe, expect, it, beforeAll } from '@jest/globals';
import SetupTests from '../../setupTests';
import { LearningObjectsRepository } from '.';

describe('Repository/Prime/LearningObjects', () => {
  let learningObjectsRepository: LearningObjectsRepository;
  let learningObjectId: string;
  // let learningObject: ILearningObjectResponse;

  beforeAll(() => {
    const setupTests = new SetupTests();
    const axiosInstance = setupTests.init();
    if (axiosInstance) {
      learningObjectsRepository = new LearningObjectsRepository(axiosInstance);
    }
  });

  describe('list', () => {
    it('should return a list of Learning Objects', async () => {
      const response = await learningObjectsRepository.list({
        include: ['instances', 'instances.badge'],
      });
      console.log(response);
      if (response?.data) {
        learningObjectId = response.data[0].id;
      }
      expect(response?.data).toBeDefined();
    });
  });

  describe('get', () => {
    it('should return a Learning Object', async () => {
      const response = await learningObjectsRepository.get(learningObjectId);
      console.log(response);
      // if(response?.data){
      //     learningObject = response.data;
      // }
      expect(response).toBeDefined();
    });
  });

  // describe('listAll', () => {
  //     it('should return a list of all Learning Objects', async () => {
  //         const response = await learningObjectsRepository.listAll({
  //             maxLimit:20,
  //             include:['instances', 'instances.badge']
  //         })
  //         console.log(response)
  //         expect(response).toBeDefined();
  //     });
  // });

  describe('listNotes', () => {
    it('should return a list of all Learning Object Notes', async () => {
      const response = await learningObjectsRepository.listNotes('course:2832047');
      console.log(JSON.stringify(response));
      expect(response).toBeDefined();
    });
  });
});
