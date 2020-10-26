import { Router } from "express";

import DiscController from "./app/controllers/DiscController";

const routes = new Router();

routes.get("/disciplina", DiscController.index);
routes.post("/disciplina", DiscController.store);

routes.put("/disciplina/:id", DiscController.update);
routes.delete("/disciplina/:id", DiscController.delete);

export default routes;
