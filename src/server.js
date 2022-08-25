import app from "./config/app.js";
import "./config/database.js";
import { PORT } from "./config/config.js";

app.listen(PORT);
console.log("Server on port", app.get("port"));