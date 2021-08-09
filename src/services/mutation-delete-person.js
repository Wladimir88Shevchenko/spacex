import { gql } from "@apollo/client";
import STANDARD_FIELDS from "./fragment-fields";

const DELETE_USERS = gql `
${STANDARD_FIELDS}
mutation Delete_usersMutation($deleteUsersWhere: users_bool_exp!) {
    delete_users(where: $deleteUsersWhere) {
      returning {
        ...StandardFields,
        id
      }
    }
  }`



  export default DELETE_USERS;