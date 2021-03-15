import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

// Styles
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 50,
    flexGrow: 1,
    maxWidth: 350,
    marginLeft: "auto",
    marginRight: "auto",
  },
  root1: {
    width: "100%",
    justifyContent: "center",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },

  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const SearchBar = () => {
  const classes = useStyles();

  // Fetching countries from the server
  const fetchData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/countries/${searchInput}`
      );
      setCountries(res.data);
    } catch (error) {
      setCountries(["Not Exists"]);
    }
  };

  const [searchInput, setSearchInput] = useState("");
  const [countries, setCountries] = useState([]);

  // Fetching countries with little delayto reduce the requests to the server
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(searchInput);
      if (searchInput) fetchData();
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchInput]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search …"
              value={searchInput}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </Toolbar>
      </AppBar>
      {searchInput && (
        <div className={classes.root1}>
          {countries.map((countryName, i) => (
            <div>
              <ListItem key={i} button>
                <ListItemText
                  onClick={() => setSearchInput(countryName)}
                  primary={countryName}
                />
              </ListItem>
              <Divider />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
