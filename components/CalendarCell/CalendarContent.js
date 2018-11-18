import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Button } from '@material-ui/core/';
import { Emoji } from 'emoji-mart';
import { connect } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import moment from 'moment';
// import NoteAdd from '@material-ui/icons/NoteAdd';
import { chooseEmojiThunk } from '../../src/thunks';
import AddButton from '../UI/AddButton';
import EmojiChoice from '../EmojiPicker/EmojiChoice';
import EmojiPicker from '../EmojiPicker/EmojiPicker';
import { getEmoji, getJournalEmojis } from '../../src/selectors/selectors';

const mapStateToProps = (state, props) => ({
  activeLogKey: state.activeLogKey,
  emoji: getEmoji(state, props),
  journalEmojis: getJournalEmojis(state, props),
  loading: state.loading[props.monthDay + 1],
  inJournalMode: state.inJournalMode,
  cell: props.cell,
});

class CalendarContent extends Component {
  static propTypes = {
    // emoji: PropTypes.array.isRequired,
    dispatch: PropTypes.func,
    loading: PropTypes.bool,
    cell: PropTypes.object.isRequired,
  };


  constructor(props) {
    super(props);


    this.state = {
      showEmojiChoice: false,
      journalEmojiClickedIndex: null,


    };
  }


  handleEmojiChoiceClick = (i) => {
    const { showEmojiChoice } = this.state;
    this.setState({ showEmojiChoice: !showEmojiChoice, journalEmojiClickedIndex: i });
  };


  getEmojiChoiceStyle = () => {
    const { cell } = this.props;

    return {
      position: 'fixed',
      top: cell.top + 42,
      left: cell.left - 45,
      zIndex: 2,
    };
  }

  handleEmojiSelect = (emojiChoice) => {
    const {
      date,
      dispatch,
      activeLogKey,
      inJournalMode,
      journalEmojis,
    } = this.props;

    const { showEmojiChoice, journalEmojiClickedIndex } = this.state;

    this.setState({ showEmojiChoice: !showEmojiChoice });

    dispatch(chooseEmojiThunk(emojiChoice, date, activeLogKey, journalEmojiClickedIndex));
    console.log(journalEmojiClickedIndex);
  }


  renderCellContent = () => {
    const {
      emoji,
      loading,
      inJournalMode,
      journalEmojis,
      cellId,
      activeInMonth,
    } = this.props;

    const startOfMonthDay = moment().startOf('month').day();

    if (!activeInMonth) return <Emoji emoji="apple" set="apple" size={48} />;


    if (!emoji || (!journalEmojis && inJournalMode)) return <AddButton onClick={() => this.handleEmojiChoiceClick(null)} />;

    if (!loading) {
      if (!inJournalMode) {
        return<Emoji onClick={this.handleEmojiChoiceClick} emoji={emoji} set="apple" size={48} />;
      }
      return (
        <div style={{
          display: 'flex', justifyContent: 'center', flexWrap: 'wrap',
        }}
        >
          {journalEmojis.map((journalEmoji, i) => <Emoji onClick={() => this.handleEmojiChoiceClick(i)} emoji={journalEmoji} set="apple" size={34} />)}

          {!journalEmojis[5] && (
            <Button onClick={() => this.handleEmojiChoiceClick(null)} mini color="primary" aria-label="Add">
              <AddIcon />
            </Button>
          )}


        </div>

      );
    }


    return <CircularProgress size={20} />;
  }

  render() {
    const {
      inJournalMode,
      journalEmojis,
      key,
    } = this.props;
    const { showEmojiChoice } = this.state;

    console.log(key);

    return (

      <div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {this.renderCellContent()}
        </div>


        {
          showEmojiChoice && (inJournalMode
            ? (
              <EmojiPicker
                style={this.getEmojiChoiceStyle()}
                onOutsideClick={this.handleEmojiChoiceClick}
                onEmojiSelect={this.handleEmojiSelect}
              />
            )
            : (
              <EmojiChoice
                style={this.getEmojiChoiceStyle()}
                onEmojiClick={this.handleEmojiSelect}
                onOutsideClick={this.handleEmojiChoiceClick}
              />
            )
          )
        }

      </div>


    );
  }
}


export default connect(mapStateToProps)(CalendarContent);
