import { gql } from "@apollo/client"


const STANDARD_FIELDS = gql`
    fragment StandardFields on users {
        id
        name
        rocket
        timestamp
        twitter
        
    }
`;

export default STANDARD_FIELDS;