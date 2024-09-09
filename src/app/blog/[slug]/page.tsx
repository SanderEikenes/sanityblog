import { fullBlog } from "@/app/lib/interface";
import { sanityClient, urlFor } from "@/app/lib/sanity";
import { PortableText } from "next-sanity";
import Image from "next/image";


async function getData(slug: string) {
    const query = `
        *[_type == "blog" && slug.current == "${slug}"] {
        title,
        content,
        titleImage,
        }[0]`;

    const data = await sanityClient.fetch(query);
    return data;
}

export default async function BlogArticle({params}: {params: {slug: string};}) {
    const data: fullBlog = await getData(params.slug);
    return(
        <div className="flex flex-col text-center justify-center mt-8 items-center">
            
            <Image src={urlFor(data.titleImage).url()} alt={data.title} width={200} height={200} className="rounded-lg my-8" />
            <h1 className="text-3xl font-bold">{data.title}</h1>
            <PortableText value={data.content} />

        </div>
    )
}