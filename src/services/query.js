import { gql } from "@apollo/client"

const GETALLUSERS = gql `
query GetlAllUsers{
    users {
      id
      name
      rocket
      timestamp
      twitter
    }
  }`



  export default GETALLUSERS;