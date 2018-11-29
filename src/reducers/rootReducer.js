

const initialState = {
  loading: {},
  logsData: {},
  activeLogKey: '-oQKlmrGL',
  inJournalMode: true,
  calendarMode: null,
  dashboardLogs: {
    kWeLlAkRI: true,
    mirYAfBzu: true,
    z7vHuxqlk: true,
  },
  mojiLogsKeys: ['kWeLlAkRI', 'mirYAfBzu', 'z7vHuxqlk'],

};


const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH':
      // console.log('reducer called', action.payload);
      return {
        ...state,
        logsData: action.logsData,
        calendarMode: action.calendarMode,
      };
    case 'SET_LOADING':
      // console.log('reducer called', action.payload);
      return {
        ...state,
        loading: { ...state.loading, [action.date]: action.loading },
      };
    case 'UPDATE_CELL_EMOJI':
      // console.log('reducer called', action.payload);
      return {

        ...state,
        logsData: {
          ...state.root.logsData,
          [action.activeLogKey]: {
            ...state.root.logsData[action.activeLogKey],
            data: {
              ...state.root.logsData[action.activeLogKey].data,
              ...action.emoji,
            },
          },
        },
      };
    case 'UPDATE_LOG_DEFAULT_EMOJIS':
      console.log('reducer called', action.emojiUpdate);
      return {

        ...state,
        logsData: {
          ...state.logsData,
          [action.logKey]: {
            ...state.root.logsData[action.logKey],
            emojiOptions: [...action.emojiUpdate],
          },
        },
      };
    case 'ADMIN_FETCH':
      console.log('ADMIN FETCH reducer called', action.logsData);
      return {
        ...state,
        logsData: action.logsData,
      };
    case 'SET_ACTIVE_LOG':
      console.log('reducer called', action.selectedLogKey);

      return {
        ...state,
        activeLogKey: action.selectedLogKey,
        inJournalMode: action.journalMode,
      };
    case 'MOJILOG_DASHBOARD_TOGGLE':
      console.log('reducer called', action.selectedLogKey);

      return {
        ...state,
        dashboardLogs: {
          ...state.dashboardLogs,
          [action.logKey]: !state.dashboardLogs[action.logKey],
        },
      };


    default:
      return state;
  }
};

export default rootReducer;
