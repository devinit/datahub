import gql from 'graphql-tag';

export const INFLOWS_OUTFLOWS_QUERY = gql`
  query InfowsVsOutflows($donor: String!, $recipient: String!) {
    donor: flows(countryType: $donor) {
      inflows {
        id
        name
        selections {
          id
          name
          unbundle
        }
      }
      outflows {
        id
        name
        selections {
          id
          name
          unbundle
        }
      }
    }

    recipient: flows(countryType: $recipient) {
      inflows {
        id
        name
        selections {
          id
          name
          unbundle
        }
      }
      outflows {
        id
        name
        selections {
          id
          name
          unbundle
        }
      }
    }
    crossover: flows(countryType: $recipient) {
      inflows {
        id
        name
        selections {
          id
          name
          unbundle
        }
      }
      outflows {
        id
        name
        selections {
          id
          name
          unbundle
        }
      }
    }
  }`;
