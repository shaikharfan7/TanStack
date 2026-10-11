import { prisma } from './db'
import { createServerFn } from '@tanstack/react-start';

export const getProducts = createServerFn().handler(async()=>{
    const products =   await prisma.product.findMany({
    orderBy: { name: 'asc' },
  })
  return products
})


export const getProductById = createServerFn()
  .validator((data: { id: string }) => data)
  .handler(async({data})=>{
    const {id} = data
      return prisma.product.findUnique({
    where: { id },
  })
})

export const createProduct = createServerFn({ method: 'POST' })
  .validator((data: { name: string; description: string }) => {
    const name = data.name.trim()
    const description = data.description.trim()

    if (name.length === 0 || name.length > 80) {
      throw new Error('Product name must be between 1 and 80 characters.')
    }

    if (description.length > 240) {
      throw new Error('Description must be 240 characters or fewer.')
    }

    return { name, description }
  })
  .handler(async ({ data }) => {
    return prisma.product.create({ data })
  })

// export const getProducts = async () => {
//   return prisma.product.findMany({
//     orderBy: { name: 'asc' },
//   })
// }

// export const getProductById = async (id: string) => {
//   return prisma.product.findUnique({
//     where: { id },
//   })
// }
