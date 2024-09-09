import Image from "next/image";
import { sanityClient, urlFor } from "./lib/sanity";
import { simpleBlogCard } from "./lib/interface";

async function getBlogPosts() {
  const query = `
      *[_type == "blog"] | order(_createdAt desc) {
        title,
        smallDescription,
        "currentslug": slug.current,
        titleImage
      }`;

  const data = await sanityClient.fetch(query);

  return data;
}

export default async function Home() {
  const data: simpleBlogCard[] = await getBlogPosts();

  console.log(data);
  return (
    <div className="flex flex-col justify-center my-8 mx-8">
        <h3 className="text-3xl text-center font-semibold">Blog</h3>
        <div className="grid gris-cols-1 lg:grid-cols-4 gap-4 mt-5">
            {data.map((blog, index) => (
                <div className="bg-slate-500 p-4 flex flex-col justify-between rounded-lg shadow-lg" key={index}>
                  <div className="w-full bg-black">
                    <Image
                        src={urlFor(blog.titleImage).url()}
                        alt={blog.title}
                        width={400}
                        height={400}
                        className="rounded-lg object-contain"
                    />
                  </div>
                    <h3 className="text-xl font-semibold mt-4">{blog.title}</h3>
                    <p className="text-white mt-2">{blog.smallDescription}</p>
                    <a href={`/blog/${blog.currentslug}`} className="text-white mt-2">Read More</a>
                </div>
            ))}

        </div>
    </div>
  );
}
