import { Stack, TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
export const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchTerm(inputValue);
  };

  return (
    <Stack
      direction="row"
      spacing={{ xs: 1, sm: 2, md: 2 }}
      justifyContent="center"
      alignItems="center"
      my={2}
    >
      <TextField
        label=""
        placeholder="Search here"
        className="inputField"
        size="small"
        fullWidth
        value={searchTerm}
        onChange={handleInputChange}
        InputProps={{
          endAdornment: (
            <IconButton
              color="primary"
              sx={{ fontSize: { xs: "medium", sm: "large" } }}
            >
              <SearchIcon fontSize="inherit" />
            </IconButton>
          ),
        }}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Stack>
  );
};
