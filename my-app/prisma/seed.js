import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const products = [
  { name: 'Football', description: 'A durable match ball for training and weekend games.' },
  { name: 'Hat', description: 'A lightweight cap for sunny days and outdoor adventures.' },
  { name: 'Cool Shoes', description: 'Everyday sneakers designed for comfort and standout style.' },
  { name: 'Basketball', description: 'A grippy indoor and outdoor ball for your next pickup game.' },
  { name: 'Tennis Racket', description: 'A balanced racket offering control for practice and play.' },
  { name: 'Running Shoes', description: 'Cushioned trainers built to keep your daily miles comfortable.' },
  { name: 'Backpack', description: 'A roomy everyday pack with space for gear, books, and essentials.' },
  { name: 'Water Bottle', description: 'A reusable bottle to keep you hydrated on the move.' },
  { name: 'Sweatshirt', description: 'A soft, warm layer for cool mornings and relaxed weekends.' },
  { name: 'Yoga Mat', description: 'A cushioned, non-slip mat for stretching and yoga sessions.' },
  { name: 'Cycling Helmet', description: 'A lightweight helmet to help protect you on every ride.' },
  { name: 'Sunglasses', description: 'Comfortable shades with UV protection for bright days.' },
  { name: 'Badminton Set', description: 'A ready-to-play set with rackets and shuttlecocks for two.' },
]

const randomPrice = () => Math.floor(Math.random() * 97 + 4) * 5

let addedCount = 0
let updatedCount = 0

try {
  for (const product of products) {
    const existingProduct = await prisma.product.findFirst({
      where: { name: product.name },
      select: { id: true, description: true, price: true },
    })

    if (!existingProduct) {
      await prisma.product.create({
        data: { ...product, price: randomPrice() },
      })
      addedCount += 1
    } else if (existingProduct.description !== product.description || existingProduct.price <= 0) {
      await prisma.product.update({
        where: { id: existingProduct.id },
        data: {
          description: product.description,
          ...(existingProduct.price <= 0 ? { price: randomPrice() } : {}),
        },
      })
      updatedCount += 1
    }
  }

  const unpricedProducts = await prisma.product.findMany({
    where: { price: { lte: 0 } },
    select: { id: true },
  })

  for (const product of unpricedProducts) {
    await prisma.product.update({
      where: { id: product.id },
      data: { price: randomPrice() },
    })
    updatedCount += 1
  }

  console.log(
    `Seeded ${addedCount} new products and updated ${updatedCount} existing products.`,
  )
} finally {
  await prisma.$disconnect()
}
