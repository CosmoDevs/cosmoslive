import { client } from "../../../lib/sanity";
import { PortableText } from "@portabletext/react";

export const revalidate = 60;

export default async function BlogDetailPage({ params }) {
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]`,
    { slug: params.slug }, // ✅ string
  );

  if (!post) {
    return <div>Blog not found</div>;
  }

  return (
    <article style={{ padding: "20px" }}>
      <h1>{post.title}</h1>
      <PortableText value={post.body} />
    </article>
  );
}
