import * as React from "react";
import {
  Button,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from "@mui/material";
import { SearchBox } from "./SearchBox";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { ToolbarPropsType } from "./types";
import { SortBox } from "./SortBox";
export const Toolbar = ({
  params,
  onSortSearch,
  showPriceInToman,
  setShowPriceInToman,
}: ToolbarPropsType): JSX.Element => {
  const { palette } = useTheme();
  return (
    <Grid
      container
      columnSpacing={4}
      sx={{
        display: "flex",
        alignItems: "center",
        height: "48px",
        " > *": {
          height: "100%",
        },
      }}
    >
      <Grid item md={4}>
        <SearchBox
          search={params.q ?? ""}
          onSearch={(q: string) => onSortSearch({ q })}
        />
      </Grid>
      <Grid item md={2}>
        <Button
          variant="outlined"
          startIcon={<StarBorderIcon />}
          sx={{
            p: 1,
            width: "100%",
            borderRadius: "8px",
            borderColor: palette.divider,
            color: palette.text.primary,
            "&:hover": {
              backgroundColor: palette.neutral[100],
              borderColor: palette.divider,
            },
          }}
        >
          <Typography component="span" variant="body1">
            {" "}
            نشان شده‌ها
          </Typography>
        </Button>
      </Grid>
      <Grid item md={2}>
        <SortBox
          sort={params.sort}
          onSort={(sort: number) => onSortSearch({ sort })}
        />
      </Grid>
      <Grid item md={4}>
        <ToggleButtonGroup
          sx={{
            width: "100%",
            height: "100%",
            border: "1px solid " + palette.neutral[300],
            borderRadius: "8px",
          }}
          color="primary"
          exclusive
          value={showPriceInToman}
          onChange={(e, value) => setShowPriceInToman(value)}
        >
          <ToggleButton
            sx={{
              width: "100%",
              border: "unset",
              m: 0.5,
              borderRadius: "8px !important",
              color: palette.text.primary,
            }}
            value={true}
          >
            <Typography component="span" variant="body1">
              تومان
            </Typography>
          </ToggleButton>
          <ToggleButton
            sx={{
              width: "100%",
              border: "unset",
              m: 0.5,
              color: palette.text.primary,
            }}
            value={false}
          >
            <Typography component="span" variant="body1">
              تتر
            </Typography>
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
    </Grid>
  );
};
