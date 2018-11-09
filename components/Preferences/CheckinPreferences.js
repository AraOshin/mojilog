import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import {
  Card, CardContent, CardHeader, Typography, CardActions, TextField, Button,
} from '@material-ui/core';
import { Emoji } from 'emoji-mart';
import { connect } from 'react-redux';
import shortid from 'shortid';
import AddButton from '../UI/AddButton';
import EmojiPicker from '../EmojiPicker/EmojiPicker';


const styles = {
  card: {
    maxWidth: '600px',
    maxHeight: '800px',

  },
  media: {
    objectFit: 'cover',
  },
};


const mapStateToProps = (state, props) => ({
  logData: state.logsData[props.logKey],
  inCreateMode: !!props.inCreateMode,
});


class CreateCheckinCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEmojiPicker: false,
      checkinNameInput: '',
      toSelect: 0,
      selectedEmojis: props.inCreateMode ? [
        {},
        {},
        {},
        {},
        {},
      ] : props.logData.emojiOptions,
    };
  }


  handleEmojiPickerClick = () => {
    this.setState({ showEmojiPicker: true });
  };

  handleEmojiSelect = (emoji) => {
    const { toSelect, selectedEmojis } = this.state;
    const { logData } = this.props;

    const updatedSelectedEmojis = selectedEmojis;
    updatedSelectedEmojis[toSelect] = emoji;

    this.setState({
      // selectedEmojis: updatedSelectedEmojis,
      showEmojiPicker: false,
      toSelect: toSelect + 1,
    });
  };

  handleSubmitCheckinPreferences = () => {
    const { selectedEmojis, checkinNameInput } = this.state;
    const { logKey } = this.props;

    const newLogKey = logKey || shortid.generate();
    const postBody = {
      [newLogKey]: {
        label: checkinNameInput,
        emojiOptions: { ...selectedEmojis },
      },
    };
    axios.patch('https://emoji-tracker-f72cc.firebaseio.com/logs.json', postBody);
  };


  // handleSubmitCheckinPreferencesWithThunk = () => {
  //   const { selectedEmojis, checkinNameInput } = this.state;
  //   const { logKey, dispatch } = this.props;

  //   const newLogKey = logKey || shortid.generate();
  //   const postBody = {
  //     [newLogKey]: {
  //       label: checkinNameInput,
  //       emojiOptions: { ...selectedEmojis },
  //     },
  //   };

  //   dispatch(SubmitPreferencesThunk(postbody));
  // }


  handleInputChange = (event) => {
    this.setState({ checkinNameInput: event.target.value });
  }

  // renderCardContent = () => {
  //   inCreateMode ?

  // }


  render() {
    const {
      toSelect,
      showEmojiPicker,
      selectedEmojis,
    } = this.state;

    const { classes, logData, inCreateMode } = this.props;

    return (
      <div align="center">
        <Card className={classes.card}>
          <CardContent>
            <CardHeader> Create a new check-in for yourself! </CardHeader>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label={inCreateMode ? 'type here' : logData.label}
              type="text"
              onChange={this.handleInputChange}
            />

            {toSelect < 5 && <AddButton onClick={this.handleEmojiPickerClick} />}
            <Typography> Select up to 5 emoji options!</Typography>
            <div align="center">
              {showEmojiPicker && <EmojiPicker onEmojiSelect={this.handleEmojiSelect} />}

              {selectedEmojis[0] && <Emoji emoji={selectedEmojis[0]} set="apple" size={48} />}
              {selectedEmojis[1] && <Emoji emoji={selectedEmojis[1]} set="apple" size={48} />}
              {selectedEmojis[2] && <Emoji emoji={selectedEmojis[2]} set="apple" size={48} />}
              {selectedEmojis[3] && <Emoji emoji={selectedEmojis[3]} set="apple" size={48} />}
              {selectedEmojis[4] && <Emoji emoji={selectedEmojis[4]} set="apple" size={48} />}
              <Button color="primary">
                Cancel
              </Button>
              <Button
                color="primary"
                onClick={this.handleSubmitCheckinPreferences}
              >
                {' '}
                Submit
              </Button>

            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default connect(mapStateToProps)(withStyles(styles)(CreateCheckinCard));
