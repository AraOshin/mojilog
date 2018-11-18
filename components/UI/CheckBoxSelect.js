import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { FormGroup } from '@material-ui/core';
import { connect } from 'react-redux';

const mapStateToProps = (state, props) => ({
  mojiLogs:
    (state.mojiLogsKeys).map(logKey => ({ [logKey]: state.logsData[logKey].label })),
  keyChecked: state.dashboardLogs[props.logKey],

});

const styles = {
  root: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
};

class CheckBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: props.keyChecked,
    };
  }


  handleChange = (event) => {
    this.setState({ checked: event.target.checked });

    const { logKey, dispatch } = this.props;

    dispatch({
      type: 'MOJILOG_DASHBOARD_TOGGLE',
      logKey,
    });
  }

  render() {
    const { classes } = this.props;

    return (

      <FormControlLabel
        control={(
          <Checkbox
            checked={this.state.checked}
            onChange={this.handleChange}
            value="checked"
          />
        )}
        label={this.props.label}
      />


    );
  }
}

CheckBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(CheckBox));
