import { createSelector } from 'reselect';

const getActiveLogKey = state => state.root.activeLogKey;
const getJournalLogKey = state => state.root.journalLogKey;
const getLogsData = state => state.root.logsData;
export const getAllLogKeys = state => Object.keys(state.root.logsData);
const getDate = (state, { date }) => date;

const getDashboardKeys = state => Object.entries(state.root.dashboardLogs)
  .filter(logArray => logArray[1]).map(logArray => logArray[0]);


const getActiveLogData = createSelector(
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
  ) => activeLogData.data[date] && activeLogData.data[date],
);


export const getJournalEmojis = createSelector(
  getLogsData,
  getDate,
  (
    logsData,
    date,
  ) => logsData['-oQKlmrGL'].data[date] && logsData['-oQKlmrGL'].data[date],
);


export const getEmojiOptions = createSelector(
  getActiveLogData,
  activeLogData => activeLogData.emojiOptions,
);

const getJournalEmojisWithMeta = createSelector(
  getJournalEmojis,
  journalEmojis => journalEmojis
    && journalEmojis
      .map(emoji => ({
        ...emoji,
        mojiLogKey: 'journalKey',
        mojiLogLabel: 'journalLabel',
      }))
      .filter(result => !!result),
);

const getMojilogDashboardKeys = createSelector(
  getDashboardKeys,
  getJournalLogKey,
  (
    dashboardKeys,
    journalLogKey,
  ) => dashboardKeys
    .filter(dashboardKey => (dashboardKey !== journalLogKey)),
);

const showJournalLogInDashboard = createSelector(
  getDashboardKeys,
  getJournalLogKey,
  (
    dashboardKeys,
    journalLogKey,
  ) => dashboardKeys.includes(journalLogKey),
);


const getDashboardMojiLogEmojiBudle = createSelector(
  getMojilogDashboardKeys,
  getLogsData,
  (state, props) => props,
  (
    mojilogDashboardKeys,
    logsData,
    props,
  ) => mojilogDashboardKeys
    .map(logKey => logsData[logKey].data[props.date]
      && {
        ...logsData[logKey].data[props.date],
        mojiLogKey: logKey,
        mojiLogLabel: logsData[logKey].label,
      })
    .filter(result => !!result),
);

export const getFullDashboardEmojiBundle = createSelector(
  showJournalLogInDashboard,
  getDashboardMojiLogEmojiBudle,
  getJournalEmojisWithMeta,
  (
    journalLogInDashboard,
    dashboardMojiLogEmojiBudle,
    journalEmojisWithMeta,
  ) => (journalLogInDashboard
    ? dashboardMojiLogEmojiBudle
      .concat(journalEmojisWithMeta)
      .filter(result => !!result)
    : dashboardMojiLogEmojiBudle),
);
