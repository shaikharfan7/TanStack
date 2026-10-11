import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const products = [
  { name: 'Football' },
  { name: 'Hat' },
  { name: 'Cool Shoes' },
  { name: 'Basketball' },
  { name: 'Tennis Racket' },
  { name: 'Running Shoes' },
  { name: 'Backpack' },
  { name: 'Water Bottle' },
  { name: 'Sweatshirt' },
  { name: 'Yoga Mat' },
  { name: 'Cycling Helmet' },
  { name: 'Sunglasses' },
  { name: 'Badminton Set' },
]

let addedCount = 0

try {
  for (const product of products) {
    const existingProduct = await prisma.product.findFirst({
      where: { name: product.name },
      select: { id: true },
    })

    if (!existingProduct) {
      await prisma.product.create({ data: product })
      addedCount += 1
    }
  }

  console.log(`Seeded ${addedCount} new products; ${products.length - addedCount} already existed.`)
} finally {
  await prisma.$disconnect()
}
