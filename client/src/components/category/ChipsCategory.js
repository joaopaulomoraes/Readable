import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import Paper from 'material-ui/Paper'
import TagFacesIcon from 'material-ui-icons/TagFaces'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2
  },
  chip: {
    margin: theme.spacing.unit / 2
  }
})

class ChipsCategory extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  state = {
    chipData: [
      { id: 0, label: 'React' },
      { id: 1, label: 'Redux' },
      { id: 2, label: 'Udacity' },
      { id: 3, label: 'All' }
    ]
  }

  handleClick = () => {
    alert('You clicked the Chip.')
  }

  render() {
    const { classes } = this.props
    const { chipData } = this.state

    return (
      <Paper className={classes.root}>
        {chipData.map(data => {
          let avatar = null

          if (data.label === 'React') {
            avatar = (
              <Avatar>
                <TagFacesIcon className={classes.svgIcon} />
              </Avatar>
            )
          }

          return (
            <Chip
              id={data.id}
              avatar={avatar}
              label={data.label}
              onClick={this.handleClick}
              className={classes.chip}
            />
          )
        })}
      </Paper>
    )
  }
}

export default withStyles(styles)(ChipsCategory)
