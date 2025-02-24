import '@/styles/globals.css'
import { PlasmicRootProvider } from "@plasmicapp/react-web";
import Head from "next/head";
import Link from "next/link";
import Button from "../components/Button"; // Import your modified button component

export default function MyApp({ Component, pageProps }) {
  return (
    <PlasmicRootProvider Head={Head} Link={Link}>
      <Button /> {/* Now your custom button with navigation is available */}
      <Component {...pageProps} />
    </PlasmicRootProvider>
  );
}