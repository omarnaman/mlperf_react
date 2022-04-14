import { lazy } from 'react'

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import('../pages/Dashboard'))
const Forms = lazy(() => import('../pages/Forms'))
const Cards = lazy(() => import('../pages/Cards'))
const Charts = lazy(() => import('../pages/Charts'))
const Buttons = lazy(() => import('../pages/Buttons'))
const Modals = lazy(() => import('../pages/Modals'))
const Tables = lazy(() => import('../pages/Tables'))
const Page404 = lazy(() => import('../pages/404'))
const Blank = lazy(() => import('../pages/Blank'))
const Cloud = lazy(() => import('../pages/config/Cloud'))
const Loadgen = lazy(() => import('../pages/config/Loadgen'))
const Network = lazy(() => import('../pages/config/Network'))
const Profiles = lazy(() => import('../pages/config/Profiles'))
const Run = lazy(() => import('../pages/Run'))
const System = lazy(() => import('../pages/config/System'))
const Settings = lazy(() => import('../pages/Settings'))
const Results = lazy(() => import('../pages/Results'))
const ResultsGraph = lazy(() => import('../pages/ResultsGraph'))

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/config/loadGen',
    component: Loadgen,
  },
  {
    path: '/config/cloud',
    component: Cloud,
  },
  {
    path: '/config/profiles',
    component: Profiles,
  },
  {
    path: '/config/network',
    component: Network,
  },
  {
    path: '/run',
    component: Run,
  },
  {
    path: '/config/system',
    component: System,
  },
  {
    path: '/settings',
    component: Settings,
  },
  {
    path: '/results',
    component: Results,
  },
  {
    path: '/resultsGraph',
    component: ResultsGraph,
  },
  {
    path: '/forms',
    component: Forms,
  },
  {
    path: '/cards',
    component: Cards,
  },
  {
    path: '/charts',
    component: Charts,
  },
  {
    path: '/buttons',
    component: Buttons,
  },
  {
    path: '/modals',
    component: Modals,
  },
  {
    path: '/tables',
    component: Tables,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },
]

export default routes
