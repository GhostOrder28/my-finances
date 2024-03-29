import path from "path";
import { fileDirName } from "../utils/utility-functions.js";
import { NotFoundError, DuplicateEntityError } from "./db-errors.js";
import { AuthenticationError, AuthorizationError, ValidationError } from "./server-errors.js";
const { __dirname } = fileDirName(import.meta);
function errorHandler(err, _, res, next) {
    if (err instanceof NotFoundError)
        return res.status(404).json({ notFoundError: err.message });
    if (err instanceof AuthenticationError)
        return res.status(401).json({ authenticationError: err.message });
    if (err instanceof AuthorizationError)
        return res.status(401).sendFile(path.join(__dirname, "../public/index.html"));
    if (err instanceof DuplicateEntityError)
        return res.status(409).json({ duplicateEntityError: err.message });
    if (err instanceof ValidationError)
        return res.status(400).json({ validationError: err.errorDetails });
    next();
}
export default errorHandler;
