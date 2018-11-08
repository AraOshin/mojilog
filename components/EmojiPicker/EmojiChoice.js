/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Emoji } from 'emoji-mart';
import { connect } from 'react-redux';
import OutsideClickHandler from 'react-outside-click-handler';


const styles = {
  card: {
    width: 180,
    margin: 6,
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
const mapStateToProps = state => ({
  emojiOptions: state.checkinPreferences.moods,
});

class EmojiChoice extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    emojiOptions: PropTypes.object.isRequired,
    onEmojiClick: PropTypes.func.isRequired,
    onOutsideClick: PropTypes.func.isRequired,
    style: PropTypes.object.isRequired,

  };

  render() {
    const {
      classes,
      emojiOptions,
      onEmojiClick,
      onOutsideClick,
      style,
    } = this.props;


    return (
      <OutsideClickHandler
        onOutsideClick={onOutsideClick}
      >
        <Card className={classes.card} style={style}>
          <CardContent align="center">
            {Object.values(emojiOptions).map(emojiChoice => <Emoji onClick={() => onEmojiClick(emojiChoice)} emoji={emojiChoice.id} set="apple" size={48} />)
            }
          </CardContent>
        </Card>
      </OutsideClickHandler>
    );
  }
}

export default connect(mapStateToProps)(withStyles(styles)(EmojiChoice));
