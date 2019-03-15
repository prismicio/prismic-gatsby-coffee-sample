import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import { linkResolver } from '../../utils/linkResolver'
import { Helmet } from 'react-helmet'

import '../../stylesheets/main.scss'

class Layout extends React.Component {
  render() {
    const { data } = this.props;
    const layoutData = data.prismic.allLayouts.edges[0].node;

    const headerItems = layoutData.header_nav_items.map((item) =>
      <Link key={item.link._meta.id} className="header-nav-link" to={linkResolver(item.link._meta)}>
        {item.text}
      </Link>
    )

    const navItems = layoutData.footer_nav_items.map((item) =>
      <Link key={item.link._meta.id} className="footer-nav-link" to={linkResolver(item.link._meta)}>
        {item.text}
      </Link>
    )

    const socialItems = layoutData.footer_social_items.map((item, index) => {
      return (
        <a
          key={index}
          className="footer-social-item"
          href={item.link.url}
        >
          <img src={item.icon.url} alt={item.icon.alt} />
        </a>
      )
    })

    return(
      <React.Fragment>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{layoutData.site_name}</title>
        </Helmet>
        <div className="header" id="header">
          <div className="header-inner">
            <Link className="header-name" to="/">
              {layoutData.site_name}
            </Link>
            <nav className="header-nav">
              {headerItems}
            </nav>
            {/* BURGER MENU GOES HERE */}
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
      </React.Fragment>
    );
  }
}

export default props => (
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
                        id
                        type
                      }
                    }
                    ... on PRISMIC_Blog_home{
                      _meta{
                        uid
                        id
                        type
                      }
                    }
                  }
                }
                footer_nav_items{
                  text
                  link{
                    ... on PRISMIC_Products{
                      _meta{
                        uid
                        id
                        type
                      }
                    }
                    ... on PRISMIC_Blog_home{
                      _meta{
                        uid
                        id
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
    render={data => <Layout data={data} {...props}/>}
  />
)