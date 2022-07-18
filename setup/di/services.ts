import { object, use } from 'rsdi';
import { AccountService } from 'domain/services';

export const services = {
  AccountService: object(AccountService).construct(
    use('ErrorMap'),
    use('AuthRepository'),
    use('PrimeRepository'),
    use('ApiRepository'),
    use('AuthMap'),
    use('UserMap')
  ),
};
