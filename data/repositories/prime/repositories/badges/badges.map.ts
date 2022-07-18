import { IBadgeOptions } from '.';
import { IRequestParams } from '..';

export function mapBadgeOptionsToRequestParams(options?: IBadgeOptions): IRequestParams {
  const params: IRequestParams = {};
  if (options) {
    if (options.pageLimit) {
      params['page[limit]'] = options.pageLimit.toString();
    }
    if (options.pageOffset) {
      params['page[offset]'] = options.pageOffset.toString();
    }
    if (options.sort) {
      params['sort'] = options.sort;
    }
    if (options.ids) {
      params['ids'] = options.ids.join(',');
    }
    if (options.include) {
      params['include'] = options.include.join(',');
    }
  }
  return params;
}
export function mapLinkToPageOffset(link: string): number | undefined {
  const pageOffset = new URL(link).searchParams.get('page[offset]');
  if (pageOffset) {
    return parseInt(pageOffset);
  }
}
