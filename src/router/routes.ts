import { RouteRecordRaw, RouteLocationNormalized } from 'vue-router';
import { paths } from './paths';
import { container } from 'setup/di';
import { AccountService } from 'domain/services';

const checkAuthantication = (to: RouteLocationNormalized): RouteLocationNormalized | undefined => {
  if (!container.get<AccountService>('AccountService').isAuthanticated()) {
    return { ...to, path: paths.login };
  }
};

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Home.vue'), beforeEnter: [checkAuthantication] },
      { path: paths.login, component: () => import('src/pages/Login.vue') },
      { path: paths.logout, component: () => import('src/pages/Logout.vue'), beforeEnter: [checkAuthantication] },
      { path: paths.catalog, component: () => import('pages/Catalog.vue'), beforeEnter: [checkAuthantication] },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/Error.vue'),
  },
];

export default routes;
