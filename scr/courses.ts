export interface Course {
  name: string;
  hours: number;
  students: string[];
}

export class OnlineCourse implements Course {
  constructor(public name: string, public hours: number, public students: string[] = []) {}
  registerStudent(student: string): void {
    if (!this.isStudentRegistered(student)) {
      this.students.push(student);
    }
  }
  isStudentRegistered(student: string): boolean {
    return this.students.includes(student);
  }
}

export class CourseManager {
  private courses: Course[] = [];
  addCourse(course: Course): void { this.courses.push(course); }
  removeCourse(courseName: string): void {
    this.courses = this.courses.filter(c => c.name != courseName);
  }
  findCourse(courseName: string): Course | undefined {
    return this.courses.find(c => c.name == courseName);
  }
  list(): Course[] { return [...this.courses]; }
}

// Демо
export function demoCourses(): void {
  console.log("Завдання 5: Courses");
  const ts = new OnlineCourse("TypeScript Basics", 20);
  const react = new OnlineCourse("React", 30);
  const algo = new OnlineCourse("Algorithms", 25);

  ts.registerStudent("Ivan");
  ts.registerStudent("Olena");
  react.registerStudent("Ivan");

  const mgr = new CourseManager();
  mgr.addCourse(ts);
  mgr.addCourse(react);
  mgr.addCourse(algo);

  for (const c of mgr.list()) {
    console.log(`${c.name} (${c.hours}h) – students: ${c.students.join(", ") || "—"}`);
  }
}
