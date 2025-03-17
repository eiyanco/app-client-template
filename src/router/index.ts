
import { createRouter, createWebHistory } from 'vue-router';
const Error =  import('@/pages/error.vue');
const Index =  import('@/pages/index.vue');
const Chats =  import('@/pages/chats.vue');
const Settings =  import('@/pages/settings.vue');
const Admin =  import('@/pages/admin.vue');
const Unauthorized =  import('@/pages/unauthorized.vue');

const Route =  import('@/pages/route.vue');
const Routing =  import('@/pages/routing/routing.vue');
const RoutingContent =  import('@/pages/routing/routing-content.vue');

const Store =  import('@/pages/store.vue');

const Customers =  import(/* webpackChunkName: "customers" */ '@/pages/customers/index.vue');
const CustomersCreate =  import('@/pages/customers/create.vue');
const Customer =  import('@/pages/customers/customer/index.vue');
const CustomerOrders =  import('@/pages/customers/customer/orders.vue');


// This can be directly added to any of your `.ts` files like `router.ts`
// It can also be added to a `.d.ts` file. Make sure it's included in
// project's tsconfig.json "files"
import 'vue-router';

// To ensure it is treated as a module, add at least one `export` statement
export {};

declare module 'vue-router' {
  interface RouteMeta {
    authenticated: boolean,
    permissions?: string[]
  }
}


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'route-active',
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || new Promise((resolve) => {
      setTimeout(() => resolve({ top: 0 }), 100);
    });
  },
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: 'error',
      component: () => Error
    },
    {
      path: '/',
      name: 'index',
      alias: '/home',
      component: () => Index,
      meta: {
        authenticated: false
      }
    },
    {
      path: '/routing',
      name: 'routing',
      component: () => Routing,
      meta: {
        authenticated: false
      }
    },
    {
      // /:number -> matches only numbers
      path: '/routing/:number(\\d+)',
      name: 'number',
      component: () => RoutingContent,
      meta: {
        authenticated: false
      }
    },
    {
      // /:text -> matches anything else
      path: '/routing/:text',
      name: 'text',
      component: () => RoutingContent,
      meta: {
        authenticated: false
      }
    },
    {
      path: '/store',
      name: 'store',
      component: () => Store,
      meta: {
        authenticated: false
      }
    },
    {
      path: '/customers',
      // name: 'customers',
      // component: () => Route,
      meta: {
        authenticated: false
      },
      children: [
        {
          path: '',
          name: 'customers.index',
          component: () => Customers
        },
        {
          path: 'create',
          name: 'customers.create',
          component: () => CustomersCreate
        },
        {
          path: ':id',
          // component: () => Route,
          // props: true,
          children: [
            {
              path: 'home',
              component: () => Customer,
              props: true,
              name: 'customers.customer.home',
            },
            {
              path: '',
              redirect: { name: 'customers.customer.home' }
            },
            {
              path: ':tab',
              component: () => Customer,
              name: 'customers.customer.tab',
            },
            // Redirecting with data
            // {
            //   path: '',
            //   redirect: to => {
            //     return { name: 'customers.customer', params: { id: to.params.id, tab: 'home' }}
            //   }
            // },
            {
              path: 'orders',
              name: 'customers.customer.orders',
              props: route => ({ id: route.params.id && parseInt(route.params.id), name: 'Jamiu Ajia ' }),
              component: () => CustomerOrders
            }
          ]
        }
      ]
    },
    {
      path: '/chats',
      name: 'chats',
      component: () => Chats,
      meta: {
        authenticated: true
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => Settings,
      meta: {
        authenticated: true
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => Admin,
      meta: {
        authenticated: true,
        permissions: ['admin']
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'unauthorized',
      component: () => Unauthorized,
      meta: {
        authenticated: true
      }
    },
  ],
});

router.beforeEach((to, from, next) => {
  const storage = localStorage.getItem('io-chat');
  const user = storage && JSON.parse(storage);

  const authenticatedUser = !!(user && user.accessToken);
  const role = 'user';

  const { authenticated: authenticatedRoute, permissions } = to && to.meta;

  // Unauthenticated users
  if (authenticatedRoute && !authenticatedUser) {
    return next({ name: 'index', query: { redirect: to.fullPath } });
  }

  // Authenticated users
  if (!authenticatedRoute && authenticatedUser) {
    return next({ name: 'chats' });
  }

  // Role-based
  if (authenticatedUser && permissions && !permissions.includes(role)) {
    return next({ name: 'unauthorized', params: { pathMatch: to.path.substring(1).split('/') } });
  }

  // Proceed if no conditions block access
  next();
});

router.afterEach((to, from) => {
  console.log('Analytics - ' + to.fullPath);
});

export default router;
