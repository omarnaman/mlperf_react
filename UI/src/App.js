import React, { lazy } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer'
import { ConfigProvider  } from './context/ConfigContext'

const Layout = lazy(() => import('./containers/Layout'))

//app component rendered in index.js
function App() {
  return (
    <>
      <ConfigProvider>
        <Router>
          <AccessibleNavigationAnnouncer />
          <Switch>
            {/* Place new routes over this */}
            <Route path="/app" component={Layout} />
            <Redirect exact from="/" to="/app" />
          </Switch>
        </Router>
      </ConfigProvider>
    </>
  );
}

export default App
