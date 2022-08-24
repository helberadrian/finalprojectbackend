import User from "../models/user.js";
import Msn from "../models/msg.js";
import { Server } from "socket.io";
import logger from "../config/logger.js";

// Socket.io
const io = new Server(server);

export const emitMsn = async (req, res) => {
    const user = await User.findById(req.params.userId);
    const msn = req.body.message

    io.on('connection', (socket) => {
        socket.emit('connection', {
            userId: user,
            message: msn,
        })
      });
  };

