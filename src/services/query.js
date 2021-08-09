import { gql } from "@apollo/client";
import STANDARD_FIELDS from "./fragment-fields";

const GETALLUSERS = gql `
${STANDARD_FIELDS}
query GetlAllUsers{
    users {
      ...StandardFields
    }
  }`



  export default GETALLUSERS;