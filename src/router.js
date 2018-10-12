import UniversalRouter from "universal-router";
import createStore from "./createStore";
import { route, redirect } from "./reducers/router";

export const routes = [
  {
    path: "/",
    action: async context => {
      return route("home");
    }
  },
  {
    path: "/about",
    action: async () => {
      return route("about");
    }
  },
  {
    path: "/items",
    action: async () => {
      const store = createStore();
      return route("items");
    }
  },
  {
    path: "/items/:id",
    action: async () => {
      const store = createStore();
      return route("item");
    }
  }
];

const router = new UniversalRouter(routes);

export default router;
