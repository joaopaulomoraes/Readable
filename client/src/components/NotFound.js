import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Avatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'
import { SentimentNeutral } from 'material-ui-icons'

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing.unit * 4
  },
  message: {
    width: '25vh',
    height: '25vh',
    marginTop: '15vh'
  }
})

const NotFound = props => {
  const {
    classes,
    message
  } = props

  return (
    <div
      id="not-found"
      className={classes.root}
    >
      <Grid
        container
        spacing={24}
      >
        <Grid
          item
          xs={12}
          container
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Avatar className={classes.message}>
            <SentimentNeutral
              style={{
                width: '25vh',
                height: '25vh'
              }}
            />
          </Avatar>
          <Typography
            variant="display2"
            paragraph
            style={{
              marginTop: 20
            }}
          >
            {message}
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}

NotFound.defaultProps = {
  message: 'Page not found.'
}

NotFound.propTypes = {
  message: PropTypes.string.isRequired
}

export default withStyles(styles)(NotFound)
