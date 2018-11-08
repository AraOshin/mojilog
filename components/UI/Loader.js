import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class Loader extends React.Component {
  state = {
    completed: 0,
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 100);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  render() {
    const { classes } = this.props;
    const { completed } = this.state;
    return (
      <div align="center" completed={completed}>
        <CircularProgress
          className={classes.progress}
          color="secondary"
          variant="determinate"
          align="center"
          size={50}
          value={completed}
        />
        <CircularProgress
          className={classes.progress}
          variant="determinate"
          align="center"
          value={completed}
        />
        <CircularProgress
          className={classes.progress}
          color="secondary"
          variant="determinate"
          size={50}
          align="center"
          value={completed}
        />
      </div>
    );
  }
}

Loader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loader);
