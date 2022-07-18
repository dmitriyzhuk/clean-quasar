/* eslint-disable @typescript-eslint/no-explicit-any */
import { DomainError } from 'domain/entities';

export const errorHandler = (error: DomainError | any) => {
  if (error instanceof DomainError) {
    console.error('AppError:', error.message);
  } else {
    console.error('unknown:', error);
  }
};
