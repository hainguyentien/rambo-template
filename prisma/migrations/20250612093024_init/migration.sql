-- CreateEnum
CREATE TYPE "PreferredLanguage" AS ENUM ('en', 'ar', 'ms', 'tr', 'fr', 'ur');

-- CreateEnum
CREATE TYPE "ChatRole" AS ENUM ('user', 'AI');

-- CreateEnum
CREATE TYPE "ChatMode" AS ENUM ('public', 'private');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "preferredLanguage" "PreferredLanguage" NOT NULL,
    "streakCount" INTEGER NOT NULL DEFAULT 0,
    "moodId" TEXT,
    "subscriptionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" TEXT NOT NULL,
    "plan" TEXT NOT NULL,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "moods" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "moods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chats" (
    "id" TEXT NOT NULL,
    "role" "ChatRole" NOT NULL,
    "content" TEXT NOT NULL,
    "mode" "ChatMode" NOT NULL,
    "preferredLanguage" "PreferredLanguage" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "chats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversation_topics" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "saved" BOOLEAN NOT NULL DEFAULT false,
    "chatId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "moodId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "conversation_topics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "conversationTopicId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_subscriptionId_key" ON "users"("subscriptionId");

-- CreateIndex
CREATE INDEX "users_preferredLanguage_idx" ON "users"("preferredLanguage");

-- CreateIndex
CREATE INDEX "users_moodId_idx" ON "users"("moodId");

-- CreateIndex
CREATE INDEX "subscriptions_plan_idx" ON "subscriptions"("plan");

-- CreateIndex
CREATE UNIQUE INDEX "moods_type_key" ON "moods"("type");

-- CreateIndex
CREATE INDEX "chats_preferredLanguage_idx" ON "chats"("preferredLanguage");

-- CreateIndex
CREATE INDEX "chats_mode_idx" ON "chats"("mode");

-- CreateIndex
CREATE INDEX "conversation_topics_chatId_idx" ON "conversation_topics"("chatId");

-- CreateIndex
CREATE INDEX "conversation_topics_userId_idx" ON "conversation_topics"("userId");

-- CreateIndex
CREATE INDEX "conversation_topics_moodId_idx" ON "conversation_topics"("moodId");

-- CreateIndex
CREATE INDEX "conversation_topics_saved_idx" ON "conversation_topics"("saved");

-- CreateIndex
CREATE INDEX "notifications_conversationTopicId_idx" ON "notifications"("conversationTopicId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_moodId_fkey" FOREIGN KEY ("moodId") REFERENCES "moods"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "subscriptions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chats" ADD CONSTRAINT "chats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversation_topics" ADD CONSTRAINT "conversation_topics_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversation_topics" ADD CONSTRAINT "conversation_topics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversation_topics" ADD CONSTRAINT "conversation_topics_moodId_fkey" FOREIGN KEY ("moodId") REFERENCES "moods"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_conversationTopicId_fkey" FOREIGN KEY ("conversationTopicId") REFERENCES "conversation_topics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
