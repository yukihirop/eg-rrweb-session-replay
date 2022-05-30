import { gql } from "@apollo/client";

export const GET_RECORDS = gql`
  query GetRecords {
    Session {
      id
      email
      advertiserId
      ioId
      lastUpdate
      accepted
      zefrIoId
      extensionVersionNumber
    }
  }
`;

export const GET_SESSION = gql`
  query GetSession($id: uuid!) {
    Session_by_pk(id: $id) {
      accepted
      advertiserId
      email
      extensionVersionNumber
      id
      ioId
      lastUpdate
      sessionData
      type
      zefrIoData
      zefrIoId
    }
  }
`;
