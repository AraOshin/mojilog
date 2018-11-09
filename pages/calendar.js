import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import MonthlyCalendar from '../components/MonthlyCalendar/MonthlyCalendar';


const Calendar = () => (
  <div>
    <MonthlyCalendar />

  </div>
);


Calendar.getInitialProps = async ({ store }) => {
  const dispatch = store.dispatch; // eslint-disable-line
  const res = await axios.get('https://emoji-tracker-f72cc.firebaseio.com/.json');


  dispatch({
    type: 'FETCH',
    emojiData: res.data.data,
    calendarData: res.data.calendar,
    logsData: res.data.logs,
  });
};

export default connect()(Calendar);
