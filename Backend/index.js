require("dotenv").config();
const app = require("./src/app");
const PORT = process.env.PORT || 5000;
const type = process.env.TYPE || "DEV";

const { createServer } = require("http");
const { Server } = require("socket.io");

const Device = require("./src/models/device.model");

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: "*",
});

io.on("connection", async (socket) => {
    const _chats = await Device.find({});
    socket.emit("device", _chats);
    Device.watch().on("change", async (device) => {
        const _chats = await Device.find({});
        socket.emit("device", _chats);
    });
});

httpServer.listen(5050, () =>
    console.log(`The Server Run On port : ${PORT} at ${type}.`)
);
