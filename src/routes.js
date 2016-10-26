export default function routeConfig(router) {
  router.map({  
    '/': {
      name: 'main',
      component: (resolve)=>{require(['./views/layout'],resolve)},
      subRoutes: {
        '/dashboard': {
          name: 'dashboard',
          component: (resolve)=>{require(['./views/dashboard'],resolve)}
        },
        '/user': {
          name: 'user',
          component: (resolve)=>{require(['./views/user'],resolve)}
        }      
      }      
    },
    '/login': {
      name: 'login',
      component: (resolve)=>{require(['./views/login'],resolve)}
    }
  });

  router.redirect({
    '*': '/login',
    '/': '/dashboard'
  });

  router.beforeEach(function (transition) {
    let token = sessionStorage.getItem('jwt_token');
    if (!token || token === null) {
      router.go('/login');
    }
    transition.next();
  });

}