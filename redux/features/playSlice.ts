import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  name: string;
  email: string;
  phone: string;
};

type PlaySlice = {
  beforeGameTimer: boolean;
  startGame: boolean;
  showQuestion: boolean;
  showOptions: boolean;
  showAnswer: boolean;
  answer: string;
  duringGameTimer: boolean;
  gameOver: boolean;
  endGame: boolean;
  showResultPage: boolean;
  playStart: boolean;
  playEnd: boolean;
  playerEnd: boolean;
  playStats: boolean;
  answerCount: number;
  showStats: boolean;
  showResults: boolean;
  showWinner: boolean;
  user: any;
  role: string;
  category: string;
  stats: any;
  winners: any;
  question: any;
};

const initialState = {
  beforeGameTimer: false,
  startGame: false,
  showQuestion: false,
  showOptions: false,
  showAnswer: false,
  duringGameTimer: false,
  gameOver: false,
  endGame: false,
  showResultPage: false,
  playStart: true,
  playStats: false,
  showStats: false,
  showResults: false,
  showWinner: false,
  answerCount: 0,
  answer: "",
  playEnd: false,
  playerEnd: false,
  user: null,
  stats: null,
  winners: null,
  question: null,
  role: "player",
  category: "",
} as PlaySlice;

export const play: any = createSlice({
  name: "controls",
  initialState,
  reducers: {
    startGameTimer: (state) => {
      state.beforeGameTimer = true;
    },
    gameStart: (state) => {
      state.playStart = false;
      state.startGame = true;
      state.beforeGameTimer = false;
    },
    showQuestion: (state) => {
      state.showQuestion = true;
      state.playerEnd = false;
    },
    showOptions: (state) => {
      state.showOptions = true;
    },
    showStats: (state) => {
      state.showStats = true;
      state.endGame = true;
      // state.playEnd = false
    },
    showResults: (state) => {
      state.showResults = true;
    },
    showResultsPage: (state) => {
      state.showStats = false;
      state.showResultPage = true;
      // state.showWinner = true
    },
    showWinner: (state) => {
      state.showWinner = true;
    },
    showAnswer: (state, action: PayloadAction<number>) => {
      state.showAnswer = true;
      state.answerCount = action.payload;
    },
    updateAnswer: (state, action: PayloadAction<string>) => {
      state.answer = state.answer += action.payload;
    },
    finishGame: (state) => {
      if (!state.playerEnd) state.playEnd = true;
    },
    showAnswerBtn: (state) => {
      state.playEnd = true;
    },
    goHome: (state) => {
      state.playEnd = false;
      state.startGame = false;
      state.playStart = true;
      state.playerEnd = true;
    },
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    resetGame: (state) => {
      (state.beforeGameTimer = false),
        (state.startGame = false),
        (state.showQuestion = false),
        (state.showOptions = false),
        (state.showAnswer = false),
        (state.duringGameTimer = false),
        (state.gameOver = false),
        (state.endGame = false),
        (state.showResultPage = false),
        (state.playStart = true),
        (state.playStats = false),
        (state.showStats = false),
        (state.showResults = false),
        (state.showWinner = false),
        (state.answerCount = 0),
        (state.answer = ""),
        (state.playEnd = false)
        // (state.playerEnd = false)
        // (state.user = null)
        // (state.role = "player")
    },
    setWinners: (state, action: PayloadAction<any>) => {
      state.stats = action.payload.stats;
      state.winners = action.payload.winners;
    },
    setQuestionData: (state, action: PayloadAction<any>) => {
      state.question = action.payload;
    },
  },
});

export const {
  startGameTimer,
  gameStart,
  showQuestion,
  showOptions,
  showAnswer,
  showAnswerBtn,
  showResults,
  showResultsPage,
  showStats,
  showWinner,
  updateAnswer,
  finishGame,
  goHome,
  setRole,
  setUser,
  setCategory,
  setWinners,
  setQuestionData,
  resetGame,
} = play.actions;

export default play.reducer;
