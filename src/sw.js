import url from "url";
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "./components/App";
import createStore from "./createStore";
import { ROUTE, REDIRECT } from "./reducers/router";
import router from "./router";

const render = store => {
  console.time("ssr");
  const html = ReactDOMServer.renderToString(<App store={store} />);
  console.timeEnd("ssr");
  return `<html>
<head>
  <title>SSR</title>
</head>
<body style="margin: 0">
  <div class="root">${html}</div>
  <script type="module">
    const INCLUDE_MAIN = true;
    ;(async () => {
      window.__initialState = ${JSON.stringify(store.getState())}
      await navigator.serviceWorker.register('/sw.bundle.js');
      const r = await navigator.serviceWorker.ready;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        location.reload();
      })
      setInterval(() => r.update(), 1000)
      if (INCLUDE_MAIN) {
        import("./main.bundle.js")
      } else {
        document.body.addEventListener('click', e => {
          console.log(e.target)
        })
      }
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
  const parsed = new URL(event.request.url);

  event.respondWith(
    (async () => {
      const action = await router.resolve(parsed.pathname).catch(e => {
        return {
          type: "nop"
        };
      });
      if (action.type === ROUTE) {
        const store = createStore();
        store.dispatch(action);
        return new Response(render(store), {
          headers: {
            "Content-Type": "text/html"
          }
        });
      } else if (action.type === REDIRECT) {
        // TODO: route
        return fetch(event.request);
      } else {
        return fetch(event.request);
      }
    })()
  );
});
