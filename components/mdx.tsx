import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Contribution } from "./contribution";
import { Experience } from "./experience";
import { YouTube } from "./youtube";

// Components usable inside any .md/.mdx content file.
const components = {
  YouTube,
  Contribution,
  Experience,
};

export function Mdx({ source }: { source: string }) {
  return (
    <div className="prose">
      <MDXRemote
        source={source}
        components={components}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
    </div>
  );
}
