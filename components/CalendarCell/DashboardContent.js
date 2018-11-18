/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
// import { CircularProgress, Button } from '@material-ui/core/';
import { Emoji } from 'emoji-mart';
import { connect } from 'react-redux';
import m from 'moment';
import Tooltip from '@material-ui/core/Tooltip';
import { getDashboardKeys } from '../../src/selectors/selectors';


const mapStateToProps = (state, props) => ({
  emojiBundle: (getDashboardKeys(state)).map(logKey => state.logsData[logKey].data[props.date] && { ...state.logsData[logKey].data[props.date], mojiLogKey: logKey, mojiLogLabel: state.logsData[logKey].label }).filter(result => !!result),
  cell: props.cell,
});


class DashboardContent extends Component {
  renderCellContent = () => {
    const { emojiBundle, date } = this.props;

    return Object.values(emojiBundle).map(emoji => <Tooltip title={emoji.mojiLogLabel}><div><Emoji emoji={emoji.id} set="apple" size={28} /></div></Tooltip>);
  }

  render() {
    const { emojiBundle, date } = this.props;


    console.log(date, emojiBundle);
    const moment = m;
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {this.renderCellContent()}
      </div>
    );
  }
}


export default connect(mapStateToProps)(DashboardContent);
