import * as Prisma from '@prisma/client'
import * as EdgeDB from 'edgedb'
import e from '../dbschema/edgeql-js'
export * as Type from '@prisma/client'
export * as Type1 from '../dbschema/edgeql-js'
export { client }
export { prisma }
export default e
const client = EdgeDB.createClient()

let prisma: Prisma.PrismaClient

declare global {
  var __db__: Prisma.PrismaClient
}

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
// in production we'll have a single connection to the DB.
if (process.env.NODE_ENV === 'production') {
  prisma = new Prisma.PrismaClient()
} else {
  if (!global.__db__) {
    global.__db__ = new Prisma.PrismaClient()
  }
  prisma = global.__db__
  prisma.$connect()
}
