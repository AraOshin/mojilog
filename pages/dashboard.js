import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import MonthlyCalendar from '../components/MonthlyCalendar/MonthlyCalendar';
import FilterDrawer from '../components/FilterPanel/FilterDrawer';


const Dashboard = () => (
  <div style={{ marginTop: 20 }}>
    <div style={{ display: 'grid', justifyContent: 'center', width: '100%' }}>
      <Typography gutterBottom paragraph align="center" variant="h4" component="h2" color="primary">
        dashboard
      </Typography>
      <FilterDrawer />
      <MonthlyCalendar mode="dashboard" />
    </div>
  </div>
);


Dashboard.getInitialProps = async ({ store }) => {
  const dispatch = store.dispatch; // eslint-disable-line
  const res = await axios.get('https://emoji-tracker-f72cc.firebaseio.com/.json');


  dispatch({
    type: 'FETCH',
    emojiData: res.data.data,
    logsData: res.data.logs,
    calendarMode: 'dashboard',
  });
};

export default connect()(Dashboard);
