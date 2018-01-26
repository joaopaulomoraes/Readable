import React, { Component } from 'react'
import Reboot from 'material-ui/Reboot'
import MenuAppBar from './MenuAppBar'
import ChipsCategory from './category/ChipsCategory'
class App extends Component {
  render() {
    return (
      <div>
        <Reboot />
        <MenuAppBar />
        <ChipsCategory />
      </div>
    )
  }
}

export default App
