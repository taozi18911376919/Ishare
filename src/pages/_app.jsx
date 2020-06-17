import React from 'react';
import { JssProvider } from 'react-jss';
import App from 'next/app';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';
import withRedux from 'next-redux-wrapper';
import NProgress from 'nprogress';
import Router from 'next/router';
import { parseCookies } from 'nookies';

import AccountAction from '@Actions/account';
import makeStore from '@Store';
import generateClassName from '@Utils/generateClassName';
import CssBaseline from '@Components/Base/CssBaseline';
import Layout from './_layout';

NProgress.configure({
  showSpinner: false,
});

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});
Router.events.on('routeChangeError', () => NProgress.done());

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const { token } = parseCookies(ctx);
    const state = ctx.store.getState();
    if (token && !state.getIn(['account', 'user', 'name'])) {
      await ctx.store.dispatch(AccountAction.fetchUserData({
        type: 'TOPIC',
        page: 1,
        page_size: 1,
      }, {
        Authorization: `Bearer ${token}`,
      }));
    }
    return {
      pageProps: {
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
        store: ctx.store,
      },
    };
  }

  componentDidMount() {
    const ssStyles = global.document.getElementById('server-side-styles');
    if (ssStyles && ssStyles.parentNode) {
      ssStyles.parentNode.removeChild(ssStyles);
    }
  }

  render() {
    const {
      Component,
      pageProps,
      store,
    } = this.props;

    return (
      <JssProvider generateId={generateClassName}>
        <Provider store={store}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </JssProvider>
    );
  }
}

export default withRedux(makeStore, {
  serializeState: state => state.toJS(),
  deserializeState: state => fromJS(state),
})(MyApp);
