const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const createWorkPages = (createPage, graphql) => {
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allDatoCmsWork {
          edges {
            node {
              slug
              locale
            }
          }
        }
      }
    `).then(result => {
      result.data.allDatoCmsWork.edges.map(({ node: work }) => {
        createPage({
          path: `${work.locale == 'en' ? `works/${work.slug}` : `${work.locale}/works/${work.slug}`}`,
          component: path.resolve(`./src/templates/work.js`),
          context: {
            slug: work.slug,
            locale: work.locale
          },
        })
      })
      resolve()
    })
  })
}

const createHomePage = (createPage, graphql) => {
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allDatoCmsHome {
          edges {
            node {
              locale
            }
          }
        }
      }
    `).then(result => {
      result.data.allDatoCmsHome.edges.map(({ node: home }) => {
        createPage({
          path: `${home.locale == 'en' ? '/' : `${home.locale}`}`,
          component: path.resolve(`./src/templates/home.js`),
          context: {
            locale: home.locale
          },
        })
      })
      resolve()
    })
  })
}

const createAboutPage = (createPage, graphql) => {
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allDatoCmsAboutPage {
          edges {
            node {
              locale
            }
          }
        }
      }
    `).then(result => {
      result.data.allDatoCmsAboutPage.edges.map(({ node: aboutPage }) => {
        createPage({
          path: `${aboutPage.locale == 'en' ? '/about' : `${aboutPage.locale}/about`}`,
          component: path.resolve(`./src/templates/about.js`),
          context: {
            locale: aboutPage.locale
          },
        })
      })
      resolve()
    })
  })
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  await createWorkPages(createPage, graphql)
  await createHomePage(createPage, graphql)
  await createAboutPage(createPage, graphql)
}
