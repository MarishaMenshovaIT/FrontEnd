import Head from "next/head";
import { Inter } from "next/font/google";
import Menu from "./menu";
import Recipes from "./recipes";
import Categories from "./categories";
import Button from "./butten";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Home Chef Recipes</title>
        <meta name="cook web" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Menu />

      <h1>Home Chef Recipes</h1>
      <Recipes />
      <Button />
    </>
  );
}
