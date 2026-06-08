import { Server as HttpServer } from "http";
import { Server } from "socket.io";

export default class SocketIo {
    static serverIo(httpServer: HttpServer): Server {
        return new Server(httpServer, {
            cors: {
                origin: '*',
                credentials: true,
            },
        });
    }
}
