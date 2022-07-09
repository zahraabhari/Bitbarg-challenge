import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import * as React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { SortBoxPropsType } from "./types";

export const SortBox = ({ sort, onSort }: SortBoxPropsType): JSX.Element => {
  const { palette } = useTheme();
  return (
    <FormControl
      sx={{
        minWidth: "100%",
        height: "100%",
        fieldset: { borderColor: palette.neutral[300] },
      }}
    >
      <InputLabel id="sort_label">ترتیب بر اساس</InputLabel>
      <Select
        label="ترتیب بر اساس"
        labelId="sort_label"
        value={sort}
        onChange={(e) => onSort(Number(e.target.value))}
        IconComponent={(props) => (
          <KeyboardArrowDownIcon
            {...props}
            sx={{
              color: palette.text.primary + "!important",
              fontSize: 17,
              right: {
                md: 3.5,
                xs: 2,
              },
            }}
          />
        )}
        sx={{
          "& .MuiSelect-select": {
            py: 1,
          },
          backgroundColor: palette.background.paper,
          borderRadius: "8px",
          pl: 1,
          height: "100%",
        }}
      >
        <MenuItem value={1}>
          <Typography component="span" variant="body1">
            کمترین قیمت
          </Typography>
        </MenuItem>
        <MenuItem value={2}>
          <Typography component="span" variant="body1">
            بیشترین قیمت
          </Typography>
        </MenuItem>
      </Select>
    </FormControl>
  );
};
