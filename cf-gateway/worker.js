export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (
      url.pathname === "/opengraph-image.png" ||
      url.pathname === "/twitter-image.png"
    ) {
      const assetRequest = new Request(
        new URL("/opengraph-image.png", url.origin),
        request,
      );
      const asset = await env.ASSETS.fetch(assetRequest);
      if (asset.ok) {
        const headers = new Headers(asset.headers);
        headers.set("content-type", "image/png");
        headers.set("cache-control", "public, max-age=86400");
        return new Response(asset.body, { status: 200, headers });
      }
    }

    const originResponse = await env.ORIGIN.fetch(request);
    const contentType = originResponse.headers.get("content-type") ?? "";
    if (!contentType.includes("text/html")) {
      return originResponse;
    }

    const imageUrl = `${url.origin}/opengraph-image.png`;
    return new HTMLRewriter()
      .on('meta[property="og:image"]', {
        element(element) {
          element.setAttribute("content", imageUrl);
        },
      })
      .on('meta[name="twitter:image"]', {
        element(element) {
          element.setAttribute("content", imageUrl);
        },
      })
      .on('meta[property="og:image:alt"]', {
        element(element) {
          element.setAttribute("content", "Nawazish Khan — Software Engineer");
        },
      })
      .transform(originResponse);
  },
};
