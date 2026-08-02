"use client";

import { useParams, useRouter } from "next/navigation";
import { mockCourses } from "@/lib/mock-academy";
import {
  Star,
  Clock,
  BookOpen,
  ArrowLeft,
  CheckCircle,
  Play,
  User,
  Share2,
  Heart,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;
  const course = mockCourses.find((c) => c.id === courseId);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">Course not found</h2>
          <button
            onClick={() => router.push("/academy")}
            className="text-accent font-medium hover:underline"
          >
            Back to Academy
          </button>
        </div>
      </div>
    );
  }

  const handleEnroll = () => {
    toast.success(`Enrolled in ${course.title}!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-primary-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8">
          <button
            onClick={() => router.push("/academy")}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to courses
          </button>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-accent-300 text-xs font-medium px-3 py-1 bg-accent-900/30 rounded-full">
                  {course.category}
                </span>
                <span className="text-white/70 text-xs capitalize">
                  {course.level}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {course.title}
              </h1>
              <p className="text-lg text-white/80 mb-6">
                {course.short_description}
              </p>

              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-white/70">({course.reviews_count} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration_hours} hours total</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>{course.lessons_count} lessons</span>
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-lg font-bold">
                  {course.instructor.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="font-semibold">{course.instructor.name}</div>
                  <div className="text-sm text-white/70">
                    {course.instructor.courses_count} courses • {course.instructor.students_count.toLocaleString()} students
                  </div>
                </div>
              </div>
            </div>

            {/* Course Card */}
            <div className="bg-white rounded-2xl p-5 shadow-lg">
              <div className="aspect-video bg-gray-200 rounded-xl mb-4 overflow-hidden relative">
                <Image
                  src={course.thumbnail_url}
                  alt={course.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-accent ml-1" />
                  </div>
                </div>
              </div>
              
              <div className="text-3xl font-bold text-primary mb-4">
                GHS {course.price_ghs}
              </div>
              
              <button
                onClick={handleEnroll}
                className="w-full bg-accent text-white font-semibold py-3.5 rounded-xl hover:bg-accent-600 transition-colors mb-3"
              >
                Enroll Now
              </button>

              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors">
                  <Heart className="w-4 h-4" />
                  Save
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* What You'll Learn */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-primary mb-6">What You'll Learn</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {course.what_youll_learn.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-primary mb-6">Requirements</h2>
              <ul className="space-y-2">
                {course.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-primary mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* Curriculum */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-primary mb-6">Course Curriculum</h2>
              <div className="space-y-3">
                {course.curriculum.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-accent-100 text-accent rounded-full text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-primary">{lesson.title}</div>
                        <div className="text-sm text-gray-500">{lesson.description}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500">
                        {Math.floor(lesson.duration_seconds / 60)} min
                      </span>
                      {lesson.is_free_preview && (
                        <span className="text-xs font-semibold text-success bg-success-50 px-2 py-1 rounded-full">
                          Free Preview
                        </span>
                      )}
                      <button className="text-accent hover:text-accent-600">
                        <Play className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructor */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-primary mb-6">About Your Instructor</h2>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-primary shrink-0">
                  {course.instructor.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-lg text-primary mb-1">
                    {course.instructor.name}
                  </div>
                  <div className="text-gray-500 text-sm mb-3">
                    {course.instructor.courses_count} courses • {course.instructor.students_count.toLocaleString()} students • {course.instructor.rating} rating
                  </div>
                  <p className="text-gray-700">{course.instructor.bio}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
