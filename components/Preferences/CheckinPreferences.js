import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import {
  Card, CardContent, CardHeader, Typography, TextField, Button, Tooltip,
} from '@material-ui/core';
import { Emoji } from 'emoji-mart';
import { connect } from 'react-redux';
import shortid from 'shortid';
import AddButton from '../UI/AddButton';
import EmojiPicker from '../EmojiPicker/EmojiPicker';
import { getEmojiOptions } from '../../src/selectors/selectors';


const styles = {
  card: {
    maxWidth: '600px',
    maxHeight: '800px',
    margin: 14,

  },
  media: {
    objectFit: 'cover',
  },
};


const mapStateToProps = (state, props) => ({
  logData: state.logsData[props.logKey],
  inCreateMode: !!props.inCreateMode,
  emojiOptions: state.logsData[props.logKey] ? state.logsData[props.logKey].emojiOptions : null,
});


class CreateCheckinCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEmojiPicker: false,
      checkinNameInput: '',
      toSelect: 0,
      selectedEmojis: props.emojiOptions,
    };
  }


  handleEmojiPickerClick = () => {
    this.setState({ showEmojiPicker: true });
  };

  handleEmojiSelect = (emoji) => {
    const { logData } = this.props;
    const { toSelect, selectedEmojis } = this.state;

    const updatedSelectedEmojis = selectedEmojis;
    updatedSelectedEmojis[toSelect] = emoji;

    this.setState({
      // selectedEmojis: updatedSelectedEmojis,
      showEmojiPicker: false,
      toSelect: toSelect + 1,
    });
    console.log(toSelect);
  };

  handleSubmitCheckinPreferences = () => {
    const { selectedEmojis, checkinNameInput } = this.state;
    const { logKey } = this.props;


    const newLogKey = logKey || shortid.generate();
    console.log(newLogKey);
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


  render() {
    const {
      toSelect,
      showEmojiPicker,
      selectedEmojis,
    } = this.state;

    const {
      classes,
      logData,
      inCreateMode,
      emojiOptions,
    } = this.props;

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

            {toSelect < 5
              && (
                <Tooltip title="Add">
                  <AddButton onClick={this.handleEmojiPickerClick} />
                </Tooltip>
              )
            }

            <div align="center">
              {showEmojiPicker && <EmojiPicker onEmojiSelect={this.handleEmojiSelect} />}

              {emojiOptions
                && Object.values(emojiOptions).map((emojiChoice, i) => (
                  <Emoji
                    emoji={emojiChoice.id}
                    key={emojiChoice.id + i}

                    set="apple"
                    size={48}
                  />
                ))
              }
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
