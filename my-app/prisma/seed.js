import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const products = [
  { name: 'Football' },
  { name: 'Hat' },
  { name: 'Cool Shoes' },
]

await prisma.product.createMany({
  data: products,
})

console.log('Seeded product data')

await prisma.$disconnect()
