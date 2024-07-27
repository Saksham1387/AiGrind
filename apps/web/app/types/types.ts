export interface MCQOption {
    id: string;
    optionText: string;
    isCorrect: boolean;
    description: string;
    mcqProblemId: string;
  }
  
  export interface MCQProblem {
    id: string;
    question: string;
    category: string | null;
    solved: number,
    difficulty: string;    // Update to allow null
    options: {
      id: string;
      optionText: string;
      isCorrect: boolean;
      description: string;
      mcqProblemId: string;
    }[];
  };

  
export interface Problem {
    id: string;
    title: string;
    difficulty: string;
    solved: number;
}

export interface CategoryCount {
    category: string;
    count: number;
  }

  export interface McqISubmission {
    id: string;
    user: { email: string };
    selectedOption: { optionText: string };
    createdAt: string;
    result: string;
  }

  export interface ISubmission {
    id: string;
    time: string;
    memory: string;
    problemId: string;
    languageId: string;
    code: string;
    fullCode: string;
    status: string;
    testcases: {
      status: string;
      index: number;
    }[];
  }




  