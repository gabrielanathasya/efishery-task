import * as React from "react"
import { Provider } from "overmind-react"
import { overmind } from "data/overmind"
import Head from "next/head"

import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/globals.css"
import "../src/styles/custom-table/custom-table.css"
import "../src/styles/empty-section/empty-section.css"
import "../src/styles/form/form.css"
import "../src/styles/spinner/spinner.css"

type appProps = {
  Component: any
  pageProps: any
}

const App = ({ Component, pageProps }: appProps) => {
  return (
    <Provider value={overmind}>
      <Head>
        <title>eFishery Task</title>
      </Head>
      <Component {...pageProps}></Component>
    </Provider>
  )
}

export default App
