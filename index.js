import { Server } from "socket.io"
import { createServer } from "http"

const httpServer = createServer()
const io = new Server( httpServer, {
    cors: {
        origin: "*",
        methods: [ "GET", "POST" ],
    }
} )

httpServer.listen( 3000, () => {

    console.log( "Server listening on port 3000" )
} )