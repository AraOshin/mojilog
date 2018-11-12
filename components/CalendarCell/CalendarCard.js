import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Card, RootRef } from '@material-ui/core';
import CalendarContent from './CalendarContent';

const styles = {
  card: {
    width: 145,
    margin: 6,
    position: 'relative',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};


class CalendarCard extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    date: PropTypes.number.isRequired, // TODO unrequire
  };


  constructor(props) {
    super(props);
    this.state = {
      cell: {},
    };
    this.cardRef = React.createRef();
  }

  componentDidMount() {
    const cell = this.cardRef.current.getBoundingClientRect();
    this.setState({ cell });
  }


  render() {
    const {
      classes,
      date,
    } = this.props;

    const { cell } = this.state;


    return (


      <RootRef rootRef={this.cardRef}>
        <Card className={classes.card}>


          <CalendarContent cell={cell} date={date} />

        </Card>
      </RootRef>

    );
  }
}


export default withStyles(styles)(CalendarCard);
