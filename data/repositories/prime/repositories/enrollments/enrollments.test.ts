import { describe, expect, it, beforeAll } from '@jest/globals';
import SetupTests from '../../setupTests';
import { EnrollmentsRepository } from '.';

describe('Repository/Prime/Enrollments', () => {
  let enrollmentsRepository: EnrollmentsRepository;
  let enrollmentId: string;
  // let enrollment: IEnrollmentResponse;

  beforeAll(() => {
    const setupTests = new SetupTests();
    const axiosInstance = setupTests.init();
    if (axiosInstance) {
      enrollmentsRepository = new EnrollmentsRepository(axiosInstance);
    }
  });

  describe('list', () => {
    it('Retrieves a list of learner enrollments', async () => {
      const response = await enrollmentsRepository.list({
        // include: ['learningObject', 'loInstance', 'loResourceGrades', 'learner'],
        sort: 'dateEnrolled',
        filter: {
          states: ['active'],
        },
      });
      console.log(JSON.stringify(response));
      if (response?.data) {
        enrollmentId = response.data[0].id;
      }
      expect(response?.data).toBeDefined();
    });
  });

  describe('get', () => {
    it('should return a Enrollment', async () => {
      const response = await enrollmentsRepository.get(enrollmentId);
      console.log(JSON.stringify(response));
      // if(response?.data){
      //     enrollment = response.data;
      // }
      expect(response).toBeDefined();
    });
  });

  describe('delete', () => {
    it('should delete a Enrollment', async () => {
      const response = await enrollmentsRepository.delete('course:2832083_3256523_12528945');
      console.log(JSON.stringify(response));
      // if(response?.data){
      //     enrollment = response.data;
      // }
      expect(response).toBeDefined();
    });
  });

  // describe('listAll', () => {
  //     it('should return a list of all Enrollments', async () => {
  //         const response = await enrollmentsRepository.listAll({
  //             maxLimit:100,
  //         })
  //         // console.log(response)
  //         expect(response).toBeDefined();
  //     });
  // });
});
