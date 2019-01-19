import React from 'react';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import './MonthlyCalendar.css';
import moment from 'moment';
import CalendarCard from '../CalendarCell/CalendarCard';

const cellsToRender = Math.ceil(
  (moment().daysInMonth() + moment().startOf('month').day()) / 7,
) * 7;


const MonthlyCalendar = () => (

  <div className="monthly-calendar-content">
    {[
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ].map(day => (
      <Typography
        style={{
          width: 150, margin: 6, textAlign: 'center', color: 'purple',
        }}
        variant="h6"
        key={day}
      >
        {day}
      </Typography>
    ))}


    {Array(cellsToRender).fill(null).map((day, i) => (<CalendarCard key={`${i}day`} cellId={i} />
    ))}
  </div>


);


export default connect()(MonthlyCalendar);

// calendarData[2018].november.days
