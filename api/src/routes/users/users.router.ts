import express from "express";

import { httpGetUserAssets } from "./users.controller.js";

const usersRouter = express.Router();

usersRouter.get('/:userid', httpGetUserAssets);

export default usersRouter;
