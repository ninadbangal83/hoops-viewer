import React from "react";
import { Box, InputAdornment, TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

// This component is stateless reusable component.
// It display's the search bar in the Model Tree Browser.
export default function Search(props) {
  const {
    search,
    setSearch,
    isSearch,
    setIsSearch,
    searchHandler,
    setSearchList,
    setSearchMessage,
    width,
  } = props;
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { mx: "1rem", width: width.value, marginBottom: "0.5rem" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        label="Search"
        id="search"
        size="small"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        sx={{
          backgroundColor: "white",
          paddingX: "0rem",
          marginY: "0rem",
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            searchHandler(null);
            setIsSearch(true);
          }
        }}
        InputProps={
          isSearch
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      color="light"
                      onClick={() => {
                        setSearch("");
                        setSearchList([]);
                        setIsSearch(false);
                        setSearchMessage("")
                      }}
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      color="primary"
                      onClick={() => {
                        searchHandler(null);
                        setIsSearch(true);
                      }}
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }
        }
      />
    </Box>
  );
}
