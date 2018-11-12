import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import CheckinPreferences from '../components/Preferences/CheckinPreferences';


const mapStateToProps = state => ({
  logKeys: Object.keys(state.logsData),
});


const Admin = ({ logKeys }) => (
  <div align="center">
    {logKeys.map(logKey => <CheckinPreferences logKey={logKey} />)}
    <CheckinPreferences inCreateMode />
  </div>

);


Admin.getInitialProps = async ({ store }) => {
  const dispatch = store.dispatch; // eslint-disable-line
  const res = await axios.get('https://emoji-tracker-f72cc.firebaseio.com/logs.json');


  dispatch({
    type: 'ADMIN_FETCH',
    logsData: res.data,
  });
};
export default connect(mapStateToProps)(Admin);
