export const routes = {
  app: {
    home: '/',
    signIn: '/sign-in',
    register: '/register',
    contact: '/contact',
    changePassword: '/change-password',
    changeProfile: '/change-profile',
    signUp: '/register',
    plagiarismPolicy: '',
    participationTerms: ''
  },
  lab: {
    dashboard: '/lab/dashboard',
    tests: '/lab/tests',
    settings: '/lab/settings',
    reports: {
      generate: '/lab/reports/generate',
      list: '/lab/reports/list',
      print: (id?: string) => `/lab/reports/print/${id}`,
      update: (id?: string) => `/lab/reports/generate/${id}`
    }
  }
} as const;
