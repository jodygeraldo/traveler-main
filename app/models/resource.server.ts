import type * as DB from '~/db.server'
import prisma from '~/db.server'

export async function getResources(type?: DB.ResourceStatus) {
  return await prisma.resource.findMany({
    where: { status: type },
    select: {
      id: true,
      title: true,
      description: true,
      url: true,
      status: true,
    },
  })
}

export async function getResource(id: string) {
  return await prisma.resource.findUniqueOrThrow({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      url: true,
      status: true,
    },
  })
}

export async function addResource({
  userId,
  title,
  description,
  url,
  status,
}: {
  userId?: string
  title: string
  description: string
  url: string
  status?: DB.ResourceStatus
}) {
  return await prisma.resource.create({
    data: {
      title,
      description,
      url,
      status,
      submittedById: userId,
    },
    select: {
      id: true,
    },
  })
}

export async function updateResource({
  id,
  data,
}: {
  id: string
  data: {
    title?: string
    description?: string
    url?: string
    status?: DB.ResourceStatus
  }
}) {
  return await prisma.resource.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      url: data.url,
      status: data.status,
    },
    select: {
      id: true,
    },
  })
}

export async function updateResourceStatus({
  id,
  status,
}: {
  id: string
  status: DB.ResourceStatus
}) {
  return await prisma.resource.update({
    where: { id },
    data: { status },
    select: {
      id: true,
    },
  })
}

export async function deleteResource(id: string) {
  return await prisma.resource.delete({
    where: { id },
    select: {
      id: true,
    },
  })
}
