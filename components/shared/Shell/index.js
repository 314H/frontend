import {Component, Fragment} from 'react'
import {withRouter} from 'next/router'
import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'
import Header from './Header'
import Footer from './Footer'
import Container, {Main} from './styles'
import {Subscription} from 'react-apollo'
import {MESSAGE_SENT} from 'graphql/messenger/subscriptions'

Router.onRouteChangeStart = () => {
  NProgress.start()
}
Router.onRouteChangeComplete = () => {
  NProgress.done()
}

Router.onRouteChangeError = () => NProgress.done()

class Layout extends Component {
  constructor(props) {
    super(props)
    this.notifications = 0
  }
  render() {
    const {authenticated, isAdmin, errorCode, renderFooter} = this.props

    return (
      <Subscription subscription={MESSAGE_SENT}>
        {({data, loading, error}) => (
          <Fragment>
            {data && this.notifications++}
            <Head>
              <link
                rel="stylesheet"
                type="text/css"
                href="/static/styles/nprogress.css"
              />
            </Head>
            <Header
              errorCode={errorCode}
              authenticated={authenticated}
              isAdmin={isAdmin}
              notifications={this.notifications}
            />
            <Container>
              <Main>{this.props.children}</Main>
              {renderFooter && <Footer />}
            </Container>
          </Fragment>
        )}
      </Subscription>
    )
  }
}

export default withRouter(Layout)
