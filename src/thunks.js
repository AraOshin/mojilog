import axios from 'axios';


export const chooseEmojiThunk = (emojiSelection, date, activeLogKey) => async (dispatch) => {
  dispatch({ type: 'SET_LOADING', loading: true, date });

  const res = await axios.patch(`https://emoji-tracker-f72cc.firebaseio.com/logs/${activeLogKey}/data.json`, emojiSelection);


  dispatch({ type: 'SET_LOADING', loading: false, date });
  dispatch({ type: 'UPDATE_CELL_EMOJI', emoji: res.data, activeLogKey });
};


export const switchActiveMojilog = logKey => (dispatch) => {
  logKey === '-oQKlmrGL' ? dispatch({ type: 'SET_ACTIVE_LOG', selectedLogKey: logKey, journalMode: true })
    : dispatch({ type: 'SET_ACTIVE_LOG', selectedLogKey: logKey, journalMode: false });
};
