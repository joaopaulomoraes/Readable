import React from 'react'
import Reboot from 'material-ui/Reboot'
import MenuBar from './MenuBar'
import Categories from './categories'

const App = props => {
  return (
    <div id="app">
      <Reboot />
      <MenuBar />
      <Categories />
    </div>
  )
}

export default App
