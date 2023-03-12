import { Head, Html, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html>
      <Head>
        <div id="backdrop"></div>
        <div id="modal"></div>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
