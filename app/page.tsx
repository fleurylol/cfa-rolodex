import { Metadata } from "next";
import Header from "./home/Header";
import { Grid } from "@radix-ui/themes";
import PageBox from "./home/_components/PageBox";

export default async function Home() {
  return (
    <>
      <Header />
      <Grid columns="1" gap="3" width="auto">
        <PageBox />
        <PageBox />
        <PageBox />
      </Grid>
    </>
  );
}

export const metadata: Metadata = {
  title: "CFA Rolodex - Home",
  description: "Home page",
};

// https://docs.google.com/forms/d/e/1FAIpQLSeFImfvQieyhgCrj63KBx-AwgoylRME3K6hUA4S_TYKHchNhw/viewform
