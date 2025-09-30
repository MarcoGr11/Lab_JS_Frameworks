export class OnlineCourse {
    constructor(name, hours, students = []) {
        this.name = name;
        this.hours = hours;
        this.students = students;
    }
    registerStudent(student) {
        if (!this.isStudentRegistered(student)) {
            this.students.push(student);
        }
    }
    isStudentRegistered(student) {
        return this.students.includes(student);
    }
}
export class CourseManager {
    constructor() {
        this.courses = [];
    }
    addCourse(course) { this.courses.push(course); }
    removeCourse(courseName) {
        this.courses = this.courses.filter(c => c.name != courseName);
    }
    findCourse(courseName) {
        return this.courses.find(c => c.name == courseName);
    }
    list() { return [...this.courses]; }
}
// Демо
export function demoCourses() {
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
//# sourceMappingURL=courses.js.map