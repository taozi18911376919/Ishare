import React from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';
import {
  SheetsRegistry,
  JssProvider,
} from 'react-jss';

import generateClassName from '@Utils/generateClassName';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage;
    const registry = new SheetsRegistry();
    ctx.renderPage = () => originalRenderPage({
      enhanceApp: App => props => (
        <JssProvider
          registry={registry}
          generateId={generateClassName}
        >
          <App {...props} />
        </JssProvider>
      ),
      enhanceComponent: Component => Component,
    });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      registry,
    };
  }

  render() {
    const { registry } = this.props;

    return (
      <Html>
        <Head>
          <meta httpEquiv='content-type' content='text/html; charset=utf-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        </Head>
        <body>
          <style
            id='server-side-styles'
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: registry.toString(),
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
