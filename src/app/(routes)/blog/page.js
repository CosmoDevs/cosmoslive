import Link from "next/link";
import { client } from "../../lib/sanity";

export const revalidate = 60; // ISR (auto refresh blogs)

export default async function BlogPage() {
  const posts = await client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug
    }
  `);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Blogs</h1>

      {posts.length === 0 && <p>No blogs found</p>}

      {posts.map((post) => (
        <div key={post._id} style={{ marginBottom: "10px" }}>
          <Link href={`/blog/${post.slug.current}`}>{post.title}</Link>
        </div>
      ))}
    </div>
  );
}
