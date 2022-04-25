import { readLines } from "https://deno.land/std/io/buffer.ts";
import { StandardWebSocketClient } from "https://deno.land/x/websocket@v0.1.4/mod.ts";

import BoringEvent from "./event.js";

const endpoint = "ws://127.0.0.1:8080";
const ws = new StandardWebSocketClient(endpoint);

async function _prompt(q) {
  console.log(q);
  for await (const line of readLines(Deno.stdin)) {
    return line;
  }
}

ws.on("open", async () => {
  const myID = await _prompt("my id:");
  const loginMessage = { event: BoringEvent.Login, id: myID };
  ws.send(JSON.stringify(loginMessage));

  while (true) {
    const receiverID = await _prompt("Receiver id:");
    const message = await _prompt("Message:");
    const sendMessage = {
      event: BoringEvent.Send,
      receiverID: receiverID,
      message: `${message} from id: ${id}`,
    };
    ws.send(JSON.stringify(sendMessage));
  }
});

ws.on("message", (message) => {
  console.log(message.data);
});
