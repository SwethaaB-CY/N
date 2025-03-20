-- CreateTable
CREATE TABLE "StudentDetails" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "schoolName" TEXT NOT NULL,
    "schoolAddress" TEXT NOT NULL,
    "tenthPercent" DOUBLE PRECISION NOT NULL,
    "twelfthPercent" DOUBLE PRECISION NOT NULL,
    "tenthMarksheet" TEXT NOT NULL,
    "twelfthMarksheet" TEXT NOT NULL,
    "collegeName" TEXT NOT NULL,
    "collegeAddress" TEXT NOT NULL,
    "cgpa" DOUBLE PRECISION NOT NULL,
    "skills" TEXT[],
    "resumeFile" TEXT NOT NULL,
    "linkedIn" TEXT,
    "github" TEXT,
    "selfDescription" TEXT,
    "interestedDomain" TEXT,
    "desiredRole" TEXT,

    CONSTRAINT "StudentDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SemesterMarks" (
    "id" TEXT NOT NULL,
    "semester" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "SemesterMarks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certification" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "link" TEXT,
    "fileUrl" TEXT,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "Certification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" TEXT NOT NULL,
    "eventName" TEXT NOT NULL,
    "description" TEXT,
    "link" TEXT,
    "fileUrl" TEXT,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "link" TEXT,
    "fileUrl" TEXT,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StudentDetails_userId_key" ON "StudentDetails"("userId");

-- AddForeignKey
ALTER TABLE "StudentDetails" ADD CONSTRAINT "StudentDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SemesterMarks" ADD CONSTRAINT "SemesterMarks_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "StudentDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certification" ADD CONSTRAINT "Certification_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "StudentDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "StudentDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "StudentDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
