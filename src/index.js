import React, { useState } from "react";
import ReactDOM from "react-dom";

import "styles/5grid/core.css";
import "styles/5grid/core-desktop.css";
import "styles/5grid/core-1200px.css";
import "styles/5grid/core-noscript.css";
import "styles/style.css";
import "styles/style-desktop.css";
import "styles/style-1200px.css";

import Home from "./Home";

import fiveGridInit from "components/5grid";
import SmallCalendar from "./components/SmallCalendar";
import ArtPaginator from "./components/ArtPaginator";

ReactDOM.render(<Home/>, document.getElementById("home"));
ReactDOM.render(<ArtPaginator/>, document.getElementById("paginator"));
ReactDOM.render(<SmallCalendar/>, document.getElementById("small_calendar"));

window.fiveGridInit();