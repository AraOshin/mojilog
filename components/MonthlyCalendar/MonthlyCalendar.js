import React from 'react';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import './MonthlyCalendar.css';
import LogsMenu from '../UI/LogsMenu';
import CalendarCard from '../CalendarCell/CalendarCard';

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
      {Array(7).fill(null).map((day, i) => <CalendarCard key={1 + i} date={1 + i} />)}
    </div>

    <div className="Week">
      {Array(7).fill(null).map((day, i) => <CalendarCard key={8 + i} date={8 + i} />)}
    </div>
    <div className="Week">
      {Array(7).fill(null).map((day, i) => <CalendarCard key={15 + i} date={15 + i} />)}
    </div>
    <div className="Week">
      {Array(7).fill(null).map((day, i) => <CalendarCard key={22 + i} date={22 + i} />)}
    </div>
  </div>
);


export default connect(mapStateToProps)(MonthlyCalendar);

// calendarData[2018].november.days
