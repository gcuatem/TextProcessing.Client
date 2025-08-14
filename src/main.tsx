import "bootstrap/dist/css/bootstrap.min.css";
import { render } from "preact";
import { App } from "./app.tsx";
import "./index.css";

render(<App />, document.getElementById("app")!);
