import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Seed moods
  const moods = [
    { type: 'anxious' },
    { type: 'tempted' },
    { type: 'grateful' },
    { type: 'happy' },
    { type: 'sad' },
    { type: 'angry' },
    { type: 'calm' },
  ];
  for (const mood of moods) {
    await prisma.mood.upsert({
      where: { type: mood.type },
      update: {},
      create: mood,
    });
  }

  // Seed users (example users for each language)
  const users = [
    { email: 'user.en@example.com', preferredLanguage: 'en', streakCount: 0 },
    { email: 'user.ar@example.com', preferredLanguage: 'ar', streakCount: 0 },
    { email: 'user.ms@example.com', preferredLanguage: 'ms', streakCount: 0 },
    { email: 'user.tr@example.com', preferredLanguage: 'tr', streakCount: 0 },
    { email: 'user.fr@example.com', preferredLanguage: 'fr', streakCount: 0 },
    { email: 'user.ur@example.com', preferredLanguage: 'ur', streakCount: 0 },
  ];
  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }

  // Seed a sample chat and conversation topic for each user
  const allUsers = await prisma.user.findMany();
  for (const user of allUsers) {
    const chat = await prisma.chat.create({
      data: {
        ownerId: user.id,
        content: `Welcome chat for ${user.preferredLanguage}`,
        mode: 'default',
        preferredLanguage: user.preferredLanguage,
      },
    });
    const mood = await prisma.mood.findFirst();
    await prisma.conversationTopic.create({
      data: {
        title: 'First Topic',
        saved: false,
        chatId: chat.id,
        userId: user.id,
        moodId: mood?.id,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 