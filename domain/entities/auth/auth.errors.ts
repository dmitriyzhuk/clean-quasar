import { DomainError } from '../error';
export class NotAuthorized extends DomainError {
  constructor(data?: { message?: string; source?: unknown }) {
    super(data);
    this.message = data?.message ?? 'You are not Authorized';
  }
}
