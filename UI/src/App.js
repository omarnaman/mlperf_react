import React, { lazy } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer'
import { ConfigProvider  } from './context/ConfigContext'
import configData from './server_config'

const Page404 = lazy(() => import('./pages/404'))
const Layout = lazy(() => import('./containers/Layout'))

//app component rendered in index.js
const prefix = configData["PREFIX"]

function App() {
  return (
    <>
      <ConfigProvider>
        <Router>
          <AccessibleNavigationAnnouncer />
          <Switch>
            {/* Place new routes over this */}
            <Route path={prefix} component={Layout} />
            <Route path="/" component={Page404} />
          </Switch>
        </Router>
      </ConfigProvider>
    </>
  );
}

export default App
