import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "./App";
import createStore from "./createStore";

const render = () => {
  const store = createStore();
  const html = ReactDOMServer.renderToString(<App store={store} />);
  return `<html>
<head>
  <title>SSR</title>
</head>
<body>
  <div class="root">${html}</div>
  <script type="module">
    ;(async () => {
      window.__initialState = ${JSON.stringify(store.getState())}
      await navigator.serviceWorker.register('/sw.bundle.js');
      const r = await navigator.serviceWorker.ready;
      setInterval(() => r.update(), 1000)
      import("./main.bundle.js")
    })();
  </script>
</body>
</html>
`;
};

self.addEventListener("install", function(event) {
  console.log("sw:installed");
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", function(event) {
  console.log("sw:activated");
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);
  if (url.pathname === "/") {
    event.respondWith(
      (async => {
        return new Response(render(), {
          headers: {
            "Content-Type": "text/html"
          }
        });
      })()
    );
  }
});
