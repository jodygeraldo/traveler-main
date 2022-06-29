import type { LoaderFunction } from "@remix-run/node";
import { sharpTransformer } from "remix-image-sharp";
import { DiskCache, imageLoader } from "remix-image/server";

const config = {
  selfUrl: "http://localhost:3000",
  cache: new DiskCache(),
  transformer: sharpTransformer
};

export const loader: LoaderFunction = ({ request }) => {
  return imageLoader(config, request);
};