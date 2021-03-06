import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import {
  LocalLibrary,
  AccountCircle,
  ExitToApp
} from 'material-ui-icons'

import { withRouter } from 'react-router-dom'

const styles = {
  root: {
    width: '100%'
  },
  flex: {
    flex: 1,
    cursor: 'pointer'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}

class MenuBar extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  state = {
    auth: true
  }

  render() {
    const {
      classes,
      history
    } = this.props
    
    const { auth } = this.state

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Brand"
              disabled
            >
              <LocalLibrary />
            </IconButton>
            <Typography
              className={classes.flex}
              type="title"
              color="inherit"
              onClick={() => history.push('/')}
            >
              Readable
            </Typography>
            <div>
              <IconButton
                aria-label="Logout"
                color="inherit"
              >
              {auth ? (
                <ExitToApp />
              ): (
                <AccountCircle />
              )}
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(MenuBar))
