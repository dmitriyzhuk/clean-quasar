import { describe, expect, it, beforeAll } from '@jest/globals';
import SetupTests from '../../setupTests';
import { SkillsRepository } from '.';

describe('Repository/Prime/Skills', () => {
  let skillsRepository: SkillsRepository;
  const userId = '12528945';
  // let skillId: string;
  // let skill: ISkillResponse;

  beforeAll(() => {
    const setupTests = new SetupTests();
    const axiosInstance = setupTests.init();
    if (axiosInstance) {
      skillsRepository = new SkillsRepository(axiosInstance);
    }
  });

  describe('list', () => {
    it('should return a list of User Skills', async () => {
      const response = await skillsRepository.listUserSkills(userId, {
        include: ['skillLevel', 'skillLevel.skill'],
      });
      console.log(JSON.stringify(response));

      expect(response?.data).toBeDefined();
    });

    it('should return a list of User Skills with user', async () => {
      const response = await skillsRepository.listUserSkills(userId, {
        include: ['user'],
      });
      console.log(JSON.stringify(response));

      expect(response?.data).toBeDefined();
    });

    it('should return a list of User Skills with user', async () => {
      const response = await skillsRepository.listUserSkills(userId, {
        include: ['skill', 'skill.levels'],
      });
      console.log(JSON.stringify(response));

      expect(response?.data).toBeDefined();
    });
  });
});
