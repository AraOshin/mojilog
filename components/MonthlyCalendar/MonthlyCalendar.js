import React from 'react';
import { Typography } from '@material-ui/core';
import CalendarCell from '../CalendarCell/CalendarCell';
import './MonthlyCalendar.css';


const MonthlyCalendar = () => (
  <div className="MonthlyCalendar">
    <Typography gutterBottom paragraph align="center" variant="h4" component="h2" color="primary">
      Mood Tracker
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
      {Array(7).fill(null).map((day, i) => <CalendarCell key={7 + i} date={7 + i} />)}
    </div>
    <div className="Week">
      {Array(7).fill(null).map((day, i) => <CalendarCell key={14 + i} date={14 + i} />)}
    </div>
    <div className="Week">
      {Array(7).fill(null).map((day, i) => <CalendarCell key={21 + i} date={21 + i} />)}
    </div>
  </div>
);


export default MonthlyCalendar;

// calendarData[2018].november.days
