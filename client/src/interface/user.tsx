export interface Users {
  id: number;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface Account {
  id: number;
  email: string;
  password: string;
}

export interface EditProfiles {
  name: string;
  email: string;
  address: string;
}

export interface Historys {
  id: number;
  idUser: number;
  idCourse: number;
  idSubject: number;
  idExam: number;
  score: number;
}
