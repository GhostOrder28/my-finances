import { Request, Response, NextFunction } from "express";
import { 
  postClient, 
  patchClient, 
  getClients, 
  getOneClient, 
  deleteOneClient 
} from "../../models/clients/clients.model";
import { ClientEditableFields } from "../../types/client.types";
import { SingleQuery, HttpUseridParam, HttpClientidParam } from "../../types/global.types";
import { qsToBool, strParseIn, strParseOut, getValidationErrorMessages } from "../../utils/utility-functions";
import clientValidators from "../../joi/client.validators";
import { ValidationError } from "../../errors/server-errors";
import { NotFoundError } from '../../errors/db-errors';

type httpDeleteOneClientParams = HttpUseridParam & HttpClientidParam;

async function httpPostClient (req: Request<HttpUseridParam, any, ClientEditableFields>, res: Response, next: NextFunction) {
  try {
    const { userid } = req.params;

    const { error } = clientValidators.validate(req.body, { abortEarly: false });
    if (error) throw new ValidationError('there was an error validating the input', getValidationErrorMessages(error.details));
    
    const clientId = await postClient(userid, req.body);
    return res.status(201).json({ clientId });
  } catch (err) {
    if (err instanceof NotFoundError) return next(err);
    if (err instanceof ValidationError) return next(err);
    throw new Error(`there was an error: ${err}`)
  }
}

async function httpPatchClient (req: Request<HttpClientidParam, any, ClientEditableFields>, res: Response, next: NextFunction) {
  try {
    const { clientid } = req.params;

    const { error } = clientValidators.validate(req.body, { abortEarly: false });
    if (error) throw new ValidationError('there was an error validating the input', getValidationErrorMessages(error.details));

    const clientId = await patchClient(clientid, req.body);
    return res.status(200).json({ clientId });
  } catch (err) {
    if (err instanceof NotFoundError) return next(err);
    if (err instanceof ValidationError) return next(err);
    throw new Error(`there was an error: ${err}`)
  }
}

async function httpGetClients (req: Request<HttpUseridParam, any ,any, SingleQuery>, res: Response, next: NextFunction) {
  if (req.query.single && qsToBool(req.query.single)) return next();
  const { userid } = req.params;
  try {
    const clientList = await getClients(userid);
    return res.status(200).json({ clientList });
  } catch (err) {
    if (err instanceof NotFoundError) return next(err);
    throw new Error(`there was an error: ${err}`)
  }
};

async function httpGetOneClient (req: Request<HttpClientidParam>, res: Response, next: NextFunction) {
  const { clientid } = req.params;   
  try {
    const clientData = await getOneClient(clientid);
    return res.status(200).json({ clientData });
  } catch (err) {
    if (err instanceof NotFoundError) return next(err);
    throw new Error(`there was an error: ${err}`)
  }
};

async function httpDeleteOneClient (req: Request<httpDeleteOneClientParams>, res: Response, next: NextFunction) {
  const { userid, clientid } = req.params;   
  try {
    const clientId = await deleteOneClient(userid, clientid);
    return res.status(200).json({ clientId });
  } catch (err) {
    if (err instanceof NotFoundError) return next(err);
    throw new Error(`there was an error: ${err}`)
  }
};

export {
  httpPostClient,
  httpPatchClient,
  httpGetClients,
  httpGetOneClient,
  httpDeleteOneClient,
}
