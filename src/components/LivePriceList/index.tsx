import * as React from "react";
import {
  Container,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  InputAdornment,
  useTheme,
  TextField,
  Button,
  Select,
  MenuItem,
  ListItemSecondaryAction,
  Paper,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { LivePricePropsType } from "./types";
import livePriceData from "./livePrice.json";
import Image from "next/image";
import {
  fetchLivePrice,
  LivePriceInput,
  LivePriceType,
  PaginateHelper as PaginateHelperType,
  Prices as PricesType,
} from "../../api/currencies";
import { SearchBox } from "./SearchBox";
import { JavascriptRounded } from "@mui/icons-material";
import { PriceTableRow } from "./PriceTableRow";
import { SortBox } from "./SortBox";
import { fontFamily } from "../../constants/theme/typography";

const LivePriceList = ({
  initialData,
  hasError,
}: LivePricePropsType): JSX.Element => {
  const { palette } = useTheme();
  const [Params, setParams] = React.useState<LivePriceInput>({
    page: initialData?.paginateHelper?.currentPage,
  });
  const [Items, setItems] = React.useState<LivePriceType[]>(
    initialData?.items ?? []
  );
  const [PaginateHelper, setPaginateHelper] = React.useState<
    PaginateHelperType | undefined
  >(initialData?.paginateHelper);
  const [Prices, setPrices] = React.useState<PricesType | undefined>(
    initialData?.prices
  );
  const [ShowPriceInToman, setShowPriceInToman] = React.useState<boolean>(true);
  const [Loading, setLoading] = React.useState<boolean>(false);
  const [RequestQueue, setRequestQueue] = React.useState<any>();

  const loadMore = React.useCallback(() => {
    if (PaginateHelper && PaginateHelper.currentPage < PaginateHelper.total) {
      setLoading(true);
      fetchLivePrice({ ...Params, page: Params.page })
        .then((res) => {
          setItems((prev) => [...prev, ...res.data.result.items]);
          setPaginateHelper(res.data.result.meta.paginateHelper);
          setPrices(res.data.result.meta.prices);
        })
        .finally(() => setLoading(false));
    }
  }, [PaginateHelper, Params]);

  const handleSortSearch = React.useCallback(
    (input: LivePriceInput) => {
      const newParams = { ...Params, ...input, page: 1 };
      setParams(newParams);
      if (RequestQueue) {
        clearTimeout(RequestQueue);
        setRequestQueue(undefined);
      }
      setRequestQueue(
        setTimeout(() => {
          setLoading(true);
          fetchLivePrice(newParams)
            .then((res) => {
              setItems(res.data.result.items);
              setPaginateHelper(res.data.result.meta.paginateHelper);
              setPrices(res.data.result.meta.prices);
            })
            .finally(() => setLoading(false));
        }, 500)
      );
    },
    [Params]
  );
  const priceUnit = React.useMemo(
    () => (ShowPriceInToman ? "تومان" : "USDT"),
    [ShowPriceInToman]
  );

  React.useEffect(() => {
    const body = document.body;
    const handleLoadMore = () => {
      const scrollTop = body.offsetHeight + body.scrollTop;
      const scrollHeight = body.scrollHeight;
      if (scrollHeight <= scrollTop) {
        loadMore();
      }
    };

    body.addEventListener("scroll", handleLoadMore);

    return () => body.removeEventListener("scroll", handleLoadMore);
  }, []);

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 4,
          borderRadius: "16px",
          gap: 2,
          backgroundColor: palette.background.paper,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography component="h2" variant="h2" sx={{ mr: 3 }}>
            قیمت لحظه‌ای
          </Typography>
          <Typography
            component="span"
            variant="body1"
            sx={{
              fontFamily: fontFamily.fa,
              display: "flex",
              alignItems: "center",
              color: palette.text.secondary,
            }}
          >
            <Typography
              component="span"
              sx={{
                display: "flex",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: palette.warning.main,
                mr: 1,
              }}
            />
            296 ارز دیجیتال
          </Typography>
        </Box>
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
              search={Params.q ?? ""}
              onSearch={(q: string) => handleSortSearch({ q })}
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
              sort={Params.sort}
              onSort={(sort: number) => handleSortSearch({ sort })}
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
              value={ShowPriceInToman}
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
        <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
          <Table>
            <TableHead sx={{ backgroundColor: palette.neutral[50], px: 3 }}>
              <TableRow>
                {ShowPriceInToman ? (
                  <>
                    {livePriceData.tableHeaderToman.map(({ title }, index) => (
                      <TableCell
                        key={index}
                        sx={{
                          textAlign: "center",
                          "&:first-child": { pl: 5 },
                          "&:last-child": { textAlign: "end", pr: 5 },
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
              {Items.map((item, index) => (
                <PriceTableRow
                  key={index}
                  data={item}
                  loadMore={loadMore}
                  showPriceInToman={ShowPriceInToman}
                  prices={Prices}
                  index={index}
                />
              ))}
            </TableBody>
          </Table>
          {Items.length === 0 && !Loading && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                mt: 3,
                justifyContent: "center",
              }}
            >
              <Image
                src="/assets/images/not-found.svg"
                width={256}
                height={208}
              />
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
      </Box>
    </Container>
  );
};

export default LivePriceList;
