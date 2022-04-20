/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */

import configData from '../server_config'

const prefix = configData["PREFIX"]
const routes = [
  {
    icon: 'FormsIcon',
    name: 'Configuration',
    routes: [
      // submenu
      {
        path: `${prefix}/config/loadGen`,
        name: 'Load Generator',
      },
      {
        path: `${prefix}/config/system`,
        name: 'System Under Test',
      },
      {
        path: `${prefix}/config/network`,
        name: 'Network Emulation',
      },
      {
        path: `${prefix}/config/profiles`,
        name: 'Profiles',
      },
      {
        path: `${prefix}/config/cloud`,
        name: 'Cloud Deployment',
      },      
    ],
  },
  {
    path: `${prefix}/run`,
    icon: 'CardsIcon',
    name: 'Run Experiment',
  },
  {
    path: `${prefix}/results`,
    icon: 'ChartsIcon',
    name: 'Results',
  },
  {
    path: `${prefix}/resultsGraph`,
    icon: 'ChartsIcon',
    name: 'Results Graphed',
  },
  {
    path: `${prefix}/settings`,
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
