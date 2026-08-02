// src/types/academy.ts

export interface Course {
  id: string;
  title: string;
  description: string;
  short_description: string;
  price_ghs: number;
  thumbnail_url: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  duration_hours: number;
  lessons_count: number;
  instructor: Instructor;
  rating: number;
  reviews_count: number;
  is_featured: boolean;
  tags: string[];
  curriculum: Lesson[];
  requirements: string[];
  what_youll_learn: string[];
}

export interface Instructor {
  id: string;
  name: string;
  avatar_url: string;
  bio: string;
  rating: number;
  courses_count: number;
  students_count: number;
}

export interface Lesson {
  id: string;
  course_id: string;
  title: string;
  description: string;
  video_url?: string;
  duration_seconds: number;
  order: number;
  is_free_preview?: boolean;
  materials?: CourseMaterial[];
}

export interface CourseMaterial {
  id: string;
  lesson_id: string;
  title: string;
  type: "pdf" | "doc" | "link";
  url: string;
}

export interface CourseProgress {
  id: string;
  course_id: string;
  user_id: string;
  completed_lessons: string[];
  last_accessed_at: string;
  started_at: string;
  completed_at?: string;
  is_completed: boolean;
}
