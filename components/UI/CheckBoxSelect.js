import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, FormControlLabel, Checkbox } from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import { connect } from 'react-redux';

const mapStateToProps = (state, props) => ({
  mojiLogs:
    (state.root.mojiLogsKeys).map(logKey => ({ [logKey]: state.root.logsData[logKey].label })),
  keyChecked: state.root.dashboardLogs[props.logKey],

});

const styles = {
  state: {
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
    const { classes, label } = this.props;

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
