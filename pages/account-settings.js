import React, { Component } from 'react';
import AccountSettingsForm from '../components/AccountSettingsForm';


class AccountSettings extends Component {
  handleSubmit = (values) => {
    console.log(values);
  }

  render() {
    return (

      <AccountSettingsForm onSubmit={this.handleSubmit} />

    );
  }
}

export default AccountSettings;
