import { Component } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import 'isomorphic-unfetch'

import { mainListingImage } from '../../utils/image_url'
import { isAuthenticated, isAdmin, getCurrentUserId } from '../../lib/auth'
import { getListings } from '../../services/listing-api'
import { getNeighborhoods } from '../../services/neighborhood-api'
import Layout from '../../components/main-layout'
import MapContainer from '../../components/map-container'
import Listing from '../../components/listings/index/listing'
import Filter from '../../components/listings/index/filter'

import { mobileMedia } from '../../constants/media'

export default class MyPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lockGoogleMap: false
    }
  }

  static async getInitialProps(context) {
    const res = await getListings(context.query)

    if (res.data.errors) {
      this.setState({errors: res.data.errors})
      return {}
    }

    if (!res.data) {
      return res
    }

    const neighborhoodResponse = await getNeighborhoods()

    if (neighborhoodResponse.data.errors) {
      this.setState({errors: neighborhoodResponse.data.errors})
      return {}
    }

    if (!neighborhoodResponse.data) {
      this.setState({errors: 'Unknown error. Please try again.'})
      return {}
    }

    return {
      listings: res.data.listings,
      currentUser: {
        id: getCurrentUserId(context),
        admin: isAdmin(context),
        authenticated: isAuthenticated(context)
      },
      neighborhoods: neighborhoodResponse.data.neighborhoods,
      query: context.query
    }
  }

  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const scrollTrigger = 137
    const scrollTop = document.documentElement.scrollTop

    if (scrollTop > scrollTrigger) {
      this.setState({ lockGoogleMap: true })
    } else {
      this.setState({ lockGoogleMap: false })
    }
  }

  render () {
    const { listings, neighborhoods, currentUser, query } = this.props
    const { lockGoogleMap } = this.state
    const seoImgSrc = listings.length > 0 && mainListingImage(listings[0].images)

    return (
      <Layout authenticated={currentUser.authenticated}>
        <Head>
          <title>Apartamentos à venda no Rio de Janeiro | EmCasa</title>
          <meta name="description" content="Compre seu Imóvel na Zona Sul do Rio de Janeiro"/>
          <meta property="og:description" content="Compre seu Imóvel na Zona Sul do Rio de Janeiro"/>
          <meta property="og:image" content={seoImgSrc}/>
          <meta name="twitter:card" content="summary_large_image"/>
          <meta name="twitter:title" content="Apartamentos à venda no Rio de Janeiro | EmCasa"/>
          <meta name="twitter:description" content="Compre seu Imóvel na Zona Sul do Rio de Janeiro"/>
          <meta name="twitter:image" content={seoImgSrc}/>
        </Head>

        <div className="listings">
          <h1>Compre seu Imóvel na<br/>Zona Sul do Rio de Janeiro</h1>

          <div className={lockGoogleMap ? 'locked' : ''}>
            <MapContainer
              listings={listings}
              height="calc(100vh - 50px)"
              width="100%"
              zoom={13}/>
          </div>

          <div className="entries-container">
            <Filter neighborhoods={neighborhoods} query={query} />

            {listings.map((listing, i) => {
              return <Listing listing={listing} key={i} currentUser={currentUser} />
            })}

            {listings.length == 0 && <div>Não há listagens para sua busca</div>}
          </div>
        </div>

        <style jsx>{`
          .listings {
            h1 {
              line-height: 1.2em;
              margin-bottom: 40px;
              text-align: center;
            }

            > div {
              float: left;
              width: 50%;
              &.entries-container {
                float: right;
              }
            }
          }

          .listings > div.map-container {
            float: left;
          }

          @media ${mobileMedia} {
            .listings > div:first-of-type {
              display: none;
            }

            .listings > div.entries-container {
              width: 100%;
            }
          }
        `}</style>
        <style jsx global>{`
          div.locked > div {
            position: fixed !important;
            top: 56px;
            width: 50% !important;
          }
        `}</style>
      </Layout>
    )
  }
}