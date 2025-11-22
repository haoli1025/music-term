import musicTermsData from "./musicTermsDataProd.json";

export interface MusicTerm {
  id: string;
  term: string;
  definition: string;
  language: string;
  category: string;
  grade: number;
  example?: string;
  abbreviation?: string;
  termChinese: string;
  definitionChinese: string;
  exampleChinese?: string;
}

export const musicTerms: MusicTerm[] = musicTermsData as MusicTerm[];

export const grades = [0, 1, 2, 3, 4, 5];

export const gradeLabels: Record<number, string> = {
  0: "All Grades",
  1: "Grade 1",
  2: "Grade 2",
  3: "Grade 3",
  4: "Grade 4",
  5: "Grade 5"
};

export const gradeLabelsChinese: Record<number, string> = {
  0: "所有级别",
  1: "第一级",
  2: "第二级",
  3: "第三级",
  4: "第四级",
  5: "第五级"
};
