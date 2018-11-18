export const getEmoji = (state, props) => state.logsData[state.activeLogKey].data
  && state.logsData[state.activeLogKey].data[props.date];

export const getJournalEmojis = (state, props) => state.logsData['-oQKlmrGL'].data && state.logsData['-oQKlmrGL'].data[props.date];

export const getEmojiOptions = state => state.logsData[state.activeLogKey].emojiOptions;


export const getDashboardKeys = state => Object.entries(state.dashboardLogs).filter(logArray => logArray[1]).map(logArray => logArray[0]);
