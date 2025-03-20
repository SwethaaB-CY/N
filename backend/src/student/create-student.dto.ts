/* eslint-disable prettier/prettier */
export class CreateStudentDto {
    userId: string;
    schoolName: string;
    schoolAddress: string;
    tenthPercent: number;
    twelfthPercent: number;
    collegeName: string;
    collegeAddress: string;
    degree: string;
    branch: string;
    cgpa: number;
    resumeFile: string;
    skills: string[];
    certifications: { name: string; description: string; link?: string; file?: string }[];
    achievements: { event: string; description: string; link?: string; file?: string }[];
    projects: { title: string; description: string; link?: string; file?: string }[];
    socialLinks: object;
    additionalInfo?: string;
    interestedDomain?: string;
    desiredRole?: string;
  }
  