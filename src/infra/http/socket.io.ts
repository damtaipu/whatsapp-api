import { Server } from "socket.io";

export default class SocketIo {
  static serverIo(http): Server {
    return new Server(http, {
        cors: {
            origin: '*',
            credentials: true
        }
    });
  }
}