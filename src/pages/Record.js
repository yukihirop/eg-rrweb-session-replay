import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import LinearProgress from "@material-ui/core/LinearProgress";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import rrwebPlayer from "rrweb-player";
import { withRouter } from "react-router-dom";
import { useQuery } from "@apollo/client";
import JSONPretty from "react-json-pretty";
import { GET_SESSION } from "../graphql/queries";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    margin: 40,
    minWidth: 475
  },
  loading: {
    marginTop: 10
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  userTitle: {
    fontWeight: 700
  },
  listData: {
    textAlign: "right"
  }
});

const RecordPage = ({
  match: {
    params: { id }
  }
}) => {
  const wrapperEl = useRef(null);
  const classes = useStyles();

  const { loading, error, data } = useQuery(GET_SESSION, {
    variables: { id }
  });

  const [ioData, setIoData] = useState(null);

  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (data && !toggle) {
      const zefrIoData = JSON.parse(data["Session_by_pk"].zefrIoData) || null;
      setIoData(zefrIoData);
      const videoEvents = JSON.parse(data["Session_by_pk"].sessionData);
      if (videoEvents && videoEvents.length && wrapperEl.current) {
        new rrwebPlayer({
          target: wrapperEl.current,
          data: {
            events: videoEvents.map((event) => ({
              ...event,
              data: event.data,
              timestamp: new Date(event.timestamp).getTime()
            })),
            autoPlay: true
          }
        });
        setToggle(true);
      }
    }
  }, [data, toggle]);

  if (loading)
    return (
      <div className={classes.loading}>
        <LinearProgress />
      </div>
    );

  if (error) return <p>Error ....</p>;

  const {
    zefrIoId = "",
    advertiserId = "",
    email = "",
    extensionVersionNumber = "",
    ioId = ""
  } = data["Session_by_pk"] || {};

  return (
    <div className="wrapper">
      <Card className={classes.root} elevation={2}>
        <CardContent>
          <Typography gutterBottom className={classes.userTitle}>
            USER DETAILS
          </Typography>
          <List component="nav">
            <ListItem>
              <ListItemText primary="Zefr IO ID" className="listDataTitle" />
              <ListItemText primary={zefrIoId} className={classes.listData} />
            </ListItem>
            <Divider />
            <ListItem divider>
              <ListItemText primary="Advertiser ID" className="listDataTitle" />
              <ListItemText
                primary={advertiserId}
                className={classes.listData}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Email" className="listDataTitle" />
              <ListItemText primary={email} className={classes.listData} />
            </ListItem>
            <Divider light />
            <ListItem>
              <ListItemText
                primary="Extension Version"
                className="listDataTitle"
              />
              <ListItemText
                primary={extensionVersionNumber}
                className={classes.listData}
              />
            </ListItem>
            <Divider light />
            <ListItem>
              <ListItemText primary="IO ID" className="listDataTitle" />
              <ListItemText primary={ioId} className={classes.listData} />
            </ListItem>
          </List>
        </CardContent>
      </Card>
      <Card ref={wrapperEl} className="video" elevation={2} />
      <Card id="json-pretty" elevation={2}>
        {ioData && <JSONPretty data={ioData}></JSONPretty>}
      </Card>
    </div>
  );
};

export default withRouter(RecordPage);
