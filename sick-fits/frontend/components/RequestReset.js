import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Form from './styles/Form';
import Error from './ErrorMessage';

export const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

class RequestReset extends Component {
  state = {
    email: ''
  };

  saveToState = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <Mutation mutation={REQUEST_RESET_MUTATION} variables={this.state}>
        {(reset, { error, loading, called }) => (
          <Form
            method="post"
            data-test="form"
            onSubmit={async e => {
              e.preventDefault();
              await reset();
              this.setState({ email: '' });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Request a Password Reset</h2>
              <Error error={error} />
              {!error && !loading && called && (
                <p>Success! Check you email for a reset link!</p>
              )}
              <label htmlFor="email">
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={this.state.email}
                  onChange={this.saveToState}
                />
              </label>

              <button type="submit">Request Reset</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default RequestReset;
