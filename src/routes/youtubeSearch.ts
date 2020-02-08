import { youtubeSearchList } from "../data/youtube";

const redis = require("redis");

const redisClient = redis.createClient();

redisClient.on("error", err => console.log("redis error:", err));

export const routeYoutubeSearch = (req, res) => {
  console.log("received request");
  const query = (req.query.query || "").trim();

  return redisClient.get(youtubeRedisLabel(query), (err, redisRes) => {
    if (redisRes) {
      console.log("FROM REDIS!");

      const resultJSON = JSON.parse(redisRes);
      return res.status(200).json(resultJSON);
    } else {
      youtubeSearchList(query).then(items => {
        console.log("retrieved from youtube proper");
        redisClient.set(youtubeRedisLabel(query), JSON.stringify(items));
        return res.status(200).json(items);
      });
    }
  });
};

const youtubeRedisLabel = (val: string) => `youtubeSearchList:${val}`;
