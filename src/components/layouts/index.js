import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import { linkResolver } from '../../utils/linkResolver'

import '../../stylesheets/main.scss'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query{
        prismic{
          allLayouts(uid:null){
            edges{
              node{
                site_name
                header_nav_items{
                  text
                  link{
                    ... on PRISMIC_Products{
                      _meta{
                        uid
                        type
                      }
                    }
                    ... on PRISMIC_Blog_home{
                      _meta{
                        uid
                        type
                      }
                    }
                  }
                }
                footer_nav_items{
                  link{
                    ... on PRISMIC_Products{
                      _meta{
                        uid
                        type
                      }
                    }
                    ... on PRISMIC_Blog_home{
                      _meta{
                        uid
                        type
                      }
                    }
                  }
                }
                footer_social_items{
                  icon
                  link{
                    ... on PRISMIC__ExternalLink{
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => (
      <React.Fragment>
        <div className="header" id="header">
          <div className="header-inner">
            <Link className="header-name" to="/">
              {data.prismic.allLayouts.edges[0].node.site_name}
            </Link>
            <nav className="header-nav">
              HEADER ITEMS
            </nav>
            {/* BURGER MENU GOES HERE */}
          </div>
        </div>
        <main>
          {children}
        </main>
        <footer className="footer">
          <div className="footer-inner">
            <div>
              <p className="footer-name">
                SITE NAME
              </p>
              <div className="footer-social-items">
                SOCIAL ITEMS
              </div>
            </div>
            <nav className="footer-nav">
              FOOTER ITEMS
            </nav>
          </div>
        </footer>
      </React.Fragment>
    )}
  />
)


Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout