
const routes = [
  {
    path: '/guest',
    component: () => import('layouts/GuestLayout.vue'),
    children: [
      { path: 'login', component: () => import('pages/LoginPage.vue') },
      { path: 'register', component: () => import('pages/RegistrationPage.vue') },
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'Patients', component: () => import('pages/PatientsPage.vue') },
      { path: 'Appointments', component: () => import('pages/AppointmentsPage.vue') },
      { path: 'Chats', component: () => import('pages/ChatsPage.vue') },
      { path: 'Consultations', component: () => import('pages/ConsultationsPage.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
