/* eslint-disable @typescript-eslint/no-explicit-any */
import { DomainErrors } from 'domain/entities';
import { IResponseError } from '../repositories/prime';

export class ErrorMap {
  toDomain(error: any | IResponseError): void {
    if (error && error?.type) {
      if (error.type == 'network') throw new DomainErrors.NotAuthorized({ source: error });
      if (error.type == 'request') throw new DomainErrors.NotAuthorized({ source: error });
      if (error.type == 'unauthorized') throw new DomainErrors.NotAuthorized({ source: error });
      if (error.type == 'unknown') throw new DomainErrors.NotAuthorized({ source: error });
      else throw new DomainErrors.NotAuthorized({ source: error });
    }
  }
}
