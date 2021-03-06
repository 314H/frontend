import {Component, Fragment} from 'react'
import Link from 'next/link'
import Form from 'components/shared/Common/Form'
import Errors from 'components/shared/Common/Errors'
import EmCasaButton from 'components/shared/Common/Buttons'
import {getCookie, removeCookie} from 'lib/session'
import {signUp, redirectIfAuthenticated} from 'lib/auth'
import isArray from 'lodash/isArray'
import flattenDeep from 'lodash/flattenDeep'

export default class Signup extends Component {
  state = {
    errors: [],
    loading: false,
    data: {}
  }

  static getInitialProps(ctx) {
    if (redirectIfAuthenticated(ctx)) {
      return {}
    } else {
      const success = getCookie('success', ctx.req)

      if (success) {
        removeCookie('success')
      }
      return {
        success,
        renderFooter: false
      }
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    this.setState({errors: [], loading: true})
    const {url} = this.props

    const name = e.target.elements.name.value
    const email = e.target.elements.email.value
    const password = e.target.elements.password.value
    const phone = e.target.elements.phone.value
    try {
      let data = await signUp(name, email, password, url, phone)
      window.dataLayer.push({
        action: 'User Signed up',
        userId: data.id,
        event: 'user_signed_up'
      })
      this.setState({data})
    } catch (e) {
      const errors = isArray(e)
        ? e
        : [e.data ? flattenDeep(Object.values(e.data.errors)) : e]
      this.setState({errors, loading: false})
    }
  }

  render() {
    const {errors, loading, data} = this.state
    const {url} = this.props

    return (
      <Fragment>
        <Form onSubmit={this.handleSubmit}>
          {data.name ? (
            <Fragment>
              <p>Enviamos um e-mail para você confirmar seu cadastro.</p>
            </Fragment>
          ) : (
            <Fragment>
              <h1>Conecte-se com um agente</h1>
              <input type="text" placeholder="Nome" name="name" />
              <input type="email" placeholder="Email" name="email" />
              <input type="text" placeholder="Telefone" name="phone" />
              <input type="password" placeholder="Senha" name="password" />
              <EmCasaButton disabled={loading} full type="submit">
                {loading ? 'Aguarde...' : 'Enviar'}
              </EmCasaButton>
              <Errors errors={errors} />
              <p>
                {'Já tem cadastro? '}
                <Link
                  href={{
                    pathname: '/auth/login',
                    query: url.query && url.query.r ? {r: url.query.r} : {}
                  }}
                  as={{
                    pathname: '/login'
                  }}
                >
                  <a>Faça login</a>
                </Link>
              </p>
            </Fragment>
          )}
        </Form>
      </Fragment>
    )
  }
}
