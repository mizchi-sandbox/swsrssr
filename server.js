import "@babel/polyfill";

import express from "express";
import url from "url";
import path from "path";
import router from "./src/router";
import createStore from "./src/createStore";
import { ROUTE, REDIRECT } from "./src/reducers/router";

import { render } from "./src/ssr";
const app = express();

app.get("*", async (req, res) => {
  console.log("req", req.url);
  const extname = path.extname(req.url);
  const parsed = url.parse(req.url);
  if ([".js"].includes(extname)) {
    return res.sendFile(path.join(__dirname, "dist", parsed.path));
  } else {
    const action = await router
      .resolve(parsed.pathname)
      .catch(e => ({ type: "nop" }));

    console.log("ACTION", action);

    if (action.type === ROUTE) {
      const store = createStore();
      store.dispatch(action);
      const html = render(store);
      res.status(200).send(html);
    } else {
      res.status(404).send(`Not Found`);
    }
  }
});

app.listen(3300, () => {
  console.log("Example app listening on port 3300!");
});
