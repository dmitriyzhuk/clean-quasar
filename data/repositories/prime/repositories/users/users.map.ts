import { IUserOptions } from '.';
import { IRequestParams } from '..';

export function mapUserOptionsToRequestParams(options?: IUserOptions): IRequestParams {
  const params: IRequestParams = {};
  if (options) {
    if (options.pageOffset !== undefined) {
      params['page[offset]'] = options.pageOffset.toString();
    }
    if (options.pageLimit) {
      params['page[limit]'] = options.pageLimit.toString();
    }
    if (options.pageCursor !== undefined) {
      params['page[cursor]'] = options.pageCursor.toString();
    }
    if (options.sort) {
      params['sort'] = options.sort;
    }
    if (options.userId) {
      params['userId'] = options.userId;
    }
    if (options.ids) {
      params['ids'] = options.ids.join(',');
    }
    if (options.include) {
      params['include'] = options.include.join(',');
    }
    if (options.filter) {
      params['filter'] = options.filter;
    }
  }
  return params;
}
export function mapLinkToPageCursor(link: string): number | undefined {
  const pageCoursor = new URL(link).searchParams.get('page[cursor]');
  if (pageCoursor) {
    return parseInt(pageCoursor);
  }
}
