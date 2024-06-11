/*
  Warnings:

  - Made the column `photo` on table `Teacher` required. This step will fail if there are existing NULL values in that column.
  - Made the column `photo` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Teacher" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "photo" BLOB NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Teacher" ("created_at", "department", "id", "name", "photo", "updated_at") SELECT "created_at", "department", "id", "name", "photo", "updated_at" FROM "Teacher";
DROP TABLE "Teacher";
ALTER TABLE "new_Teacher" RENAME TO "Teacher";
CREATE UNIQUE INDEX "Teacher_name_key" ON "Teacher"("name");
CREATE TABLE "new_Assessment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Assessment_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Assessment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Assessment_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Assessment" ("content", "created_at", "id", "subjectId", "teacherId", "updated_at", "userId") SELECT "content", "created_at", "id", "subjectId", "teacherId", "updated_at", "userId" FROM "Assessment";
DROP TABLE "Assessment";
ALTER TABLE "new_Assessment" RENAME TO "Assessment";
CREATE TABLE "new_Comment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "assessmentId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Comment_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "Assessment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Comment" ("assessmentId", "content", "created_at", "id", "updated_at", "userId") SELECT "assessmentId", "content", "created_at", "id", "updated_at", "userId" FROM "Comment";
DROP TABLE "Comment";
ALTER TABLE "new_Comment" RENAME TO "Comment";
CREATE TABLE "new_TeacherSubject" (
    "teacherId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,

    PRIMARY KEY ("teacherId", "subjectId"),
    CONSTRAINT "TeacherSubject_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TeacherSubject_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TeacherSubject" ("created_at", "subjectId", "teacherId", "updated_at") SELECT "created_at", "subjectId", "teacherId", "updated_at" FROM "TeacherSubject";
DROP TABLE "TeacherSubject";
ALTER TABLE "new_TeacherSubject" RENAME TO "TeacherSubject";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "photo" BLOB NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_User" ("course", "created_at", "department", "email", "id", "name", "password", "photo", "updated_at") SELECT "course", "created_at", "department", "email", "id", "name", "password", "photo", "updated_at" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check("Teacher");
PRAGMA foreign_key_check("Assessment");
PRAGMA foreign_key_check("Comment");
PRAGMA foreign_key_check("TeacherSubject");
PRAGMA foreign_key_check("User");
PRAGMA foreign_keys=ON;
