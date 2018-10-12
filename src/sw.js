import createStore from "./createStore";
import { render } from "./ssr";
import { ROUTE, REDIRECT } from "./reducers/router";
import router from "./router";

self.addEventListener("install", event => {
  console.log("sw:installed");
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", event => {
  console.log("sw:activated");
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  const parsed = new URL(event.request.url);
  event.respondWith(
    (async () => {
      const action = await router
        .resolve(parsed.pathname)
        .catch(e => ({ type: "nop" }));

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
