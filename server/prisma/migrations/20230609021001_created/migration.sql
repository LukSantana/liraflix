/*
 Warnings:
 
 - Added the required column `content_type` to the `ContentList` table without a default value. This is not possible if the table is not empty.
 - Added the required column `content_type` to the `Genres` table without a default value. This is not possible if the table is not empty.
 
 */
-- RedefineTables
PRAGMA foreign_keys = OFF;
CREATE TABLE "new_ContentList" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "content_status" TEXT NOT NULL,
  "content_type" TEXT NOT NULL,
  "global_rating" REAL NOT NULL DEFAULT 0,
  "personal_rating" REAL DEFAULT 0,
  "genres" TEXT NOT NULL,
  "images" TEXT NOT NULL,
  "creation_timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ContentList_content_status_fkey" FOREIGN KEY ("content_status") REFERENCES "ContentStatus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "ContentList_content_type_fkey" FOREIGN KEY ("content_type") REFERENCES "ContentType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ContentList" (
    "content_status",
    "creation_timestamp",
    "genres",
    "global_rating",
    "id",
    "images",
    "name",
    "personal_rating",
    "type"
  )
SELECT "content_status",
  "creation_timestamp",
  "genres",
  "global_rating",
  "id",
  "images",
  "name",
  "personal_rating",
  "type"
FROM "ContentList";
DROP TABLE "ContentList";
ALTER TABLE "new_ContentList"
  RENAME TO "ContentList";
CREATE TABLE "new_Genres" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "content_type" TEXT NOT NULL,
  CONSTRAINT "Genres_content_type_fkey" FOREIGN KEY ("content_type") REFERENCES "ContentType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Genres" ("id", "name")
SELECT "id",
  "name"
FROM "Genres";
DROP TABLE "Genres";
ALTER TABLE "new_Genres"
  RENAME TO "Genres";
PRAGMA foreign_key_check;
PRAGMA foreign_keys = ON;