/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { CircularProgress, Button } from '@material-ui/core/';
import { Emoji } from 'emoji-mart';
import { connect } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import { getFullDashboardEmojiBundle } from '../../src/selectors/selectors';


const mapStateToProps = (state, props) => ({
  dashboardEmojiBudle: getFullDashboardEmojiBundle(state, props),
});


class DashboardContent extends Component {
  static propTypes = {
    // dispatch: PropTypes.func,
    // loading: PropTypes.bool,
    date: PropTypes.number,
    // TODO dashboardEmojiBudle:
  };

  renderCellContent = () => {
    const { dashboardEmojiBudle } = this.props;

    return Object.values(dashboardEmojiBudle).map(emoji => <Tooltip title={emoji.mojiLogLabel}><div><Emoji emoji={emoji.id} set="apple" size={28} /></div></Tooltip>);
  }

  render() {
    const { date, dashboardEmojiBudle } = this.props;


    console.log(date, dashboardEmojiBudle);
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {this.renderCellContent()}
      </div>
    );
  }
}


export default connect(mapStateToProps)(DashboardContent);
