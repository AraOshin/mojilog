import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Emoji } from 'emoji-mart';
import RootRef from '@material-ui/core/RootRef';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { chooseEmojiThunk } from '../../src/thunks';
import EmojiChoice from '../EmojiPicker/EmojiChoice';
import AddButton from '../UI/AddButton';

const styles = {
  card: {
    width: 130,
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
  emoji: state.emojiData[props.date],
  loading: state.loading[props.date],
});

class CalendarCell extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    emoji: PropTypes.array.isRequired,
    date: PropTypes.number.isRequired, // TODO unrequire
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
  };


  constructor(props) {
    super(props);


    this.state = {
      cell: {},
      showEmojiChoice: false,


    };
    this.cardRef = React.createRef();
  }

  componentDidMount() {
    const cell = this.cardRef.current.getBoundingClientRect();
    this.setState({ cell });
  }

  handleEmojiChoiceClick = () => {
    const { showEmojiChoice } = this.state;
    this.setState({ showEmojiChoice: !showEmojiChoice });
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
    const { date, dispatch } = this.props;
    const { showEmojiChoice } = this.state;
    const emojiSelection = {
      [date]: emojiChoice,
    };
    this.setState({ showEmojiChoice: !showEmojiChoice });

    dispatch(chooseEmojiThunk(emojiSelection, date));
  }

  renderCellContent = () => {
    const { emoji, loading } = this.props;
    if (!emoji) return <AddButton onClick={this.handleEmojiChoiceClick} />;

    if (!loading) return <Emoji onClick={this.handleEmojiChoiceClick} emoji={emoji} set="apple" size={48} />;
    return <CircularProgress size={20} />;
  }

  render() {
    const {
      classes,
      date,
      loading,
      emoji,
    } = this.props;
    const { showEmojiChoice } = this.state;

    console.log(loading);

    return (


      <RootRef rootRef={this.cardRef}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {date}
            </Typography>
            <CardActions>
              {this.renderCellContent()}

              {showEmojiChoice && (
                <EmojiChoice
                  style={this.getEmojiChoiceStyle()}
                  onEmojiClick={this.handleEmojiSelect}
                  onOutsideClick={this.handleEmojiChoiceClick}
                />
              )}

            </CardActions>
          </CardContent>
        </Card>
      </RootRef>

    );
  }
}


export default connect(mapStateToProps)(withStyles(styles)(CalendarCell));
