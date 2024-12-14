const { PrismaClient } = await import("@prisma/client")
const client = new PrismaClient()

client.employee.create({data: {username: "test", salt: "test", verifier: "test"}})

