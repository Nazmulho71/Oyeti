import Document, { Html, Head, Main, NextScript } from "next/document";
// import { _backgroundFetch } from '../lib/helpers/background'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
          />
          <meta httpEquiv="Cache-control" content="no-cache"></meta>
          <meta name="description" content="Description" />
          <meta name="keywords" content="Keywords" />
          <title>Oyeti</title>
          <meta name="viewport" content="viewport-fit=cover" />
          {/* <link rel="manifest" href="/manifest.json" /> */}
          <link
            href="/icons/favicon/icon-16x16.png"
            rel="icon"
            type="image/png"
            sizes="16x16"
          />
          <link
            href="/icons/favicon/icon-32x32.png"
            rel="icon"
            type="image/png"
            sizes="32x32"
          />
          <link
            rel="apple-touch-icon"
            href="/icons/favicon/apple-icon.png"
          ></link>
          {/* <meta name="theme-color" content="#ffffff" /> */}

          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6"
            crossOrigin="anonymous"
          />

          <script
            defer
            src="https://kit.fontawesome.com/7412a37a4c.js"
            crossOrigin="anonymous"
          ></script>

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
            rel="stylesheet"
          />
          <link href="/assets/fonts/Overpass-Regular.ttf" rel="stylesheet" />
          <link
            href="/assets/fonts/Roboto/Roboto-Regular.ttf"
            rel="stylesheet"
          />

          <link
            rel="stylesheet"
            href="https://use.typekit.net/ses5krv.css"
          ></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
