import { createSelector } from 'reselect';

export const getActiveLogKey = state => state.root.activeLogKey;
export const getLogsData = state => state.root.logsData;
export const getDate = (state, { date }) => date;


export const getDashboardKeys = state => Object.entries(state.root.dashboardLogs).filter(logArray => logArray[1]).map(logArray => logArray[0]);

export const getActiveLogData = createSelector(
  getLogsData,
  getActiveLogKey,
  (
    logsData,
    activeLogKey,
  ) => logsData[activeLogKey],
);

export const getActiveEmojiData = createSelector(
  getActiveLogData,
  getDate,
  (
    activeLogData,
    date,
  ) => activeLogData.data && activeLogData.data[date],
);


export const getJournalEmojis = createSelector(
  getLogsData,
  getDate,
  (
    logsData,
    date,
  ) => logsData['-oQKlmrGL'].data && logsData['-oQKlmrGL'].data[date],
);


export const getEmojiOptions = createSelector(
  getActiveLogData,
  activeLogData => activeLogData.emojiOptions,
);


export const getJournalEmojisWithMeta = (state, props) => getJournalEmojis(state, props)
  && getJournalEmojis(state, props).map(emoji => ({
    ...emoji,
    mojiLogKey: 'journalKey',
    mojiLogLabel: 'journalLabel',
  })).filter(result => !!result);


export const getDashboardEmojiBudle = (state, props) => getDashboardKeys(state).map(logKey => state.root.logsData[logKey].data[props.date]
  && {
    ...state.root.logsData[logKey].data[props.date],
    mojiLogKey: logKey,
    mojiLogLabel: state.root.logsData[logKey].label,
  })
  .concat(getJournalEmojisWithMeta(state, props))
  .filter(result => !!result);