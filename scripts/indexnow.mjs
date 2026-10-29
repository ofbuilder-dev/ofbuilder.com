// Tells Bing (and other IndexNow search engines such as Yandex, Seznam and Naver) about every page
// in the live sitemap, so new and updated pages are crawled within hours. Runs after each deploy.
const HOST = "ofbuilder.com";
const KEY = "874fcb7d3f1b998d072a79614b1b5701"; // also served at https://ofbuilder.com/874fcb7d3f1b998d072a79614b1b5701.txt to prove ownership

const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urlList.length) {
  console.warn("IndexNow: no URLs found in sitemap, skipping");
  process.exit(0);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});
// 200/202 = accepted. Anything else is logged but never fails the deploy.
console.log(`IndexNow: submitted ${urlList.length} URLs, response ${res.status} ${res.statusText}`);
