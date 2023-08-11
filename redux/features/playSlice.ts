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
  user: User | null;
  role: string;
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
  role: "player",
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
      // state.showOptions = false
      // state.showQuestion = false
      // state.startGame = false
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
    setUser: (state, action: PayloadAction<User>) => {
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
        (state.playEnd = false),
        (state.playerEnd = false),
        (state.user = null),
        (state.role = "player");
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
  resetGame,
} = play.actions;

export default play.reducer;
