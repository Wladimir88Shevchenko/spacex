import { gql } from "@apollo/client";
import STANDARD_FIELDS from "./fragment-fields";

const EDIT_USERS = gql `
${STANDARD_FIELDS}
mutation Update_usersMutation($updateUsersSet: users_set_input, $updateUsersWhere: users_bool_exp!) {
    update_users(_set: $updateUsersSet, where: $updateUsersWhere) {
      returning {
        ...StandardFields,
        id
      }
    }
  }`



  export default EDIT_USERS;