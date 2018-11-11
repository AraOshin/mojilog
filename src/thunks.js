import axios from 'axios';
import { getJournalEmojis } from './selectors/selectors';


export const chooseEmojiThunk = (emojiChoice, date, activeLogKey, journalEmojiClickedIndex) => async (dispatch, getState) => {
  const state = getState();

  const { inJournalMode } = state;
  const journalEmojis = getJournalEmojis(state, { date });


  // const updatedjournalEmojis = [...journalEmojis];
  // if (journalEmojiClickedIndex) updatedjournalEmojis[journalEmojiClickedIndex] = emojiChoice;

  const journalEmojiChoice = (inJournalMode && journalEmojis)
    ? journalEmojis.concat(emojiChoice)
    : [emojiChoice];

  // const journalChoiceToUse = journalEmojiClickedIndex ? updatedjournalEmojis : journalEmojiChoice;

  const emojiSelection = {
    [date]:
      inJournalMode
        ? journalEmojiChoice
        : emojiChoice,
  };
  // debugger;
  console.log('thunk called');

  dispatch({ type: 'SET_LOADING', loading: true, date });

  const res = await axios.patch(`https://emoji-tracker-f72cc.firebaseio.com/logs/${activeLogKey}/data.json`, emojiSelection);


  dispatch({ type: 'SET_LOADING', loading: false, date });
  dispatch({ type: 'UPDATE_CELL_EMOJI', emoji: res.data, activeLogKey });
};


export const switchActiveMojilog = logKey => (dispatch) => {
  logKey === '-oQKlmrGL' ? dispatch({ type: 'SET_ACTIVE_LOG', selectedLogKey: logKey, journalMode: true })
    : dispatch({ type: 'SET_ACTIVE_LOG', selectedLogKey: logKey, journalMode: false });
};
