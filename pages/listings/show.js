import { Component } from 'react'
import MediaQuery from 'react-responsive'
import Head from 'next/head'
import Router from 'next/router'
import 'isomorphic-unfetch'
import { Form, Text } from 'react-form'

import { mainListingImage } from '../../utils/image_url'
import { isAuthenticated } from "../../lib/auth"
import { getListing } from '../../services/listing-api'

import Layout from '../../components/main-layout'
import ListingHeader from '../../components/listings/listing/header'
import ListingMainContent from '../../components/listings/listing/main-content'
import ListingFooter from '../../components/listings/listing/listing-footer'
import MapContainer from "../../components/map-container"
import Popup from "../../components/popup"

class Listing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      phone: '',
      showPopup: false,
      showPostSuccessPopup: false
    }
  }

  static async getInitialProps(context) {
    const { id } = context.query

    const res = await getListing(id)

    if (res.data.errors) {
      this.setState({errors: res.data.errors})
      return {}
    }

    if (!res.data) {
      return res
    }

    return {
      listing: res.data.listing,
      authenticated: isAuthenticated(context)
    }
  }

  openPopup = () => {
    this.setState({showPopup: true})
  }

  closePopup = () => {
    this.setState({showPopup: false})
  }

  closeSuccessPostPopup = () => {
    this.setState({showPostSuccessPopup: false})
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  onSubmit = (e) => {
    e.preventDefault()

    const { id } = this.props.listing
    const { name, email, phone } = this.state

    return fetch(process.env.REACT_APP_API_URL + 'listings_users', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          name: name,
          email: email,
          phone: phone
        },
        listing: {
          id: id
        }
      })
    }).then(response => response.json())
    .then(response => { this.setState({ showPopup: false, showPostSuccessPopup: true }) })
  }

  render() {
    const { authenticated, listing } = this.props
    const { showPopup, showPostSuccessPopup, name, email, phone } = this.state
    const seoImgSrc = mainListingImage(listing.images)

    return (
      <Layout authenticated={authenticated}>
        <Head>
          <title>
            À venda: Apartamento - {listing.address.street} - {listing.address.neighborhood}, {listing.address.city} | EmCasa
          </title>
          <meta name="description" content={listing.description}/>
          <meta property="og:description" content={listing.description}/>
          <meta property="og:image" content={seoImgSrc}/>
        </Head>

        <div className="listing">
          <ListingHeader listing={listing} handleOpenPopup={this.openPopup} authenticated={authenticated}/>
          <ListingMainContent listing={listing}/>

          <MediaQuery query="(max-width: 600px)">
            <MapContainer lat={listing.address.lat}
              lng={listing.address.lng}
              width='100vw'
              height='300px'/>
          </MediaQuery>

          <MediaQuery query="(min-width: 601px)">
            <MapContainer lat={listing.address.lat}
              lng={listing.address.lng}
              width='786.66667px'
              height='500px'/>
          </MediaQuery>

          <ListingFooter />

          {showPopup &&
            <Popup handleClose={this.closePopup}>
              <h1>Marcar Visita</h1>
              <p>Insira seu nome, email e telefone com DDD e<br/>entraremos em contato em minutos.</p>

              <form onSubmit={this.onSubmit}>
                <input type="text" name="name" placeholder="Name" value={name} onChange={this.onChange} />
                <input type="text" name="email" placeholder="Email" value={email} onChange={this.onChange} />
                <input type="text" name="phone" placeholder="Telefone" value={phone} onChange={this.onChange} />
                <button type="submit">Enviar</button>
              </form>

            </Popup>
          }

        {showPostSuccessPopup &&
          <Popup handleClose={this.closeSuccessPostPopup}>
            <h1>Agente EmCasa Notificado</h1>
            <p>Entraremos em contato o mais rápido possível para agendarmos uma visita!</p>
            <button onClick={this.closeSuccessPostPopup}>Fechar</button>
          </Popup>
        }
        </div>

        <style jsx>{`
          .listing {
            margin: 0 auto;
            max-width: 100vw;
            width: 1180px;
          }

          input[type=text] {
            border: 1px solid #ccc;
            border-radius: 4px;
            clear: both;
            display: block;
            font-size: 14px;
            max-width: calc(100% - 20px);
            margin: 0 auto 10px;
            padding: 10px;
            width: 350px;
          }

        `}</style>

      </Layout>
    )
  }
}

export default Listing