import React from 'react';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import CalendarCell from '../CalendarCell/CalendarCell';
import './MonthlyCalendar.css';
import LogsMenu from '../UI/LogsMenu';

const mapStateToProps = state => ({
  activeLogLabel: state.logsData[state.activeLogKey].label,
});

const MonthlyCalendar = ({ activeLogLabel }) => (
  <div className="MonthlyCalendar">
    <LogsMenu />
    <Typography gutterBottom paragraph align="center" variant="h4" component="h2" color="primary">
      my
      {' '}
      {activeLogLabel}
    </Typography>

    <div className="Week">
      <CalendarCell
        date={1}
      />
      <CalendarCell
        date={2}
      />
      <CalendarCell date={3} />
      <CalendarCell date={4} />
      <CalendarCell date={5} />
      <CalendarCell date={6} />
      <CalendarCell date={7} />
    </div>
    <div className="Week">
      {Array(7).fill(null).map((day, i) => <CalendarCell key={8 + i} date={8 + i} />)}
    </div>
    <div className="Week">
      {Array(7).fill(null).map((day, i) => <CalendarCell key={15 + i} date={15 + i} />)}
    </div>
    <div className="Week">
      {Array(7).fill(null).map((day, i) => <CalendarCell key={22 + i} date={22 + i} />)}
    </div>
  </div>
);


export default connect(mapStateToProps)(MonthlyCalendar);

// calendarData[2018].november.days
