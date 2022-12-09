import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const ClientListPage = () => import('@/pages/client-list-page.vue');
const ClientPage = () => import('@/pages/client-page.vue') ;
const SalePage = () => import('@/pages/sale-page.vue');
const NewClientPage = () => import('@/pages/new-client-page.vue');
const NewSalePage = () => import('@/pages/new-sale-page.vue');
const NewPaymentPage = () => import('@/pages/new-payment.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: ClientListPage
  },
  {
    path: '/client',
    component: ClientPage 
  },
  {
    path: '/sale',
    component: SalePage
  },
  {
    path: '/newclient',
    component: NewClientPage
  },
  {
    path: '/newsale',
    component: NewSalePage
  },
  {
    path: '/newpayment',
    component: NewPaymentPage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
