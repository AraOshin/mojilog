import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import {
  Card, CardContent, CardHeader, Typography, CardActions, TextField, Button,
} from '@material-ui/core';
import { Emoji } from 'emoji-mart';
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


class CreateCheckinCard extends Component {
  state = {
    showEmojiPicker: false,
    checkinNameInput: '',
    toSelect: 0,
    selectedEmojis: [
      {},
      {},
      {},
      {},
      {},
    ],

  };


  handleEmojiPickerClick = () => {
    this.setState({ showEmojiPicker: true });
  };

  handleEmojiSelect = (emoji) => {
    const { toSelect, selectedEmojis } = this.state;
    const updatedSelectedEmojis = selectedEmojis;
    updatedSelectedEmojis[toSelect] = emoji;

    this.setState({
      selectedEmojis: updatedSelectedEmojis,
      showEmojiPicker: false,
      toSelect: toSelect + 1,
    });
  };

  handleSubmitCheckinPreferences = () => {
    const { selectedEmojis, checkinNameInput } = this.state;
    const postBody = { [checkinNameInput]: selectedEmojis };
    axios.patch('https://emoji-tracker-f72cc.firebaseio.com/checkinPreferences.json', postBody);
  };

  handleInputChange = (event) => {
    this.setState({ checkinNameInput: event.target.value });
  }


  render() {
    const {
      toSelect,
      showEmojiPicker,
      selectedEmojis,
    } = this.state;

    return (
      <div align="center">
        <Card>
          <CardContent>
            <CardHeader> Create a new check-in for yourself! </CardHeader>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Check-in Name"
              type="text"
              onChange={this.handleInputChange}
            />

            {toSelect < 5 && <AddButton onClick={this.handleEmojiPickerClick} />}

            <Typography> Select up to 5 emoji options!</Typography>
            <div align="center">
              <CardActions>
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
                  Create
                </Button>
              </CardActions>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(CreateCheckinCard);
