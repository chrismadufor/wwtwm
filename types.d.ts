type Prices = string[];

type Option = {
  key: string;
  value: string;
};

type Question = {
  question: string;
  answerKey: string;
  nextBest: string;
  options: Option[];
  level: string;
};

type QuestionData = {
  answered_question: boolean;
  category: string;
  correct_answer: string;
  created_at: string;
  level: number;
  near_correct_answer: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  question: string;
  question_number: number;
  updated_at: string;
  win_amount: number;
  __v: number;
  _id: string;
};
