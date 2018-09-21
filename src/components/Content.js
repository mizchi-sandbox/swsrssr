import React from "react";
import { connect } from "react-redux";

export default connect(state => ({ location: state.router.location }))(
  props => {
    switch (props.location) {
      case "home": {
        return (
          <>
            <h2>Home</h2>
          </>
        );
      }
      case "about": {
        return (
          <>
            <h2>About</h2>
          </>
        );
      }
      case "items": {
        return (
          <>
            <h2>Items</h2>
            <hr />
            <a href="/items/1">Item:1</a>
            <br />
            <a href="/items/2">Item:2</a>
            <br />
            <a href="/items/3">Item:3</a>
          </>
        );
      }
      case "item": {
        return (
          <>
            <h2>Item</h2>
          </>
        );
      }
    }
  }
);
