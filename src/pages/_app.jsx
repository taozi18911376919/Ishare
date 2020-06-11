import React from 'react';
import { JssProvider } from 'react-jss';
import App from 'next/app';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';
import withRedux from 'next-redux-wrapper';

import makeStore from '@Store';
import generateClassName from '@Utils/generateClassName';
import CssBaseline from '@Componnents/Base/CssBaseline';
import Layout from './_layout';

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
