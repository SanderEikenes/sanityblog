
import { createClient } from "next-sanity";
import  ImageUrlBuilder  from "@sanity/image-url/";

export const sanityClient = createClient({
    apiVersion: "2022-03-07",
    dataset: "production",
    projectId: "r3kcimgd",
    useCdn: false,
});

const builder = ImageUrlBuilder(sanityClient);

export function urlFor(source: any) {
    return builder.image(source);
}