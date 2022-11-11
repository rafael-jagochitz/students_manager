import { Prisma } from "@prisma/client";
import { hash } from "bcryptjs";
import { randomUUID } from "crypto";
import { prisma } from "../app";
import { AppError } from "../errors/AppError";



export const createInstructorService = async (data: Prisma.InstructorCreateInput) => {
  const checkEmail = await prisma.instructor.findUnique({
    where: {
      email: data.email
    }
  })

  if(checkEmail) {
    throw new AppError('Email already in use')
  }

  const checkUsername = await prisma.instructor.findUnique({
    where: {
      username: data.username
    }
  })

  if(checkUsername) {
    throw new AppError('Username already in use')
  }

  const hashedPass = await hash(data.password, 8)

  const instructor = await prisma.instructor.create({
    data: {
      name: data.name,
      email: data.email,
      username: data.username,
      password: hashedPass,
      password_recover: randomUUID(),
    }
  })

  const {password, password_recover, ...rest} = instructor

  return rest
  
}