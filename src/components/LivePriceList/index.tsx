import * as React from "react";
import { Container, Box, Typography, useTheme } from "@mui/material";
import { LivePricePropsType } from "./types";
import {
  fetchLivePrice,
  LivePriceInput,
  LivePriceType,
  PaginateHelper as PaginateHelperType,
  Prices as PricesType,
} from "../../api/currencies";
import { fontFamily } from "../../constants/theme/typography";
import { LivePriceTable } from "./LivePriceTable";
import { Toolbar } from "./Toolbar";

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
        <Toolbar
          params={Params}
          onSortSearch={handleSortSearch}
          showPriceInToman={ShowPriceInToman}
          setShowPriceInToman={setShowPriceInToman}
        />
        <LivePriceTable
          items={Items}
          loadMore={loadMore}
          showPriceInToman={ShowPriceInToman}
          prices={Prices}
          loading={Loading}
        />
      </Box>
    </Container>
  );
};

export default LivePriceList;
