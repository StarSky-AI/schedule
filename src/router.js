import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/home.vue')
    },
    {
      path: '/menu',
      name: 'menu',
      component: () => import('./views/menu.vue')
    },
    {
      path: '/site',
      name: 'site',
      component: () => import('./views/site.vue')
    },
    {
      path: '/password',
      name: 'password',
      component: () => import('./views/password.vue')      
    }
  ]
});
//设置路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.token ? true : false;
  if(to.path == '/login') {
    next();
  }else {
    isLogin ? next() : next('/login');
  }
});
export default router;
