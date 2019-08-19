import App, { Container } from 'next/app'
import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import withApolloClient from '../lib/withApolloClient'

class MyApp extends App {
  render () {
    const { Component, pageProps, apolloClient } = this.props
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApolloClient(MyApp)