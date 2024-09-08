export interface Course {
  id: number;
  nameCourse: string;
  describe: string;
  created_at: string;
  image: string;
}

export interface AddCourse {
  nameCourse: string;
  describe: string;
  image: string;
}

export interface EditCourse {
  nameCourse: string;
  describe: string;
}

export type Users = {
  id: number;
  name: string;
  image: string;
  email: string;
  password: string;
  confirmPassword: string;
  created_at: string;
  address: string;
  status: number;
};

export interface Subject {
  id: number;
  idCourse: number;
  nameSubject: string;
  describe: string;
  created_at: string;
  image: string;
}

export interface AddSubject {
  nameSubject: string;
  describe: string;
  image: string;
}

export interface Exam {
  id: number;
  idLesson: number;
  nameLesson: string;
  describe: string;
  image: string;
  dateAdd: string;
  examTurn: number;
  level: number;
}

export interface AddExam {
  nameLesson: string;
  describe: string;
  image: string;
}

export interface Question {
  id: number;
  idExam: number;
  nameQues: string;
  created_at: string;
  options: string[];
  answer: string;
}

export interface AddQues {
  nameQues: string;
  options: string[];
  answer: string;
}

export interface Account {
  id: number;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AccountAdmin {
  id: number;
  accountName: string;
  accountPassword: string;
}
