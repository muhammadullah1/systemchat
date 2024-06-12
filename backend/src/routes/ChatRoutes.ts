import express from "express";
import ChatController from "../controllers/ChatController";
import tokenAuth from "../middleware/tokenAuth";

const router = express.Router();

router.post("/send", tokenAuth, ChatController.sendPrivateMessage);
router.get("/messages/:roomId", ChatController.getMessages);
router.post("/room", tokenAuth, ChatController.createRoom);
router.get("/rooms", tokenAuth, ChatController.getRooms);
router.post("/room/addUser", tokenAuth, ChatController.addUserToRoom);
router.get("/userRooms/:userId", tokenAuth, ChatController.getUserRooms);

export default router;
