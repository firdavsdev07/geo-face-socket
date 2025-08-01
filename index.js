import { Server } from "socket.io"
import { createServer } from "http"
import moment from 'moment';

const usersCollection = []

const httpServer = createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.end('Socket.IO server is running')
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.end('Not Found')
    }
})

const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
})

io.on("connection", (socket) => {
    console.log("connection user", socket.id)

    socket.emit('user-added', usersCollection)
    socket.on("add-user", (user) => {
        const userData = {
            socketId: socket.id,
            username: user.username,
            avatarName: user.avatarName,
            avatarBuffer: user.avatarBuffer,
            coordinates: user.coordinates || null,
            joinedAt: moment().fromNow(),
        }

        usersCollection.push(userData)
        io.emit('user-added', usersCollection)

        console.table(userData)
        console.log("-------------------------------------------------")
        console.table(usersCollection)
        console.log("-------------------------------------------------")
    })

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`)
    })
})

httpServer.listen(3000, '0.0.0.0', () => {
    console.log("Server listening on port 3000")
})