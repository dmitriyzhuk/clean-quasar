import { IUserOptions } from '.';
import { IRequestParams } from '..';

export function mapUserOptionsToRequestParams(options?: IUserOptions): IRequestParams {
  const params: IRequestParams = {};
  if (options) {
    if (options.ids) {
      params['ids'] = options.ids.join(',');
    }
  }
  return params;
}

export function mapIdsToQuery(ids: string[]): string {
  return ids.map((i) => `ids=${i}`).join('&');
}
