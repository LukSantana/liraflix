-- CreateTable
CREATE TABLE "ContentList" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "global_rating" REAL NOT NULL DEFAULT 0,
    "personal_rating" REAL DEFAULT 0,
    "genres" TEXT NOT NULL,
    "images" TEXT NOT NULL,
    "creation_timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Genres" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "content_type" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "ContentType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    CONSTRAINT "ContentType_id_fkey" FOREIGN KEY ("id") REFERENCES "Genres" ("content_type") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Genres_content_type_key" ON "Genres"("content_type");
