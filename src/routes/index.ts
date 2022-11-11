import { Router } from "express";
import { instructorRouter } from "./instructor.routes";

export const routes = Router()

routes.use('/instructors', instructorRouter)