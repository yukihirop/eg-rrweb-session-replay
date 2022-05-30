import React from "react";
import client from "./graphql/client";
import { ApolloProvider } from "@apollo/client";
import Home from "./pages/Home";
import Record from "./pages/Record";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Container } from "@material-ui/core";
import ThemeProvider from "./base/ThemeProvider";
import { makeStyles } from "@material-ui/core/styles";
import "./styles.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    color: "#FFFFFF"
  },
  innerTitle: {
    fontWeight: 700
  },
  smallTitle: {
    fontWeight: 400,
    marginLeft: 5,
    fontSize: 14
  },
  link: {
    color: "#FFFFFF",
    textDecoration: "none"
  }
}));

export default function App() {
  const classes = useStyles();

  return (
    <ApolloProvider client={client}>
      <Router>
        <ThemeProvider>
          <AppBar position="fixed" elevation={1}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Logger
                <span className={classes.innerTitle}>Head</span>
                <span className={classes.smallTitle}>by ZEFR</span>
              </Typography>
              <Link to="/" className={classes.link}>
                Home
              </Link>
            </Toolbar>
          </AppBar>
          <Container>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/record/:id">
                <Record />
              </Route>
            </Switch>
          </Container>
        </ThemeProvider>
      </Router>
    </ApolloProvider>
  );
}
