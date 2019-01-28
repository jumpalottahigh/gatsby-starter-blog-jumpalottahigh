import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import './index.css'

import SideBar from '../Sidebar'
import MenuFAB from '../MenuFAB'
import ogImage from '../../../static/default-ogimage.jpg'
import github from '../../../static/github.svg'
import twitter from '../../../static/twitter.svg'
import linkedin from '../../../static/linkedin.svg'
import rss from '../../../static/rss.svg'

// PrismJS dependency
import 'prismjs/themes/prism-okaidia.css'

const Header = () => (
  <div
    style={{
      position: 'fixed',
      backgroundColor: 'rgba(255,255,255,0.925)',
      boxShadow:
        '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
      height: '3.5rem',
      zIndex: '3',
      left: '0',
      right: '0'
    }}
  >
    <div
      style={{
        margin: '0 auto',
        paddingLeft: '1.05rem',
        paddingRight: '1.05rem',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '100%'
      }}
    >
      <Link
        to="/"
        style={{
          color: '#0275d8',
          textDecoration: 'none',
          marginRight: '.7rem'
        }}
      >
        <h1
          style={{
            display: 'flex',
            alignItems: 'center',
            margin: 0,
            fontSize: '1rem'
          }}
        >
          <div
            style={{
              height: '2.25rem',
              width: '2.25rem',
              marginBottom: '0',
              marginRight: '.5rem',
              borderRadius: '6px',
              backgroundColor: '#0057e7'
            }}
          />
          My blog
        </h1>
      </Link>
      <ul className="nav social">
        <li>
          <a
            href="https://github.com/jumpalottahigh"
            target="_blank"
            rel="noopener"
          >
            <img src={github} alt="Github" />
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/jumpalottahigh"
            target="_blank"
            rel="noopener"
          >
            <img src={twitter} alt="Twitter" />
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/yanevgeorgi/"
            target="_blank"
            rel="noopener"
          >
            <img src={linkedin} alt="LinkedIn" />
          </a>
        </li>
        <li>
          <a href="/feed.xml">
            <img src={rss} alt="Subscribe to RSS feed" />
          </a>
        </li>
      </ul>
    </div>
  </div>
)

const TemplateWrapper = ({ children }) => (
  <StaticQuery
    query={graphql`
      query sidebarPageListQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { draft: { ne: true } } }
        ) {
          edges {
            node {
              id
              frontmatter {
                date(formatString: "MMM DD, YYYY")
                path
                title
                tags
                ogImage {
                  publicURL
                }
              }
            }
          }
        }
      }
    `}
    render={data => (
      <React.Fragment>
        <div>
          <Helmet
            title="Georgi Yanev | Blog on Web OSS, FPV and Smart Home Automation"
            meta={[
              {
                name: 'description',
                content:
                  "I'm Georgi and I build things on the web with JavaScript, React and Vue. I believe that however we build apps on the web, they always end up in the hands of humans and it's crucial that we address web performance and page load times."
              },
              {
                name: 'keywords',
                content:
                  'smart home automation, home assistant, open source software, OSS, FPV, racing quads, Wizard x220, code, DIY, projects, life-long learning, learning, teaching, education, web development'
              },
              {
                property: 'og:image',
                content: `https://blog.georgi-yanev.com${ogImage}`
              },
              { property: 'og:type', content: 'website' },
              { property: 'og:url', content: 'https://blog.georgi-yanev.com' },
              {
                property: 'og:title',
                content:
                  'Georgi Yanev - Blog on Web OSS, FPV and Smart Home Automation'
              },
              {
                property: 'og:description',
                content:
                  "I'm Georgi and I build things on the web with JavaScript, React and Vue. I believe that however we build apps on the web, they always end up in the hands of humans and it's crucial that we address web performance and page load times."
              }
            ]}
          />

          <Header />

          <div className="main-wrapper">
            <SideBar pageList={data} />
            <MenuFAB data={data} />
            <div className="main">{children}</div>
          </div>
        </div>
      </React.Fragment>
    )}
  />
)

export default TemplateWrapper
