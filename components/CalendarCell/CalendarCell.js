import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Emoji } from 'emoji-mart';
import RootRef from '@material-ui/core/RootRef';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { chooseEmojiThunk } from '../../src/thunks';
import AddButton from '../UI/AddButton';
import EmojiChoice from '../EmojiPicker/EmojiChoice';
import EmojiPicker from '../EmojiPicker/EmojiPicker';
import { getEmoji, getJournalEmojis } from '../../src/selectors/selectors';


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

const mapStateToProps = (state, props) => ({
  activeLogKey: state.activeLogKey,
  emoji: getEmoji(state, props),
  journalEmojis: getJournalEmojis(state, props),
  loading: state.loading[props.date],
  inJournalMode: state.inJournalMode,
});

class CalendarCell extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    // emoji: PropTypes.array.isRequired,
    date: PropTypes.number.isRequired, // TODO unrequire
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
  };


  constructor(props) {
    super(props);


    this.state = {
      cell: {},
      showEmojiChoice: false,
      journalEmojiClickedIndex: null,

    };
    this.cardRef = React.createRef();
  }

  componentDidMount() {
    const cell = this.cardRef.current.getBoundingClientRect();
    this.setState({ cell });
  }

  handleEmojiChoiceClick = (i) => {
    const { showEmojiChoice } = this.state;
    this.setState({ showEmojiChoice: !showEmojiChoice, journalEmojiClickedIndex: i });
  };


  getEmojiChoiceStyle = () => {
    const { cell } = this.state;

    return {
      position: 'fixed',
      top: cell.top + 42,
      left: cell.left - 30,
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
  }


  renderCellContent = () => {
    const {
      emoji,
      loading,
      inJournalMode,
      journalEmojis,
    } = this.props;


    if (!emoji || (!journalEmojis && inJournalMode)) return <AddButton onClick={this.handleEmojiChoiceClick} />;

    if (!loading) {
      if (!inJournalMode) return <Emoji onClick={this.handleEmojiChoiceClick} emoji={emoji} set="apple" size={48} />;
      return (
        <div style={{
          display: 'flex', justifyContent: 'center', flexWrap: 'wrap',
        }}
        >
          {journalEmojis.map((journalEmoji, i) => <Emoji onClick={() => this.handleEmojiChoiceClick(i)} emoji={journalEmoji} set="apple" size={32} />)}

          <Button onClick={() => this.handleEmojiChoiceClick(null)} mini color="primary" aria-label="Add">
            <AddIcon />
          </Button>


        </div>

      );
    }


    return <CircularProgress size={20} />;
  }

  render() {
    const {
      classes,
      date,
      inJournalMode,
      journalEmojis,
    } = this.props;
    const { showEmojiChoice } = this.state;


    return (


      <RootRef rootRef={this.cardRef}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {date}
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {this.renderCellContent()}
            </div>


            {showEmojiChoice && (inJournalMode
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
            )}

          </CardContent>
        </Card>
      </RootRef>

    );
  }
}


export default connect(mapStateToProps)(withStyles(styles)(CalendarCell));
