import { InputAdornment, TextField, useTheme } from "@mui/material";
import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { SearchBoxPropsType } from "./types";
import { typography } from "../../constants/theme/typography";
export const SearchBox = ({
  search,
  onSearch,
}: SearchBoxPropsType): JSX.Element => {
  const { palette } = useTheme();
  return (
    <>
      <TextField
        variant="outlined"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="جستوجو"
        sx={{
          width: "100%",
          height: "100%",
          fieldset: { borderColor: palette.neutral[300] },

          "& ::placeholder": {
            ...typography.body1,
          },
          "& input": {
            py: 1,
          },
          svg: { fontSize: { md: "24px", xs: "20px" } },
        }}
        InputProps={{
          classes: { notchedOutline: "outline" },
          sx: {
            // border: "unset",
            color: palette.text.secondary,
            // ".outline": { border: "none" },
            py: 0,
            px: 3,
            height: "100%",
            borderRadius: "8px !important",
          },
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: palette.text.disabled }} />
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};
