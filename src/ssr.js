import React from "react";
import ReactDOMServer from "react-dom/server";

import createStore from "./createStore";
import { ROUTE, REDIRECT } from "./reducers/router";
import App from "./components/App";

export const render = store => {
  const html = ReactDOMServer.renderToString(<App store={store} />);
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
