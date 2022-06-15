/*
  Warnings:

  - Added the required column `text` to the `MessageOnChat` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MessageOnChat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "chat_id" TEXT NOT NULL,
    "message_id" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "MessageOnChat_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "Chat" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MessageOnChat_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "Author" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MessageOnChat_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "Message" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MessageOnChat" ("author_id", "chat_id", "created_at", "id", "message_id") SELECT "author_id", "chat_id", "created_at", "id", "message_id" FROM "MessageOnChat";
DROP TABLE "MessageOnChat";
ALTER TABLE "new_MessageOnChat" RENAME TO "MessageOnChat";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
