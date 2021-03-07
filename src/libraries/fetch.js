import { createApolloFetch } from "apollo-fetch";

export default function Fetch(query) {
  const graphql = createApolloFetch({
    uri: "http://asti-graphql.herokuapp.com/graphql",
  });
  return graphql({ query }).catch(() => {
    console.log("Server is offline");
  });
}
