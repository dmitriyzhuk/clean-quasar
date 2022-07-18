import { DomainError } from '../error';
export class UserNotFound extends DomainError {
  constructor(data?: { message?: string; source?: Error }) {
    super(data);
    this.message = data?.message ?? 'User not found';
  }
}
