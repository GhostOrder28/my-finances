import { Request, Response } from "express";
import { postClient, patchClient, getClients } from "../../models/clients/clients.model";
import { ClientEditableFields } from "../../types/client.types";

type HttpPostClientParams = { userid: string }
type HttpPatchClientParams = { clientid: string }

type HttpGetClientsParams = { userid: string }


async function httpPostClient (req: Request<HttpPostClientParams, any, ClientEditableFields>, res: Response) {
  const { userid } = req.params;
  const clientData = await postClient(userid, req.body);
  return res.status(201).json({ clientData })
}

async function httpPatchClient (req: Request<HttpPatchClientParams, any, ClientEditableFields>, res: Response) {
  const { clientid } = req.params;
  const clientData = await patchClient(clientid, req.body);
  return res.status(200).json({ clientData })
}

async function httpGetClients (req: Request<HttpGetClientsParams>, res: Response) {
  const { userid } = req.params;
  const clientList = await getClients(userid);
  return res.status(200).json({ clientList })
};


export {
  httpPostClient,
  httpPatchClient,
  httpGetClients,
}
