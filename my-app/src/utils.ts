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
