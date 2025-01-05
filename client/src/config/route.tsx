const ROUTES = {
    PUBLIC: {
      USER_LOGIN: '/login',
      ADMIN_LOGIN: '/admin/login',
      ADMIN_REGISTER: '/admin/register',
    },
    PRIVATE: {
      USER: {
        DASHBOARD: '/dashboard',
      },
      ADMIN: {
        DASHBOARD: '/admin/dashboard',
      }
    }
  };

export default ROUTES
