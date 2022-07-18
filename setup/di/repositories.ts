import { object, use } from 'rsdi';
import { AuthRepository, ApiRepository, PrimeRepository } from 'data/repositories';

export const repositories = {
  AuthRepository: object(AuthRepository).construct(
    use('authApiBaseURL'),
    use('primeApiURL'),
    use('primeClientId'),
    use('authLocalStorageName')
  ),
  PrimeRepository: object(PrimeRepository).construct(use('PrimeAxios')),
  ApiRepository: object(ApiRepository).construct(use('ApiAxios')),
};
