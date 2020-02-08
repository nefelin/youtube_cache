import { youtubeSearchList } from "./data/youtube";
import * as express from "express";
import { routeYoutubeSearch } from "./routes/youtubeSearch";
// import { cors } from "cors";
const cors = require('cors');
const app = express();
const port = 3431;

app.use(cors());
app.get("/youtube-search", routeYoutubeSearch);

app.listen(port, "localhost", () => console.log(`Listening on port ${port}`));
