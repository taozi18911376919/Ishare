import React from 'react';
import { JssProvider } from 'react-jss';
import App from 'next/app';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';
import withRedux from 'next-redux-wrapper';
import NProgress from 'nprogress';
import Router from 'next/router';

import ngProgress from 'nprogress/nprogress.css';

import makeStore from '@Store';
import generateClassName from '@Utils/generateClassName';
import CssBaseline from '@Components/Base/CssBaseline';
import Layout from './_layout';

NProgress.configure({
  showSpinner: false,
});

Router.events.on('routeChangeStart', url => {
  // eslint-disable-next-line no-console
  console.log(`Loading: ${url}`);
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});
Router.events.on('routeChangeError', () => NProgress.done());

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
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
        <style jsx global>{ngProgress}</style>
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
