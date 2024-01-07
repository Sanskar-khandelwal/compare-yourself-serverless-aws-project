import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap"
        />
      </Head>
      <body className="font-poppins">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
