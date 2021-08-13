import { gql } from "@apollo/client"
import STANDARD_FIELDS from "./fragment-fields";

const ADD_USERS = gql `
${STANDARD_FIELDS}
mutation AddUser($insertUsersObjects: [users_insert_input!]!) {
    insert_users(objects: $insertUsersObjects) {
      returning {
        ...StandardFields,
      }
    }
  }
  `



  export default ADD_USERS;