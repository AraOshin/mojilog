import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import { switchActiveMojilog } from '../../src/thunks';


const mapStateToProps = state => ({
  logsData: state.root.logsData,
  activeLogKey: state.root.activeLogKey,
});

class LogsMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (logKey) => {
    const { dispatch } = this.props;

    this.setState({ anchorEl: null });

    dispatch(switchActiveMojilog(logKey));
  };

  render() {
    const { anchorEl } = this.state;
    const { logsData, activeLogKey } = this.props;

    return (
      <div align="right">
        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          mojilogs
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => this.handleClose(activeLogKey)}
        >

          {Object.keys(logsData).map(logKey => (
            <MenuItem key={logKey} onClick={() => this.handleClose(logKey)}>
              {logsData[logKey].label}
            </MenuItem>
          ))}


        </Menu>
      </div>
    );
  }
}

export default connect(mapStateToProps)(LogsMenu);
