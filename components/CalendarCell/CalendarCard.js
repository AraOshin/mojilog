import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  withStyles, Card, RootRef, Typography, CardContent,
} from '@material-ui/core';
import { connect } from 'react-redux';
import moment from 'moment';
import CalendarContent from './CalendarContent';
import DashboardContent from './DashboardContent';


const mapStateToProps = state => ({
  calendarMode: state.root.calendarMode,
});

const styles = {
  card: {
    width: 150,
    height: 135,
    margin: 6,
    position: 'relative',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};


class CalendarCard extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    cellId: PropTypes.number,
    calendarMode: PropTypes.string,


  };

  startOfMonthDay = moment().startOf('month').day();

  daysInMonth = moment().daysInMonth();

  date = this.props.cellId - this.startOfMonthDay + 1; //eslint-disable-line

  activeInMonth = !!(this.props.cellId >= this.startOfMonthDay && this.date <= this.daysInMonth);

  constructor(props) {
    super(props);
    this.state = {
      cell: {},
    };
    this.cardRef = React.createRef();
  }

  componentDidMount() {
    this.storeCell();
  }

  storeCell = () => {
    const cell = this.cardRef.current.getBoundingClientRect();
    this.setState({ cell });
  }

  renderCardContent = () => {
    const { cell } = this.state;
    const { calendarMode, cellId } = this.props;

    if (!this.activeInMonth) return <div />;
    if (calendarMode === 'mojilog') {
      return <CalendarContent cell={cell} storeCell={this.storeCell} cellId={cellId} date={this.date} activeInMonth={this.activeInMonth} />;
    }
    if (calendarMode === 'dashboard') {
      return <DashboardContent cell={cell} cellId={cellId} date={this.date} activeInMonth={this.activeInMonth} />;
    }
  }

  render() {
    const {
      classes,
    } = this.props;


    return (


      <RootRef rootRef={this.cardRef}>
        <Card className={classes.card}>

          <CardContent>
            {
              this.activeInMonth && (
                <Typography variant="h5" component="h2">
                  {this.date}
                </Typography>
              )
            }
            {this.renderCardContent()}
          </CardContent>
        </Card>
      </RootRef>
    );
  }
}


export default connect(mapStateToProps)(withStyles(styles)(CalendarCard));
