import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";
import { pipeline } from "stream";
import { promisify } from "util";

const pipelineAsync = promisify(pipeline);

async function generateSitemap() {
  const sitemap = new SitemapStream({
    hostname: "https://www.gillesgrethen.com",
  });

  sitemap.write({ url: "/", changefreq: "weekly", priority: 1.0 });
  sitemap.write({ url: "/about", changefreq: "weekly", priority: 0.8 });
  sitemap.write({ url: "/music", changefreq: "weekly", priority: 0.8 });
  sitemap.write({ url: "/shop", changefreq: "weekly", priority: 0.8 });
  sitemap.write({ url: "/chroma", changefreq: "weekly", priority: 0.8 });
  sitemap.write({ url: "/blog", changefreq: "weekly", priority: 0.8 });

  sitemap.end();

  const writeStream = createWriteStream("./public/sitemap.xml");
  await pipelineAsync(sitemap, writeStream);
  console.log("Sitemap generated successfully!");
}

generateSitemap();
