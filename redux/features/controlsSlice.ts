import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ControlsSlice = {
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
};

const initialState = {
  selectedOption: null,
  correctAnswer: null,
  showAnswer: false,
  showOptions: false,
  progressCount: 0,
  currentQuestion: 0,
  walkaway: false,
  prize: "0",
  guaranteedPrize: "0",
  usedFiftyFifty: false,
  fiftyFiftyActive: false,
  usedAskHost: false,
  usedAskFriend: false,
} as ControlsSlice;

export const controls = createSlice({
  name: "controls",
  initialState,
  reducers: {
    reset: () => initialState,
    questionReset: (state) => {
      state.progressCount = 0;
      state.currentQuestion = 0;
      state.correctAnswer = null;
      state.selectedOption = null;
      state.showAnswer = false;
      state.walkaway = false;
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
    updateProgress: (state) => {
      state.progressCount++;
    },
    updatePrize: (state, action: PayloadAction<string>) => {
      state.prize = action.payload;
    },
    updateGuaranteedPrize: (state) => {
      if (state.prize === "2,000") state.guaranteedPrize = "2,000";
      if (state.prize === "15,000") state.guaranteedPrize = "15,000";
      if (state.prize === "50,000") state.guaranteedPrize = "50,000";
    },
    moveToNextQuestion: (state) => {
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
  reset,
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
