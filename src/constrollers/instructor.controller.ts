import { NextFunction, Request, Response } from "express";
import { createInstructorService } from "../services/instructor.services";

export const createInstructorController = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body

  try {
    const instructor = await createInstructorService(data)

    return res.send(instructor)
  } catch (error) {
    next(error)
  }
}