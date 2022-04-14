/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    icon: 'FormsIcon',
    name: 'Configuration',
    routes: [
      // submenu
      {
        path: '/app/config/loadGen',
        name: 'Load Generator',
      },
      {
        path: '/app/config/system',
        name: 'System Under Test',
      },
      {
        path: '/app/config/network',
        name: 'Network Emulation',
      },
      {
        path: '/app/config/profiles',
        name: 'Profiles',
      },
      {
        path: '/app/config/cloud',
        name: 'Cloud Deployment',
      },      
    ],
  },
  {
    path: '/app/run',
    icon: 'CardsIcon',
    name: 'Run Experiment',
  },
  {
    path: '/app/results',
    icon: 'ChartsIcon',
    name: 'Results',
  },
  {
    path: '/app/resultsGraph',
    icon: 'ChartsIcon',
    name: 'Results Graphed',
  },
  {
    path: '/app/settings',
    icon: 'OutlineCogIcon',
    name: 'Settings',
  },
  
  //commented out code is the original template sidebar code, uncomment to access original template pages

  // {
  //   path: '/app/dashboard', // the url
  //   icon: 'HomeIcon', // the component being exported from icons/index.js
  //   name: 'Dashboard', // name that appear in Sidebar
  // },
  // {
  //   path: '/app/forms',
  //   icon: 'FormsIcon',
  //   name: 'Forms',
  // },
  // {
  //   path: '/app/cards',
  //   icon: 'CardsIcon',
  //   name: 'Cards',
  // },
  // {
  //   path: '/app/charts',
  //   icon: 'ChartsIcon',
  //   name: 'Charts',
  // },
  // {
  //   path: '/app/buttons',
  //   icon: 'ButtonsIcon',
  //   name: 'Buttons',
  // },
  // {
  //   path: '/app/modals',
  //   icon: 'ModalsIcon',
  //   name: 'Modals',
  // },
  // {
  //   path: '/app/tables',
  //   icon: 'TablesIcon',
  //   name: 'Tables',
  // },
]

export default routes
