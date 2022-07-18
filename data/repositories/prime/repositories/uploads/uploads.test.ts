import { describe, expect, it, beforeAll } from '@jest/globals';
import SetupTests from '../../setupTests';
import { UploadsRepository } from '.';

describe('Repository/Prime/LearningObjects', () => {
  let uploadsRepository: UploadsRepository;
  // let learningObjectId: string;
  // let learningObject: ILearningObjectResponse;

  beforeAll(() => {
    const setupTests = new SetupTests();
    const axiosInstance = setupTests.init();
    if (axiosInstance) {
      uploadsRepository = new UploadsRepository(axiosInstance);
    }
  });

  describe('info', () => {
    it('should return Uploads Info credentials', async () => {
      const response = await uploadsRepository.info();
      console.log(response);
      // if (response?.data) {
      //   learningObjectId = response.data[0].id;
      // }
      expect(response).toBeDefined();
    });
  });

  describe('update', () => {
    it('should return Uploads Info credentials', async () => {
      const response = await uploadsRepository.save(
        'certification:55823_55316_12528945',
        'https://cp-s3-prod-us-east-1-user-upload.s3.amazonaws.com/resources/source/19360/c91b4de4aee94cf8a76b829f1a32bb20/0-02-05-4eb5edbfb181213f1ad9a6b02d5cae915c4c6223454a4caf6d63ea060b9593ff_1c6da74391d3b4.jpg'
      );
      console.log(response);
      // if (response?.data) {
      //   learningObjectId = response.data[0].id;
      // }
      expect(response).toBeDefined();
    });
  });

  // describe('get', () => {
  //   it('should return a Learning Object', async () => {
  //     const response = await uploadsRepository.get(learningObjectId);
  //     console.log(response);
  //     // if(response?.data){
  //     //     learningObject = response.data;
  //     // }
  //     expect(response).toBeDefined();
  //   });
  // });

  // describe('listAll', () => {
  //     it('should return a list of all Learning Objects', async () => {
  //         const response = await uploadsRepository.listAll({
  //             maxLimit:20,
  //             include:['instances', 'instances.badge']
  //         })
  //         console.log(response)
  //         expect(response).toBeDefined();
  //     });
  // });

  // describe('listNotes', () => {
  //   it('should return a list of all Learning Object Notes', async () => {
  //     const response = await uploadsRepository.listNotes('course:2832047', { include: ['loResources'] });
  //     console.log(JSON.stringify(response));
  //     expect(response).toBeDefined();
  //   });
  // });
});
