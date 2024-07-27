// app/types/types.ts

// Define Enums
export enum SubmissionResult {
    AC = "AC",
    REJECTED = "REJECTED",
    PENDING = "PENDING"
  }
  
  export enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER"
  }
  
  export enum Difficulty {
    EASY = "EASY",
    MEDIUM = "MEDIUM",
    HARD = "HARD"
  }
  
  // Define Types for Models
  
  // User model
  export type User = {
    id: string;
    email: string;
    username?: string;
    name?: string;
    token?: string;
    password?: string;
    createdAt: Date;
    updatedAt: Date;
    contestSubmissions: ContestSubmission[];
    role: UserRole;
    submissions: Submission[];
    contestPoints: ContestPoints[];
    mcqSubmissions: MCQSubmission[];
    streaks: Streak[];
    streakDates: StreakDate[];
    comments: Comment[];
    userMCQProblems: UserMCQProblem[];
  };
  
  // StreakDate model
  export type StreakDate = {
    id: string;
    date: Date;
    userId: string;
    user: User;
  };
  
  // Streak model
  export type Streak = {
    id: string;
    userId: string;
    currentStreak: number;
    lastActivity: Date;
    user: User;
  };
  
  // Contest model
  export type Contest = {
    id: string;
    title: string;
    description: string;
    startTime: Date;
    hidden: boolean;
    submissions: Submission[];
    endTime: Date;
    createdAt: Date;
    updatedAt: Date;
    problems: ContestProblem[];
    contestSubmissions: ContestSubmission[];
    leaderboard: boolean;
    mcqProblems: ContestMCQProblem[];
  };
  
  // ContestProblem model
  export type ContestProblem = {
    id: string;
    contestId: string;
    problemId: string;
    createdAt: Date;
    updatedAt: Date;
    contest: Contest;
    problem: Problem;
    index: number;
    solved: number;
  };
  
  // Problem model
  export type Problem = {
    id: string;
    title: string;
    description: string;
    hidden: boolean;
    slug: string;
    solved: number;
    createdAt: Date;
    updatedAt: Date;
    difficulty: Difficulty;
    contestSubmissions: ContestSubmission[];
    contests: ContestProblem[];
    submissions: Submission[];
    defaultCode: DefaultCode[];
    comments: Comment[];
  };
  
  // Comment model
  export type Comment = {
    id: string;
    text: string;
    createdAt: Date;
    updatedAt: Date;
    problemId?: string;
    problem?: Problem;
    userId: string;
    MCQProblemId?: string;
    user: User;
    mcqProblem?: MCQProblem;
  };
  
  // DefaultCode model
  export type DefaultCode = {
    id: string;
    languageId: number;
    problemId: string;
    code: string;
    createdAt: Date;
    updatedAt: Date;
    problem: Problem;
    language: Language;
  };
  
  // Submission model
  export type Submission = {
    id: string;
    problemId: string;
    userId: string;
    code: string;
    activeContestId?: string;
    createdAt: Date;
    updatedAt?: Date;
    status: SubmissionResult;
    memory?: number;
    time?: number;
    testcases: submissions[];
    activeContest?: Contest;
    user: User;
    problem: Problem;
  };
  
  // Language model
  export type Language = {
    id: number;
    name: string;
    judge0Id: number;
    createdAt: Date;
    updatedAt: Date;
    DefaultCode: DefaultCode[];
  };
  
  // ContestSubmission model
  export type ContestSubmission = {
    id: string;
    userId: string;
    problemId: string;
    contestId: string;
    submissionId: string;
    points: number;
    user: User;
    problem: Problem;
    contest: Contest;
  };
  
  // ContestPoints model
  export type ContestPoints = {
    id: string;
    contestId: string;
    userId: string;
    points: number;
    rank: number;
    user: User;
  };
  
  // MCQProblem model
  export type MCQProblem = {
    id: string;
    question: string;
    title: string;
    explanation: string;
    hidden: boolean;
    category?: string;
    createdAt: Date;
    updatedAt: Date;
    options: MCQOption[];
    contestMCQProblems: ContestMCQProblem[];
    mcqSubmissions: MCQSubmission[];
    solved: string;
    difficulty: Difficulty;
    comments: Comment[];
    userMCQProblems: UserMCQProblem[];
  };
  
  // UserMCQProblem model
  export type UserMCQProblem = {
    id: string;
    user: User;
    userId: string;
    mcqProblem: MCQProblem;
    mcqProblemId: string;
    solved: string;
  };
  
  // MCQOption model
  export type MCQOption = {
    id: string;
    optionText: string;
    isCorrect: boolean;
    description?: string;
    mcqProblemId: string;
    mcqProblem: MCQProblem;
    mcqSubmissions: MCQSubmission[];
  };
  
  // MCQSubmission model
  export type MCQSubmission = {
    id: string;
    userId: string;
    mcqProblemId: string;
    selectedOptionId: string;
    createdAt: Date;
    result: string;
    user: User;
    mcqProblem: MCQProblem;
    selectedOption: MCQOption;
  };
  
  // ContestMCQProblem model
  export type ContestMCQProblem = {
    id: string;
    contestId: string;
    mcqProblemId: string;
    createdAt: Date;
    updatedAt: Date;
    contest: Contest;
    mcqProblem: MCQProblem;
    index: number;
    solved: number;
  };
  
  // Other Models
  export type ar_internal_metadata = {
    key: string;
    value?: string;
    created_at: Date;
    updated_at: Date;
  };
  
  export type clients = {
    id: string;
  };
  
  export type languages = {
    id: number;
    name?: string;
    compile_cmd?: string;
    run_cmd?: string;
    source_file?: string;
    is_archived?: boolean;
  };
  
  export type schema_migrations = {
    version: string;
  };
  
  export type submissions = {
    id: number;
    source_code?: string;
    language_id?: number;
    stdin?: string;
    expected_output?: string;
    stdout?: string;
    status_id?: number;
    created_at?: Date;
    finished_at?: Date;
    time?: number;
    memory?: number;
    stderr?: string;
    token?: string;
    number_of_runs?: number;
    cpu_time_limit?: number;
    cpu_extra_time?: number;
    wall_time_limit?: number;
    memory_limit?: number;
    stack_limit?: number;
    max_processes_and_or_threads?: number;
    enable_per_process_and_thread_time_limit?: boolean;
    enable_per_process_and_thread_memory_limit?: boolean;
    max_file_size?: number;
    compile_output?: string;
    exit_code?: number;
    exit_signal?: number;
    message?: string;
    wall_time?: number;
    compiler_options?: string;
    command_line_arguments?: string;
    redirect_stderr_to_stdout?: boolean;
    callback_url?: string;
    additional_files?: Buffer;
    enable_network?: boolean;
    Submission?: Submission;
    submissionId?: string;
  };