import React from 'react'
import {
  Route,
  Switch
} from 'react-router-dom'
import Reboot from 'material-ui/Reboot'
import MenuBar from './MenuBar'
import Categories from './categories'
import routes from '../routes'
import { connect } from 'react-redux'

export const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    render={props => (
      <route.component
        exact={route.exact}
        routes={route.routes}
        {...props}
      />
    )}
  />
)

const App = props => {
  return (
    <div id="app">
      <Reboot />
      <MenuBar />
      <Categories />

      <ConnectedSwitch>
        {routes.map((route, i) => 
          <RouteWithSubRoutes
            key={i}
            {...route}
          />
        )}
      </ConnectedSwitch>
    </div>
  )
}

const ConnectedSwitch = connect(state => ({
  location: state.location
}))(Switch)

export default App
