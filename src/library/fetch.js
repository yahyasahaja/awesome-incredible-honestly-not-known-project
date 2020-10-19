import { createApolloFetch } from "apollo-fetch";

export default function Fetch(query) {
  const graphql = createApolloFetch({ uri: process.env.graphql });
  return graphql({ query }).catch(() => {
    console.log("Server is offline");
  });
}
