import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import Head from 'next/head';

const SingleItemStyles = styled.div`
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  margin: 2rem auto;
  max-width: 1200px;
  min-height: 800px;
  img {
    height: 100%;
    object-fit: contain;
    width: 100%;
  }
  .details {
    font-size: 2rem;
    margin: 3rem;
  }
`;

import Error from './ErrorMessage';

export const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      largeImage
    }
  }
`;

class SingleItem extends Component {
  render() {
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading...</p>;
          if (!data.item) return <p>No item found for {this.props.id}</p>;
          const { id, title, description, largeImage } = data.item;
          return (
            <SingleItemStyles>
              <Head>
                <title>Sick Fits | {title}</title>
              </Head>
              <img src={largeImage} alt={title} />
              <div className="details">
                <h2>Viewing {title}</h2>
                <p>{description}</p>
              </div>
            </SingleItemStyles>
          );
        }}
      </Query>
    );
  }
}

export default SingleItem;
