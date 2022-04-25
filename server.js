import { WebSocketServer } from "https://deno.land/x/websocket@v0.1.4/mod.ts";

import BoringEvent from "./event.js";

const connectionMap = {};

const wss = new WebSocketServer(8080);
wss.on("connection", (ws) => {
  ws.on("message", (s) => {
    const pack = JSON.parse(s);
    console.log(pack);
    switch (pack.event) {
      case BoringEvent.Login:
        const id = pack.id;
        connectionMap[id] = ws;
        console.log(`user id ${id} login`);
        break;
      case BoringEvent.Send:
        const receiverID = pack.receiverID;
        const message = pack.message;
        if (connectionMap[receiverID]) connectionMap[receiverID].send(message);
    }
  });
});
