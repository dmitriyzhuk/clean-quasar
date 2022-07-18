import { IEnrollmentOptions } from '.';
import { IRequestParams } from '..';

export function mapEnrollmentOptionsToRequestParams(options?: IEnrollmentOptions): IRequestParams {
  const params: IRequestParams = {};
  if (options) {
    if (options.pageLimit) {
      params['page[limit]'] = options.pageLimit.toString();
    }
    if (options.pageCursor) {
      params['page[cursor]'] = options.pageCursor.toString();
    }
    if (options.sort) {
      params['sort'] = options.sort;
    }
    if (options.include) {
      params['include'] = options.include.join(',');
    }
    if (options.filter) {
      if (options.filter.loTypes && options.filter.loTypes.length) {
        params['filter.loTypes'] = options.filter.loTypes.join(',');
      }
      if (options.filter.states && options.filter.states.length) {
        params['filter.states'] = options.filter.states.join(',');
      }
    }
  }
  return params;
}

export function mapLinkToPageCursor(link: string): string | undefined {
  const pageCoursor = new URL(link).searchParams.get('page[cursor]');
  if (pageCoursor) {
    return pageCoursor;
  }
}
