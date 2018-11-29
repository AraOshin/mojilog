import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import {
  Card, CardContent, CardHeader, TextField, Button,
} from '@material-ui/core';
import { Emoji } from 'emoji-mart';
import { connect } from 'react-redux';
import shortid from 'shortid';
import Tooltip from '@material-ui/core/Tooltip';
import AddButton from '../UI/AddButton';
import EmojiPicker from '../EmojiPicker/EmojiPicker';
// import { getEmojiOptions } from '../../src/selectors/selectors';
import { chooseDefaultEmojiThunk } from '../../src/thunks';


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
  logData: state.root.root.logsData[props.logKey],
  emojiOptions: (!props.inCreateMode && state.root.root.logsData[props.logKey])
    ? state.root.root.logsData[props.logKey].emojiOptions : null,
});


class CreateCheckinCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEmojiPicker: false,
      checkinNameInput: '',
      emojiClickedIndex: null,
      newEmojiOptions: {}, // TODO for refactor
    };
  }


  handleEmojiPickerClick = (i) => {
    const { showEmojiPicker } = this.state;

    this.setState({ showEmojiPicker: !showEmojiPicker, emojiClickedIndex: i });
  };

  handleDefaultEmojiSelect = (emojiChoice) => {
    const {
      dispatch,
      logKey,
      emojiOptions,
      inCreateMode,
    } = this.props;

    const { emojiClickedIndex } = this.state;

    this.setState({ showEmojiPicker: false });


    dispatch(chooseDefaultEmojiThunk(emojiChoice, logKey, emojiClickedIndex, emojiOptions));
  }

  // TODO FIX
  handleSubmitCheckinPreferences = () => {
    const { emojiOptions, inCreateMode } = this.props;
    const { checkinNameInput } = this.state;
    const { logKey } = this.props;

    const newLogKey = inCreateMode ? shortid.generate() : logKey;
    console.log(newLogKey);
    const postBody = {
      [newLogKey]: {
        label: checkinNameInput,
        emojiOptions: inCreateMode
          ? [] : emojiOptions,
      },
    };

    const res = axios.patch('https://emoji-tracker-f72cc.firebaseio.com/logs.json', postBody);
    console.log(checkinNameInput);
    console.log(res.data);
  };


  handleInputChange = (event) => {
    this.setState({ checkinNameInput: event.target.value });
  }


  render() {
    const {
      toSelect,
      showEmojiPicker,
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


            <Tooltip title="select up to five emoji options">
              <div>
                {(inCreateMode || (emojiOptions && emojiOptions.length < 5))
                  && (
                    <AddButton onClick={() => this.handleEmojiPickerClick(null)} />
                  )
                }
              </div>
            </Tooltip>


            <div align="center">
              {showEmojiPicker && (
                <EmojiPicker
                  onEmojiSelect={this.handleDefaultEmojiSelect}
                />
              )}

              {emojiOptions
                && Object.values(emojiOptions).map((emojiChoice, i) => (
                  <Emoji
                    onClick={() => this.handleEmojiPickerClick(i)}
                    emoji={emojiChoice.id}
                    key={emojiChoice.id + i}

                    set="apple"
                    size={48}
                  />
                ))
              }

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
