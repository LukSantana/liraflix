/*
 Warnings:
 
 - The primary key for the `ContentList` table will be changed. If it partially fails, the table could be left without primary key constraint.
 - The primary key for the `ContentType` table will be changed. If it partially fails, the table could be left without primary key constraint.
 - The primary key for the `ContentStatus` table will be changed. If it partially fails, the table could be left without primary key constraint.
 - The primary key for the `Genres` table will be changed. If it partially fails, the table could be left without primary key constraint.
 
 */
-- RedefineTables
PRAGMA foreign_keys = OFF;
CREATE TABLE "new_ContentList" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "content_status" TEXT NOT NULL,
    "global_rating" REAL NOT NULL DEFAULT 0,
    "personal_rating" REAL DEFAULT 0,
    "genres" TEXT NOT NULL,
    "images" TEXT NOT NULL,
    "creation_timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ContentList_content_status_fkey" FOREIGN KEY ("content_status") REFERENCES "ContentStatus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
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
CREATE TABLE "new_ContentType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);
INSERT INTO "new_ContentType" ("id", "name")
SELECT "id",
    "name"
FROM "ContentType";
DROP TABLE "ContentType";
ALTER TABLE "new_ContentType"
    RENAME TO "ContentType";
CREATE TABLE "new_ContentStatus" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL,
    "creation_timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_ContentStatus" ("creation_timestamp", "id", "status")
SELECT "creation_timestamp",
    "id",
    "status"
FROM "ContentStatus";
DROP TABLE "ContentStatus";
ALTER TABLE "new_ContentStatus"
    RENAME TO "ContentStatus";
CREATE TABLE "new_Genres" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
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