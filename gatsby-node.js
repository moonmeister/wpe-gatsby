const path = require(`path`);

exports.createPages = async (gatsbyUtilities) => {
  const posts = await getPosts(gatsbyUtilities);
  const categories = await getCategories(gatsbyUtilities);

  return Promise.all([
    createIndividualBlogPostPages({ posts, gatsbyUtilities }),
    createIndividualCategoryPages({ categories, gatsbyUtilities }),
  ]);
};

/**
 * This function creates all the individual blog pages in this site
 */
async function createIndividualBlogPostPages({ posts, gatsbyUtilities }) {
  return Promise.all(
    posts.map(({ previous, post, next }, i) =>
      gatsbyUtilities.actions.createPage({
        path: post.uri,
        component: path.resolve(`./src/templates/Post.js`),
        context: {
          id: post.id,
          databaseId: post.databaseId,
          previousPostId: previous ? previous.id : null,
          nextPostId: next ? next.id : null,
        },
        defer: (i >= 4) ? true : false,
      })
    )
  );
}

async function createIndividualCategoryPages({ categories, gatsbyUtilities }) {
  return Promise.all(
    categories.map(({ category }) =>
      gatsbyUtilities.actions.createPage({
        path: category.uri,
        component: path.resolve(`./src/templates/Category.js`),
        context: {
          id: category.id,
          databaseId: category.databaseId,
        },
      })
    )
  );
}

async function getPosts({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpPosts {
      allWpPost(sort: { fields: [date], order: DESC }) {
        edges {
          previous {
            id
            databaseId
          }
          post: node {
            id
            databaseId
            uri
          }
          next {
            id
            databaseId
          }
        }
      }
    }
  `);

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    );
    return;
  }

  return graphqlResult.data.allWpPost.edges;
}

async function getCategories({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpCategories {
      allWpCategory {
        edges {
          category: node {
            id
            databaseId
            uri
          }
        }
      }
    }
  `);

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    );
    return;
  }

  return graphqlResult.data.allWpCategory.edges;
}