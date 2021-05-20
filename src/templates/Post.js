import * as React from 'react';
import { graphql, Link } from 'gatsby';


export default function PostPage({ data: { wpPost: {title, content} } }) {

  return (
      <section>
      <Link to="/">Return to Home</Link>

        <h1>
            {title}
        </h1>
        <div dangerouslySetInnerHTML={{__html: content}}/>
      </section>
  );
}

export const query = graphql`
  query blogPostQuery($id: String!) {
    wpPost(id: { eq: $id }) {
      title
      content
    }
  }
`;
