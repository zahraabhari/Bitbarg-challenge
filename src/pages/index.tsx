import { Box, useTheme } from "@mui/material";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { fetchLivePrice } from "../api/currencies";
import LivePriceList from "../components/LivePriceList";
import styles from "../styles/Home.module.css";

const Home: NextPage = ({ initialData, hasError }: any) => {
  const { palette } = useTheme();
  return (
    <Box sx={{ backgroundColor: palette.neutral[200], py: 4, height: "100vh" }}>
      <LivePriceList initialData={initialData} hasError={hasError} />
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetchLivePrice({});
    return {
      props: {
        initialData: {
          items: res.data.result.items,
          paginateHelper: res.data.result.meta.paginateHelper,
          prices: res.data.result.meta.prices,
        },
      },
    };
  } catch (e) {
    console.log(e);
    return { props: { hasError: true } };
  }
};

export default Home;
