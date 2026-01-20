import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client/react";
import App from "./App";
import client from "./apolloClient";
import RealTimeChart from './RealTimeChart'

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <RealTimeChart />
  </ApolloProvider>,
);
