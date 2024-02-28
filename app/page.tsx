import { Metadata } from "next";
import Header from "./home/Header";
import { Grid } from "@radix-ui/themes";
import PageBox, { pages } from "./home/_components/PageBox";

export default async function Home() {
  const appPages = pages;
  interface Page {
    link: string;
    img: string;
    name: string;
  }
  return (
    <>
      <Header />
      <Grid columns={{ initial: "1", md: "3" }} gap="3" width="auto">
        {appPages.map((page: Page) => (
          <PageBox
            key={page.link}
            link={page.link}
            img={page.img}
            name={page.name}
          />
        ))}
      </Grid>
    </>
  );
}

export const metadata: Metadata = {
  title: "CFA Rolodex - Home",
  description: "Home page",
};

// x
