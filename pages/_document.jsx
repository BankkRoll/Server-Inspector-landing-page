import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {

  render() {
    return (
      <Html>
        <Head>
          <link rel="apple-touch-icon" href="/logo.jpg" />
          <meta name="robots" content="index,follow" />
          <link rel="robots" href="/robots.txt" type="text/plain" />
          <meta name="googlebot" content="index,follow" />
          <meta
            name="description"
            content="Server Inspector: Powerful Discord server management and moderation bot."
          />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@bankkroll_eth" />
          <meta name="twitter:creator" content="@bankkroll_eth" />
          <meta property="og:url" content="https://serverinspector.vercel.app" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Server Inspector" />
          <link
            rel="icon"
            href="/img/logo.jpg"
            type="image/x-icon"
          />
          <meta
            property="og:description"
            content="Server Inspector: Powerful Discord server management and moderation bot."
          />
          <meta property="og:image" content="/img/logo.jpg" />
          <meta property="og:image:alt" content="Server Inspector" />
          <meta property="og:locale" content="en" />
          <meta
            property="og:site_name"
            content="Server Inspector"
          />
          <meta name="theme-color" content="#6108df" />
          <link rel="icon" href="/img/logo.jpg" type="image/x-icon" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://pro.fontawesome.com/releases/v6.0.0-beta1/css/all.css"
            rel="stylesheet"
          />
          <link rel="stylesheet" href="/css/nprogress.css" />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          <Html lang="en" />

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
