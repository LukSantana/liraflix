/*
  Warnings:

  - You are about to drop the column `content_type` on the `Genres` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `ContentList` table. All the data in the column will be lost.
  - Added the required column `content_status` to the `ContentList` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "ContentStatus" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL,
    "creation_timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ContentType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_ContentType" ("id", "name") SELECT "id", "name" FROM "ContentType";
DROP TABLE "ContentType";
ALTER TABLE "new_ContentType" RENAME TO "ContentType";
CREATE TABLE "new_Genres" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Genres" ("id", "name") SELECT "id", "name" FROM "Genres";
DROP TABLE "Genres";
ALTER TABLE "new_Genres" RENAME TO "Genres";
CREATE TABLE "new_ContentList" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "content_status" INTEGER NOT NULL,
    "global_rating" REAL NOT NULL DEFAULT 0,
    "personal_rating" REAL DEFAULT 0,
    "genres" TEXT NOT NULL,
    "images" TEXT NOT NULL,
    "creation_timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ContentList_content_status_fkey" FOREIGN KEY ("content_status") REFERENCES "ContentStatus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ContentList" ("creation_timestamp", "genres", "global_rating", "id", "images", "name", "personal_rating", "type") SELECT "creation_timestamp", "genres", "global_rating", "id", "images", "name", "personal_rating", "type" FROM "ContentList";
DROP TABLE "ContentList";
ALTER TABLE "new_ContentList" RENAME TO "ContentList";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
