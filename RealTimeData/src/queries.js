import { gql } from "@apollo/client";

export const GET_METRICS = gql`
  query GetMetrics {
    allMetrics {
      id
      timestamp
      value
    }
  }
`;
