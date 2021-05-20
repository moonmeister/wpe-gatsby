import * as React from 'react';
import { graphql, Link } from 'gatsby';


export default function PostPage({ data: { wpCategory: { contentNodes: { posts } } } }) {

  return (
    <section>
      <ul>
        {
          posts.map((post) => {
            const { title, excerpt, uri } = post;
            return (
              <li>
                <article>
                <Link to={uri}>
                  <h1>{title}</h1>
                </Link>
                  <div dangerouslySetInnerHTML={{ __html: excerpt }} />
                </article>
              </li>
            )
          })
        }
      </ul>
    </section>
  );
}

export const query = graphql`
  query blogCategoyQuery($id: String!) {
    wpCategory(id: { eq: $id }) {
        contentNodes {
          ... on WpCategoryToContentNodeConnection {
            posts: nodes {
              ... on WpPost {
                title
                excerpt
                uri
              }
            }
          }
        }
    }
  }
`;
