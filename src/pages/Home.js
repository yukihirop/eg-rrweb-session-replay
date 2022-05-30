import React from "react";
import { useQuery } from "@apollo/client";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { GET_RECORDS } from "../graphql/queries";
import Table from "../components/Table";

function Alert(props) {
  return <MuiAlert elevation={3} variant="filled" {...props} />;
}

export const Home = () => {
  const { loading, error, data } = useQuery(GET_RECORDS);

  let records = [];
  if (!loading && !error && data) {
    const { Session = [] } = data;
    records = [...Session];
  }

  return (
    <>
      <h1>Records</h1>
      <Table data={records} />
      <Snackbar open={error} autoHideDuration={6000}>
        <Alert severity="error">Error {error && error.message}</Alert>
      </Snackbar>
      <Snackbar open={loading} autoHideDuration={6000}>
        <Alert severity="info">Loading</Alert>
      </Snackbar>
    </>
  );
};

export default Home;
