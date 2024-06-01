import {
  List,
  ListItemText,
  Typography,
  Divider,
  Grid,
  ListItemButton,
} from "@mui/material";
import axios from "axios";
import { format, parseISO } from "date-fns";
import React, { useState } from "react";
import Map from "./Map";

export interface IMatch {
  id: string;
  when: string;
  where: string;
  matchType: string;
  geolocation: {
    lat: number;
    lng: number;
  };
}

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState<IMatch>(null);

  React.useEffect(() => {
    axios
      .get<IMatch[]>(
        "https://3jgliispfg.execute-api.us-east-1.amazonaws.com/dev/matches"
      )
      .then((res) => {
        setMatches(res.data["Items"]);
      });
  }, []);

  return (
    <>
      <h1>Partidos</h1>
      <Grid container>
        <Grid item xs={4}>
          <List sx={{ width: "100%", bgcolor: "whitesmoke" }} component="nav">
            {matches.map((match: IMatch, i: number) => (
              <React.Fragment key={i}>
                <ListItemButton
                  key={`list-item-${i}`}
                  alignItems="flex-start"
                  onClick={() => setSelectedMatch(match)}
                >
                  <ListItemText
                    primary={match.where}
                    secondary={
                      <>
                        <Typography
                          key={`typography-${i}`}
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {format(parseISO(match.when), "MM/dd/yyyy HH:mm")}
                        </Typography>
                        {" — " + match.matchType}
                      </>
                    }
                  />
                </ListItemButton>
                {i < matches.length - 1 && <Divider key={`divider-${i}`} />}
              </React.Fragment>
            ))}
          </List>
        </Grid>
        <Grid item xs={8}>
          <Map
            matches={matches}
            selectedMatch={selectedMatch}
            setSelectedMatch={setSelectedMatch}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Matches;
