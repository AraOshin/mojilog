export const getEmoji = (state, props) => state.logsData[state.activeLogKey].data
  && state.logsData[state.activeLogKey].data[props.date];

export const getJournalEmojis = (state, props) => state.logsData['-oQKlmrGL'].data[props.date] && Object.values(state.logsData['-oQKlmrGL'].data[props.date]);