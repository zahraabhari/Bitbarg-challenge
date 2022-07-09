import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  Paper,
  useTheme,
  TableBody,
} from "@mui/material";
import Image from "next/image";
import * as React from "react";
import { PriceTableRow } from "./PriceTableRow";
import livePriceData from "./livePrice.json";
import { LivePriceTablePropsType } from "./types";
export const LivePriceTable = ({
  items,
  loadMore,
  showPriceInToman,
  prices,
  loading,
}: LivePriceTablePropsType): JSX.Element => {
  const { palette } = useTheme();
  return (
    <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
      <Table>
        <TableHead>
          <TableRow>
            {showPriceInToman ? (
              <>
                {livePriceData.tableHeaderToman.map(({ title }, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      textAlign: "center",
                      backgroundColor: palette.neutral[50],
                      "&:first-child": {
                        pl: 5,
                        borderTopLeftRadius: 8,
                        borderBottomLeftRadius: 8,
                      },
                      "&:last-child": {
                        textAlign: "end",
                        pr: 5,
                        borderTopRightRadius: 8,
                        borderBottomRightRadius: 8,
                      },
                    }}
                  >
                    <Typography component="span" variant="body1">
                      {title}
                    </Typography>
                  </TableCell>
                ))}
              </>
            ) : (
              <>
                {livePriceData.tableHeaderTether.map(({ title }, index) => (
                  <TableCell key={index} sx={{ textAlign: "center" }}>
                    <Typography component="span" variant="body1">
                      {title}
                    </Typography>
                  </TableCell>
                ))}
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <PriceTableRow
              key={index + item.coin}
              data={item}
              loadMore={loadMore}
              showPriceInToman={showPriceInToman}
              prices={prices}
              index={index}
            />
          ))}
        </TableBody>
      </Table>
      {items.length === 0 && !loading && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: 3,
            justifyContent: "center",
          }}
        >
          <Image src="/assets/images/not-found.svg" width={256} height={208} />
          <Typography
            component="span"
            variant="body1"
            sx={{ textAlign: "center" }}
          >
            چیزی یافت نشد
          </Typography>
        </Box>
      )}
    </TableContainer>
  );
};
