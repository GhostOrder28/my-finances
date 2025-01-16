import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store/index';
const ClientListPage = () => import('@/pages/client-list-page.vue');
const ClientPage = () => import('@/pages/client-page.vue') ;
const SalePage = () => import('@/pages/sale-page.vue');
const ClientFormPage = () => import('@/pages/client-form-page.vue');
const SaleFormPage = () => import('@/pages/sale-form-page.vue');
const PaymentFormPage = () => import('@/pages/payment-form-page.vue');
const AuthPage = () => import('@/pages/auth-page.vue');

const routes: Array<RouteRecordRaw> = [
  {
    name: 'home',
    path: '/',
    component: ClientListPage
  },
  {
    name: 'clients',
    path: '/clients',
    component: ClientListPage
  },
  {
    name: 'signup',
    path: '/signup',
    component: AuthPage,
  },
  {
    name: 'signin',
    path: '/signin',
    component: AuthPage,
  },
  {
    name: 'client',
    path: '/client/:clientid',
    component: ClientPage,
  },
  {
    name: 'newclient',
    path: '/newclient',
    component: ClientFormPage
  },
  {
    name: 'editclient',
    path: '/editclient/:clientid',
    component: ClientFormPage
  },
  {
    name: 'sale',
    path: '/client/:clientid/sale/:saleid',
    component: SalePage,
  },
  {
    name: 'newpayment',
    path: '/client/:clientid/sale/:saleid/newpayment',
    component: PaymentFormPage,
  },
  {
    name: 'editpayment',
    path: '/client/:clientid/sale/:saleid/editpayment/:paymentid',
    component: PaymentFormPage,
  },
  {
    name: 'newsale',
    path: '/client/:clientid/newsale',
    component: SaleFormPage
  },
  {
    name: 'editsale',
    path: '/client/:clientid/editsale/:saleid',
    component: SaleFormPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(function (to, from, next) {
  if (to.path === "/" && !store.state.email.length) {
    next("/signin")
  }

  if ([ "/signin", "/signup" ].includes(to.path) && store.state.email.length) {
    next(from.path)
  }

  store.commit('setErrors', {})

  return next()
})

export default router
