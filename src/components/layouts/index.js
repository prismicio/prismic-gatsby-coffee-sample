import React from 'react'
import { Link, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import burgerClosed from '../../images/burger-closed.svg'
import burgerOpened from '../../images/burger-opened.svg'

import '../../stylesheets/main.scss'

class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menuOpen: false,
    }
    this.handleMenuOpen = this.handleMenuOpen.bind(this)
    this.handleClickMenuItem = this.handleClickMenuItem.bind(this)
  }

  handleMenuOpen() {
    // eslint-disable-next-line react/destructuring-assignment
    this.setState({ menuOpen: !this.state.menuOpen })
  }

  handleClickMenuItem() {
    this.setState({ menuOpen: false })
  }

  render() {
    const { layoutData } = this.props

    const headerItems = layoutData.header_nav_items.map((item) => (
      <Link key={item.link.document.id} className="header-nav-link" to={item.link.document.url}>
        {item.text}
      </Link>
    ))

    const navItems = layoutData.footer_nav_items.map((item) => (
      <Link key={item.link.document.id} className="footer-nav-link" to={item.link.document.url}>
        {item.text}
      </Link>
    ))

    const socialItems = layoutData.footer_social_items.map((item, index) => (
      <a
        key={index}
        className="footer-social-item"
        href={item.link.url}
      >
        <img src={item.icon.url} alt={item.icon.alt} />
      </a>
    ))

    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{layoutData.site_name}</title>
          <link href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" rel="stylesheet" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossOrigin="anonymous" />
        </Helmet>
        <div className={`header${this.state.menuOpen ? ' header--is-nav-opened' : ''}`} id="header">
          <div className="header-inner">
            <Link className="header-name" to="/">
              {layoutData.site_name}
            </Link>
            <nav className="header-nav">
              {headerItems}
            </nav>
            <div className="header-burger" id="header-burger" onClick={this.handleMenuOpen}>
              <img className="header-burger-img header-burger-img--closed" src={burgerClosed} alt="Mobile menu toggle - closed state" />
              <img className="header-burger-img header-burger-img--opened" src={burgerOpened} alt="Mobile menu toggle - opened state" />
            </div>
          </div>
        </div>
        <main>
          {this.props.children}
        </main>
        <footer className="footer">
          <div className="footer-inner">
            <div>
              <p className="footer-name">
                {layoutData.site_name}
              </p>
              <div className="footer-social-items">
                {socialItems}
              </div>
            </div>
            <nav className="footer-nav">
              {navItems}
            </nav>
          </div>
        </footer>
      </>
    )
  }
}

export default Layout

export const query = graphql`
fragment LayoutFragment on PrismicLayout {
    data {
      site_name
      header_nav_items {
        text
        link {
          document {
            ... on PrismicProducts {
              id
              url
              type
            }
            ... on PrismicBlogHome {
              id
              url
              type
            }
          }
        }
      }
      footer_nav_items {
        text
        link {
          document {
            ... on PrismicProducts {
              id
              url
              type
            }
            ... on PrismicBlogHome {
              id
              url
              type
            }
          }
        }
      }
      footer_social_items {
        icon {
          alt
          url
        }
        link {
          url
        }
      }
    }
  }
`
