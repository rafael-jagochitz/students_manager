import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import { routes } from './routes'
import { AppError } from './errors/AppError'

export const prisma = new PrismaClient()

export const app = express()

app.use(cors())

app. use(express.json())

app.use(routes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof AppError) {
    res.status(err.status).send({
      response: 'Error',
      status: err.status,
      message: err.message
    })
  }

  console.log(err)

  return res.status(500).send({
    response: 'Error',
    status: 500,
    details: {
      error_name: err.name,
      error_message: err.message
    }
  })
})