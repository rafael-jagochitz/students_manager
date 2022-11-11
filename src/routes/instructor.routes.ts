import { Router } from "express";
import { createInstructorController } from "../constrollers/instructor.controller";

export const instructorRouter = Router()

instructorRouter.post('/', createInstructorController)