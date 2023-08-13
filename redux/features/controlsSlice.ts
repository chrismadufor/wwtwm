import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ControlsSlice = {
  user: string;
  fetchedQuestion: boolean;
  selectedOption: string | null;
  correctAnswer: string | null;
  showAnswer: boolean;
  showOptions: boolean;
  progressCount: number;
  currentQuestion: number;
  walkaway: boolean;
  prize: string | null;
  guaranteedPrize: string;
  usedFiftyFifty: boolean;
  fiftyFiftyActive: boolean;
  usedAskHost: boolean;
  usedAskFriend: boolean;
  question: any;
};

const initialState = {
  user: "host",
  fetchedQuestion: false,
  selectedOption: null,
  correctAnswer: null,
  showAnswer: false,
  showOptions: false,
  progressCount: 0,
  currentQuestion: 1,
  walkaway: false,
  prize: "0",
  guaranteedPrize: "0",
  usedFiftyFifty: false,
  fiftyFiftyActive: false,
  usedAskHost: false,
  usedAskFriend: false,
  question: null,
} as ControlsSlice;

export const controls: any = createSlice({
  name: "controls",
  initialState,
  reducers: {
    reset: (state) => {
      state.user = "host",
      state.fetchedQuestion = false,
      state.selectedOption = null,
      state.correctAnswer = null,
      state.showAnswer = false,
      state.showOptions = false,
      state.progressCount = 0,
      state.currentQuestion = 1,
      state.walkaway = false,
      state.prize = "0",
      state.guaranteedPrize = "0",
      state.usedFiftyFifty = false,
      state.fiftyFiftyActive = false,
      state.usedAskHost = false,
      state.usedAskFriend = false,
      state.question = null
    },
    setQuestionData: (state, action: PayloadAction<any>) => {
      state.question = action.payload
      state.correctAnswer = action.payload.correct_answer
    },
    setUser: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
    setFetchedQuestion: (state) => {
      if (state.fetchedQuestion === false) {
        state.fetchedQuestion = true;
      }
    },
    questionReset: (state) => {
      state.progressCount = 0;
      state.currentQuestion = 1;
      state.correctAnswer = null;
      state.selectedOption = null;
      state.showAnswer = false;
      state.showOptions = false;
      state.walkaway = false;
      state.user = "host";
    },
    lockUserOption: (state, action: PayloadAction<string>) => {
      state.selectedOption = action.payload;
    },
    setCorrectAnswer: (state, action: PayloadAction<string>) => {
      state.correctAnswer = action.payload;
    },
    revealAnswer: (state) => {
      state.showAnswer = true;
    },
    revealOptions: (state) => {
      state.showOptions = true;
    },
    updateProgress: (state, action: PayloadAction<number>) => {
      state.progressCount = action.payload;
    },
    updatePrize: (state, action: PayloadAction<string>) => {
      state.prize = action.payload;
      if (action.payload === "2,000") state.guaranteedPrize = "2,000";
      if (action.payload === "15,000") state.guaranteedPrize = "15,000";
      if (action.payload === "50,000") state.guaranteedPrize = "50,000";
    },
    updateGuaranteedPrize: (state, action: PayloadAction<string>) => {
      state.guaranteedPrize = action.payload;
    },
    moveToNextQuestion: (state) => {
      state.fetchedQuestion = false;
      state.correctAnswer = null;
      state.selectedOption = null;
      state.showAnswer = false;
      state.showOptions = false;
      state.fiftyFiftyActive = false;
      state.currentQuestion++;
    },
    updateWalkaway: (state) => {
      state.walkaway = true;
    },
    updateFiftyFifty: (state) => {
      state.usedFiftyFifty = true;
      state.fiftyFiftyActive = true;
    },
    updateAskHost: (state) => {
      state.usedAskHost = true;
    },
    updateAskFriend: (state) => {
      state.usedAskFriend = true;
    },
    endGame: () => {},
  },
});

export const {
  setUser,
  reset,
  setQuestionData,
  setFetchedQuestion,
  questionReset,
  lockUserOption,
  setCorrectAnswer,
  revealAnswer,
  revealOptions,
  updateProgress,
  updatePrize,
  updateGuaranteedPrize,
  moveToNextQuestion,
  endGame,
  updateWalkaway,
  updateFiftyFifty,
  updateAskHost,
  updateAskFriend,
} = controls.actions;

export default controls.reducer;
