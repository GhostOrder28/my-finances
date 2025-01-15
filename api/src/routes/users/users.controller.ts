import { Request, Response } from "express";

import { getUserAssets } from "../../models/users/users.model.js";

type Params = { userid: string };

async function httpGetUserAssets (req: Request<Params>, res: Response) {
  const { userid } = req.params;

  try {
    const userAssets = await getUserAssets(userid);
    return res.status(201).json({ userAssets });
  } catch (err) {
    throw new Error(`there was an error: ${err}`)
  }
}

export {
  httpGetUserAssets,
}
