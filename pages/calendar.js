import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import MonthlyCalendar from '../components/MonthlyCalendar/MonthlyCalendar';
import LogsMenu from '../components/UI/LogsMenu';

const mapStateToProps = state => ({
    activeLogLabel: state.root.logsData[state.root.activeLogKey].label,
});


const Calendar = ({ activeLogLabel }) => (
    <div style={{ marginTop: 20 }}>
        <div style={{ display: 'grid', justifyContent: 'center', width: '100%' }}>

            <Typography gutterBottom paragraph align="center" variant="h4" component="h2" color="primary">
                {activeLogLabel}
            </Typography>
            <LogsMenu />

            <MonthlyCalendar />


        </div>
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
        calendarMode: 'mojilog',
    });
};

export default connect(mapStateToProps)(Calendar);
