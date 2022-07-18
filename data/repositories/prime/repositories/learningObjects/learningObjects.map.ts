import { ILearningObjectOptions } from '.';
import { IRequestParams } from '..';

export function mapLearningObjectOptionsToRequestParams(options?: ILearningObjectOptions): IRequestParams {
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
    if (options.ids) {
      params['ids'] = options.ids.join(',');
    }
    if (options.include) {
      params['include'] = options.include.join(',');
    }
    if (options.filter) {
      if (options.filter.loTypes && options.filter.loTypes.length) {
        params['filter.loTypes'] = options.filter.loTypes.join(',');
      }
      if (options.filter.catalogIds && options.filter.catalogIds.length) {
        params['filter.catalogIds'] = options.filter.catalogIds.join(',');
      }
      if (options.filter.learnerState && options.filter.learnerState.length) {
        params['filter.learnerState'] = options.filter.learnerState.join(',');
      }
      if (options.filter.tagName && options.filter.tagName.length) {
        params['filter.tagName'] = options.filter.tagName.join(',');
      }
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
