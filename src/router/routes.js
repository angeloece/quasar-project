
const routes = [
  {
    path: '/',
    component: () => import('layouts/GuestLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LoginPage.vue') },
      { path: '', component: () => import('pages/RegistrationPage.vue') },
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'Patient', component: () => import('pages/PatientPage.vue') },
      { path: 'Appointments', component: () => import('pages/AppointmentPage.vue') },
      { path: 'Chat', component: () => import('pages/ChatsPage.vue') },
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
