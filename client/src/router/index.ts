import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store/index';
const ClientListPage = () => import('@/pages/client-list-page.vue');
const ClientPage = () => import('@/pages/client-page.vue') ;
const SalePage = () => import('@/pages/sale-page.vue');
const NewClientPage = () => import('@/pages/new-client-page.vue');
const NewSalePage = () => import('@/pages/new-sale-page.vue');
const NewPaymentPage = () => import('@/pages/new-payment.vue');
const AuthPage = () => import('@/pages/auth-page.vue');

// function protectRoute (Component) {
//   body   
// };

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
    path: '/client',
    component: ClientPage 
  },
  {
    name: 'sale',
    path: '/sale',
    component: SalePage
  },
  {
    name: 'newclient',
    path: '/newclient',
    component: NewClientPage
  },
  {
    name: 'newsale',
    path: '/newsale',
    component: NewSalePage
  },
  {
    name: 'newpayment',
    path: '/newpayment',
    component: NewPaymentPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(function (to, from, next) {
  const { path } = to;
  if (path === '/signin' || path === '/signup') {
    store.state.email.length ? next(from.path) : next()
  } else {
    store.state.email.length ? next() : next('/signin')
  }
  next()
})

export default router
