-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Genres" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "content_type" TEXT NOT NULL,
    "creation_timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "record_timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Genres_content_type_fkey" FOREIGN KEY ("content_type") REFERENCES "ContentType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Genres" ("content_type", "id", "name") SELECT "content_type", "id", "name" FROM "Genres";
DROP TABLE "Genres";
ALTER TABLE "new_Genres" RENAME TO "Genres";
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
    "record_timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ContentList_content_status_fkey" FOREIGN KEY ("content_status") REFERENCES "ContentStatus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ContentList_content_type_fkey" FOREIGN KEY ("content_type") REFERENCES "ContentType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ContentList" ("content_status", "content_type", "creation_timestamp", "genres", "global_rating", "id", "images", "name", "personal_rating", "type") SELECT "content_status", "content_type", "creation_timestamp", "genres", "global_rating", "id", "images", "name", "personal_rating", "type" FROM "ContentList";
DROP TABLE "ContentList";
ALTER TABLE "new_ContentList" RENAME TO "ContentList";
CREATE TABLE "new_ContentStatus" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL,
    "creation_timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "record_timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_ContentStatus" ("creation_timestamp", "id", "status") SELECT "creation_timestamp", "id", "status" FROM "ContentStatus";
DROP TABLE "ContentStatus";
ALTER TABLE "new_ContentStatus" RENAME TO "ContentStatus";
CREATE TABLE "new_ContentType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "creation_timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "record_timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_ContentType" ("id", "name") SELECT "id", "name" FROM "ContentType";
DROP TABLE "ContentType";
ALTER TABLE "new_ContentType" RENAME TO "ContentType";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
