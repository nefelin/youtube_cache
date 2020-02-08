import * as r from "ramda";
import {YTDItem, YTDResults} from "./types";
import axios from "axios";
import {key} from "../../key";

const youtubeURL = "https://www.googleapis.com/youtube/v3/search";

export const youtubeSearchList = q =>
    axios
        .get<YTDResults>(youtubeURL, {
            params: {
                q,
                part: "snippet",
                maxResults: 3,
                key
            }
        })
        .then(getItems)
        .catch(e => console.log("error fetching youtube results", e));

const unescapeSnippet = r.evolve({
    snippet: {
        publishedAt: unescape,
        channelId: unescape,
        title: unescape,
        description: unescape,
        channelTitle: unescape,
        liveBroadcastContent: unescape,
    }
});

const getItems = r.pipe( r.pathOr<YTDItem[]>([],["data","items"]), r.map(unescapeSnippet));
