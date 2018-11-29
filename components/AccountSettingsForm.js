import React, { Component } from 'react';
import {
  Card, CardContent, Button,
} from '@material-ui/core';
import { reduxForm, Field } from 'redux-form';

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.age) {
    errors.age = 'Required';
  } else if (isNaN(Number(values.age))) {
    errors.age = 'Must be a number';
  } else if (Number(values.age) < 18) {
    errors.age = 'Sorry, you must be at least 18 years old';
  }
  return errors;
};

const SpecialInput = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => (
    <div>
      <label>{label}</label>
      <div>
        <input style={{ border: error ? 'solid 3px red' : 'solid 3px green' }} {...input} placeholder={label} type={type} />
        {touched
          && ((error && <span>{error}</span>)
            || (warning && <span>{warning}</span>))}
      </div>
    </div>
  );


const formObject = {
  form: 'accountSettings',
  validate,
  initialValues: {
    userName: '',
    emojiSet: '',
    age: '',
  },
};

const AccountSettings = props => (

  <form onSubmit={props.handleSubmit}>
    <div>
      <label>UserName</label>
      <Field name="userName" component="input" type="text" />
    </div>
    <div>
      <label>Emoji Set</label>
      <Field name="emojiSet" component="input" type="text" />
    </div>
    <div>
      <label>Age</label>
      {console.log(props)}
      <Field name="age" component={SpecialInput} type="number" />
    </div>
    <button type="submit" disabled={!props.valid}>Submit</button>
  </form>


);


export default reduxForm(formObject)(AccountSettings);
