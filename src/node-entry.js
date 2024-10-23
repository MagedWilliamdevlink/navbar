import React from "react";
import ReactDOMServer from "react-dom/server";
import Root from "/src/rootcomponent.js";

export const getResponseHeaders = props => {
  return {
    "x-navbar": 1
  };
};

export function serverRender(props) {
  const htmlStream = ReactDOMServer.renderToString(<Root {...props} />);
  return { content: htmlStream };
}
