import { Request, Response } from "express";
import { postClient } from "../../models/clients/clients.model";
import { Client } from "../../types/client.types";

async function httpPostClient (req: Request<{ userid: string }, any, Client>, res: Response) {
  const userId = req.params.userid;
  await postClient(userId, req.body);
  return res.status(200).json('success')
}

export {
  httpPostClient,
}
