import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Typography, FormGroup } from '@material-ui/core';
import { connect } from 'react-redux';
import CheckBoxSelect from '../UI/CheckBoxSelect';


const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

const mapStateToProps = state => ({
  mojiLogs:
    (state.mojiLogsKeys).map(logKey => ({ [logKey]: state.logsData[logKey].label })),

});


class FilterDrawer extends React.Component {
  state = {
    left: false,
  };


  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes, mojiLogs } = this.props;

    const filterPanel = (
      <div style={{ marginTop: '10%' }}>
        <Typography
          style={{
            textAlign: 'center', color: 'purple',
          }}
          variant="h6"
        >
          Filter mojilogs shown
        </Typography>
        <div style={{ paddingInlineStart: '20%' }}>
          <FormGroup>
            {mojiLogs.map((mojiLog) => {
              const logKey = Object.keys(mojiLog)[0];
              return <CheckBoxSelect label={mojiLog[logKey]} logKey={logKey} />;
            })}
          </FormGroup>
        </div>

        <Divider />
        <div className={classes.list}>
          <List>
            {['Done', 'Cancel', 'Save'].map((text, index) => (
              <ListItem button onClick={this.toggleDrawer('left', false)} key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    );


    return (
      <div>
        <Button onClick={this.toggleDrawer('left', true)}>Filter</Button>
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"

            onKeyDown={this.toggleDrawer('left', false)}
          >
            {filterPanel}
          </div>
        </Drawer>
      </div>
    );
  }
}


FilterDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(FilterDrawer));
