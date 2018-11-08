import axios from 'axios';


export const chooseEmojiThunk = (emojiSelection, date) => async (dispatch) => {
  dispatch({ type: 'SET_LOADING', loading: true, date });

  const res = await axios.patch('https://emoji-tracker-f72cc.firebaseio.com/data.json', emojiSelection);


  dispatch({ type: 'SET_LOADING', loading: false, date });
  dispatch({ type: 'UPDATE_CELL_EMOJI', emoji: res.data });
};
