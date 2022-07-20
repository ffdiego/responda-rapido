export interface IQuestion {
  N: number;
  Pergunta: string;
  Materia: ISubjects;
  Dificuldade: IDificuldade;
  R1: string;
  R2: string;
  R3: string;
  R4: string;
  Certa: number;
}

export type IDificuldade = 0 | 1 | 2 | 3;

export type ISubjects =
  | "INGLES"
  | "PORTUGUES"
  | "CIENCIAS"
  | "MATEMATICA"
  | "GEOGRAFIA"
  | "HISTORIA"
  | "VARIEDADES";
