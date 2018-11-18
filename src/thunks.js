import axios from 'axios';
import { getJournalEmojis } from './selectors/selectors';


export const chooseEmojiThunk = (
  emojiChoice,
  date,
  activeLogKey,
  journalEmojiClickedIndex,
) => async (dispatch, getState) => {
  const state = getState();
  const { inJournalMode } = state;
  const journalEmojis = getJournalEmojis(state, { date });

  const updatedjournalEmojis = journalEmojis ? [...journalEmojis] : [];
  if (journalEmojiClickedIndex != null) updatedjournalEmojis[journalEmojiClickedIndex] = emojiChoice;

  const journalEmojiChoice = (inJournalMode && journalEmojis)
    ? journalEmojis.concat(emojiChoice)
    : [emojiChoice];


  const journalChoiceToUse = journalEmojiClickedIndex != null ? updatedjournalEmojis : journalEmojiChoice;

  const emojiSelection = {
    [date]:
      inJournalMode
        ? journalChoiceToUse
        : emojiChoice,
  };

  dispatch({ type: 'SET_LOADING', loading: true, date });

  const res = await axios.patch(`https://emoji-tracker-f72cc.firebaseio.com/logs/${activeLogKey}/data.json`, emojiSelection);
  console.log(res.data);


  dispatch({ type: 'SET_LOADING', loading: false, date });
  dispatch({ type: 'UPDATE_CELL_EMOJI', emoji: res.data, activeLogKey });
};


export const switchActiveMojilog = logKey => (dispatch) => {
  logKey === '-oQKlmrGL' ? dispatch({ type: 'SET_ACTIVE_LOG', selectedLogKey: logKey, journalMode: true })
    : dispatch({ type: 'SET_ACTIVE_LOG', selectedLogKey: logKey, journalMode: false });
};


export const chooseDefaultEmojiThunk = (emojiChoice, logKey, emojiClickedIndex, emojiOptions) => async (dispatch) => {
  debugger;
  const updatedDefaultEmojis = emojiOptions != null ? [...emojiOptions] : null;
  if (emojiClickedIndex != null) updatedDefaultEmojis[emojiClickedIndex] = emojiChoice;

  const defaultlEmojiChoice = emojiOptions
    ? emojiOptions.concat(emojiChoice)
    : [emojiChoice];


  const defaultlChoiceToUse = emojiClickedIndex != null ? { ...updatedDefaultEmojis } : { ...defaultlEmojiChoice };

  // const postBody = {
  //   [logKey]: {
  //     label: 'Feelings',
  //     emojiOptions: { ...defaultlEmojiChoice },
  //   },
  // };


  // const res = await axios.patch('https://emoji-tracker-f72cc.firebaseio.com/logs.json', postBody);


  const res = await axios.patch(`https://emoji-tracker-f72cc.firebaseio.com/logs/${logKey}/emojiOptions.json`, defaultlChoiceToUse);

  console.log(res.data);


  dispatch({ type: 'UPDATE_LOG_DEFAULT_EMOJIS', emojiUpdate: Object.values(res.data), logKey });
};
