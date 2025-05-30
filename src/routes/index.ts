import { Router } from "express";

import transactionRouter from "./transaction";

const apiRouter: Router = Router();

apiRouter.use("/transaction", transactionRouter);

export default apiRouter;
