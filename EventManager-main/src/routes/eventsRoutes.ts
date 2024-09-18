import { Router } from "express";
import { EventsController } from "../controllers/eventsController";
import { registerController } from "../controllers/registerController";
import { signinController } from "../controllers/signinController";
import { authMiddleware } from "../middlewares/auth";

const routes = Router();
const eventController = new EventsController();

// Rotas de Autenticação
routes.post("/register", registerController);
routes.post("/signin", signinController);

// Rotas CRUD para Eventos
routes.post("/events", authMiddleware, eventController.createEvent.bind(eventController));
routes.get("/events", authMiddleware, eventController.getEvents.bind(eventController));
routes.get("/events/:id", authMiddleware, eventController.getEventById.bind(eventController));
routes.delete("/events/:id", authMiddleware, eventController.deleteEvent.bind(eventController));
routes.put("/events/:id", authMiddleware, eventController.updateEvent.bind(eventController));

export default routes;
