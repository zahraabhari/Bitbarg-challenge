import {
  Box,
  IconButton,
  TableCell,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import * as React from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Image from "next/image";
import { PriceTableRowPropsType } from "./types";
import { fontFamily } from "../../constants/theme/typography";
import Chart from "./Chart";
export const PriceTableRow = ({
  data,
  loadMore,
  showPriceInToman,
  prices,
  index,
}: PriceTableRowPropsType): JSX.Element => {
  const {
    id,
    icon,
    faName,
    enName,
    coin,
    price,
    quote,
    percent,
    decimal,
    isFavorite,
    chart,
  } = data;
  const { palette } = useTheme();
  const getPercentColor = React.useCallback(() => {
    if (percent > 0) return palette.success.main;
    if (percent < 0) return palette.error.main;
    return palette.text.primary;
  }, [percent]);
  const getChartColor = React.useCallback(() => {
    if (percent >= 0) return palette.success.main;
    if (percent < 0) return palette.error.main;
  }, [percent]);
  const getPercentIcon = React.useCallback(() => {
    if (percent > 0) return <ArrowDropUpIcon />;
    if (percent < 0) return <ArrowDropDownIcon />;
    return <ArrowRightIcon />;
  }, [percent]);
  const priceUnit = React.useMemo(
    () => (showPriceInToman ? "تومان" : "USDT"),
    [showPriceInToman]
  );
  const priceFont = React.useMemo(
    () => (showPriceInToman ? fontFamily.fa : fontFamily.en),
    [showPriceInToman]
  );
  const transformedSellPrice = React.useMemo(
    () => (showPriceInToman ? price * (prices?.sell ?? 0) : quote),
    [showPriceInToman]
  );
  const transformedBuyPrice = React.useMemo(
    () => (showPriceInToman ? price * (prices?.buy ?? 0) : price),
    [showPriceInToman]
  );

  return (
    <TableRow sx={{ textAlign: "center" }}>
      <TableCell>
        <IconButton
          sx={{
            display: "flex",
            margin: "auto",
          }}
        >
          <StarBorderIcon />
        </IconButton>
      </TableCell>
      <TableCell>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: getPercentColor(),
          }}
        >
          <Typography component="span" variant="body1">
            {percent}
          </Typography>
          {getPercentIcon()}
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ width: "148px", height: "40px" }}>
          <Chart
            data={chart.map((value) => ({
              value,
            }))}
            color={getChartColor()}
          />
        </Box>
      </TableCell>
      <TableCell sx={{ fontFamily: priceFont }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography component="span" variant="body1" sx={{ mr: 0.5 }}>
            {priceUnit}
          </Typography>
          <Typography
            component="span"
            variant="body1"
            sx={{
              fontFamily: showPriceInToman ? fontFamily.fa : fontFamily.en,
            }}
          >
            {transformedSellPrice}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>
        <Box
          sx={{
            fontFamily: priceFont,
            display: "flex",
            justifyContent: "center",
            flexDirection: showPriceInToman ? "row" : "row-reverse",
          }}
        >
          {showPriceInToman ? (
            <Typography component="span" variant="body1" sx={{ mr: 0.5 }}>
              {priceUnit}
            </Typography>
          ) : (
            <Image
              src="/assets/icons/tether.svg"
              alt="tether"
              width={14}
              height={14}
            />
          )}
          <Typography
            component="span"
            variant="body1"
            sx={{
              mr: 0.5,
              fontFamily: showPriceInToman ? fontFamily.fa : fontFamily.en,
            }}
          >
            {transformedBuyPrice}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            pr: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              mr: 1.5,
            }}
          >
            <Typography component="span" variant="body1">
              {enName}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "center",
              }}
            >
              <Typography
                component="span"
                variant="body1"
                sx={{
                  width: "19px",
                  height: "19px",
                  backgroundColor: palette.neutral[300],
                  borderRadius: "2px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  ml: 0.5,
                }}
              >
                {index + 1}
              </Typography>
              <Typography component="span" variant="body1">
                {coin}
              </Typography>
            </Box>
          </Box>
          <Image src={icon} alt={enName} width={36} height={36} />
        </Box>
      </TableCell>
    </TableRow>
  );
};
