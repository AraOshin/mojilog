import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import thunk from 'redux-thunk';
import getPageContext from '../src/getPageContext';


const initialState = {
  emojiData: {},
  calendarData: {},
  checkinPreferences: {},
  loading: {},

};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH':
      // console.log('reducer called', action.payload);
      return {
        ...state,
        emojiData: action.emojiData,
        calendarData: action.emojiData,
        checkinPreferences: action.checkinPreferences,
      };
    case 'SET_LOADING':
      // console.log('reducer called', action.payload);
      return {
        ...state, loading: { ...state.loading, [action.date]: action.loading },
      };
    case 'UPDATE_CELL_EMOJI':
      // console.log('reducer called', action.payload);
      return {
        ...state, emojiData: { ...state.emojiData, ...action.emoji },
      };


    default:
      return state;
  }
};

const composeEnhancers = typeof window === 'object'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
  }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
);

const makeStore = (initialState, options) => createStore(reducer, initialState, enhancer);//eslint-disable-line


class MyApp extends App {
  constructor(props) {
    super(props);
    this.pageContext = getPageContext();
  }

  static async getInitialProps({ Component, ctx }) {
    // we can dispatch from here too
    // ctx.store.dispatch({ type: 'increment' });

    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    return { pageProps };
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Head>
          <title>My page</title>
        </Head>
        {/* Wrap every page in Jss and Theme providers */}
        <JssProvider
          registry={this.pageContext.sheetsRegistry}
          generateClassName={this.pageContext.generateClassName}
        >
          {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
          <MuiThemeProvider
            theme={this.pageContext.theme}
            sheetsManager={this.pageContext.sheetsManager}
          >
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server side. */}
            <Provider store={store}>
              <Component pageContext={this.pageContext} {...pageProps} />
            </Provider>
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    );
  }
}

export default withRedux(makeStore)(MyApp);
