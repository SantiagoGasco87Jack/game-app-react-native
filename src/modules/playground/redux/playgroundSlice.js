import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  leftTotal,
  totalOfKind,
  fullHouse,
  straightTotal,
  yahtzee,
} from "../components/Rules";

const left = [
  { n: "9", bg: "#CFEFDF", estimate: 0 },
  { n: "10", bg: "#FFFFFF", estimate: 0 },
  { n: "J", bg: "#CFEFDF", estimate: 0 },
  { n: "Q", bg: "#FFFFFF", estimate: 0 },
  { n: "K", bg: "#CFEFDF", estimate: 0 },
  { n: "A", bg: "#FFFFFF", estimate: 0 },
];

const right = [
  {
    order: "pairtotal",
    width: "30vw",
    estimate: 0,
    bg: "#CFEFDF",
  },
  {
    order: "straight_i",
    width: "32vw",
    estimate: 0,
    bg: "#FFFFFF",
  },
  {
    order: "straight_ii",
    width: "35vw",
    estimate: 0,
    bg: "#CFEFDF",
  },
  {
    order: "chance",
    width: "25vw",
    estimate: 0,
    bg: "#FFFFFF",
  },
  {
    order: "yaz",
    width: "18vw",
    estimate: ["50", "100", "150", "200", "250"],
    estimateScore: 0,
    bg: "#CFEFDF",
  },
];

// const card = [
//   { n: "10", k: "dia", left: "28%", top: "1%" },
//   { n: "k", k: "red", left: "52%", top: "1%", sel: true },
//   { n: "9", k: "crb", left: "65%", top: "18%" },
//   { n: "10", k: "dia", left: "59%", top: "38%" },
//   { n: "q", k: "blu", left: "41%", top: "53%", sel: true },
//   { n: "j", k: "blk", left: "20%", top: "38%", sel: true },
//   { n: "1", k: "spd", left: "15%", top: "18%" },
// ];
const cards = [
  { n: 0, left: "20%", top: "14%" },
  { n: 0, left: "60%", top: "14%" },
  { n: 0, left: "40%", top: "45%" },
];

const playGame = {
  TripleDice: "Triple Dice ",
  Lucky7Royale: "Lucky 7 Royale ",
};
const gameMode = {
  Poker: "Poker",
  Regular: "Regular",
  Chess: "Chess",
};
const value = {
  Poker: [9, 10, 11, 12, 13, 14],
  Regular: [1, 2, 3, 4, 5, 6],
  Chess: [1, 3, 3, 5, 9, 13],
};

const initialState = {
  playGame: playGame.TripleDice,
  gameMode: gameMode.Poker,
  player: "Mike",
  leftscores: {
    ones: undefined,
    twos: undefined,
    threes: undefined,
    fours: undefined,
    fives: undefined,
    sixes: undefined,
  },
  // rightscores: {
  //   threeOfKind: undefined,
  //   fourOfKind: undefined,
  //   fullHouse: undefined,
  //   smallStraight: undefined,
  //   largeStraight: undefined,
  //   yahtzee: undefined,
  //   chance: undefined,
  // },
  rightscores: {
    pairTotal: undefined,
    straightI: undefined,
    straightII: undefined,
    chance: undefined,
    yaz: undefined,
  },
  leftScore: 0,
  rightScore: 0,
  maxScore: 0,
  finalScore: 0,
  round: 1,
  tiplabel: "Make your move",
  bonusScoure: 75,
  rollsLeft: 2,
  yazround: 0,
  rolling: false,
  left: [...left],
  right: [...right],
  cards: [...cards],
  completed: false,
  value: value.Poker,
  leftnames: ["ones", "twos", "threes", "fours", "fives", "sixes"],
  rightnames: ["pairTotal", "straightI", "straightII", "chance", "yaz"],
};

export const playgroundSlice = createSlice({
  name: "playgroundReducer",
  initialState,
  reducers: {
    RANDOM_CARD(state) {
      console.log("random");
      state.cards.map((card, index) => {
        state.cards[index] = {
          ...card,
          n: card.sel ? card.n : Math.ceil(Math.random() * 6),
        };
      });
    },
    SET_CARD(state, action) {
      state.cards = action.payload.cards;
    },
    ROLL_CARD(state) {
      {
        state.rollsLeft && state.rollsLeft--;
        //random
        state.cards.map((card, index) => {
          state.cards[index] = {
            ...card,
            n: card.sel ? card.n : Math.ceil(Math.random() * 6),
          };
        });
      }
    },
    RESET_ROLL(state) {
      state.rollsLeft = 2;
      //random
      // state.cards.map((card, index) => {
      //   state.cards[index] = {
      //     ...card,
      //     n: card.sel ? card.n : Math.ceil(Math.random() * 6),
      //   };
      // });

      //resetcard
      state.cards.map((card, index) => {
        state.cards[index] = { ...card, sel: false, n: 0 };
      });
    },
    RESET_SEL(state) {
      state.cards.map((card, index) => {
        state.cards[index] = { ...card, sel: false };
      });
    },
    RESET_CARD(state) {
      state.cards.map((card, index) => {
        state.cards[index] = { ...card, sel: false, n: 0 };
      });
    },
    SET_SEL(state, action) {
      const index = action.payload.index;
      if (state.cards[index].n !== 0) {
        state.cards = [
          ...state.cards.slice(0, index),
          { ...state.cards[index], sel: !state.cards[index].sel },
          ...state.cards.slice(index + 1),
        ];
      }
    },
    DO_SCORE(state, action) {
      if (state.round <= 15) {
        state.round < 15 ? state.round++ : (state.completed = true);
        if (action.payload.leftright) {
          state.leftscores = {
            ...state.leftscores,
            [action.payload.rulename]: action.payload.ruleFn,
          };
          state.leftScore = 0;
          for (let key in state.leftscores) {
            if (state.leftscores[key]) state.leftScore += state.leftscores[key];
          }
        } else {
          if (action.payload.rulename == "yaz") {
            state.yazround++;
            if (state.rightscores.yaz) {
              state.rightscores.yaz = parseInt(
                parseInt(state.rightscores.yaz) +
                  parseInt(action.payload.ruleFn)
              );
            } else {
              state.rightscores.yaz = parseInt(action.payload.ruleFn);
            }
          } else {
            state.rightscores = {
              ...state.rightscores,
              [action.payload.rulename]: action.payload.ruleFn,
            };
          }
          state.rightScore = 0;
          for (let key in state.rightscores) {
            if (state.rightscores[key])
              state.rightScore += state.rightscores[key];
          }
        }
        state.finalScore = state.leftScore + state.rightScore;
        state.finalScore >= state.bonusScoure &&
          (state.finalScore += state.bonusScoure);
        state.completed &&
          (state.maxScore =
            state.maxScore < state.finalScore && state.finalScore);
      }
    },
    ESTIMATE_SCORE(state) {
      state.left[0].estimate = leftTotal.evalRoll(state.cards, state.value, 0);
      state.left[1].estimate = leftTotal.evalRoll(state.cards, state.value, 1);
      state.left[2].estimate = leftTotal.evalRoll(state.cards, state.value, 2);
      state.left[3].estimate = leftTotal.evalRoll(state.cards, state.value, 3);
      state.left[4].estimate = leftTotal.evalRoll(state.cards, state.value, 4);
      state.left[5].estimate = leftTotal.evalRoll(state.cards, state.value, 5);

      state.right[0].estimate = totalOfKind.evalRoll(
        state.cards,
        state.value,
        2
      );
      state.right[1].estimate = straightTotal.evalRoll(state.cards, 30);
      state.right[2].estimate = straightTotal.evalRoll(state.cards, 40);
      state.right[3].estimate = totalOfKind.evalRoll(
        state.cards,
        state.value,
        0
      );
      state.right[4].estimateScore = yahtzee.evalRoll(
        state.cards,
        state.right[4].estimate[state.yazround]
      );
    },
    NEW_GAME(state) {
      // RESET_ROLL(state);
      state.cards.map((card, index) => {
        state.cards[index] = { ...card, sel: false };
      });
      state.round = 1;
      state.yazround = 0;
      state.leftscores = {};
      state.leftScore = 0;
      state.rightscores = {};
      state.rightScore = 0;
      state.finalScore = 0;
      //random

      state.cards.map((card, index) => {
        state.cards[index] = {
          ...card,
          n: card.sel ? card.n : 0,
        };
      });

      state.rollsLeft = 2;
      state.completed = false;
    },
    COMPLETE_GAME(state) {
      state.completed = true;
    },
    SET_ROLLING(state, action) {
      state.rolling = action.payload.rolling;
    },
    SET_LEFT(state, action) {
      state.left = action.payload.left;
    },
    SET_RIGHT(state, action) {
      state.right = action.payload.right;
    },
    CHANGE_GAME(state, action) {
      state.playGame = action.payload.playGame;
    },
    CHANGE_MODE(state, action) {
      state.gameMode = action.payload.gameMode;
      state.value = value[state.gameMode];
    },
    INCREASE_ROUND(state) {
      if (state.round < 15) state.round++;
      else state.completed = true;
    },
  },
});

export const {
  RANDOM_CARD,
  SET_CARD,
  ROLL_CARD,
  RESET_ROLL,
  RESET_CARD,
  RESET_SEL,
  SET_SEL,
  DO_SCORE,
  ESTIMATE_SCORE,
  NEW_GAME,
  COMPLETE_GAME,
  SET_ROLLING,
  SET_LEFT,
  SET_RIGHT,
  CHANGE_GAME,
  CHANGE_MODE,
  INCREASE_ROUND,
} = playgroundSlice.actions;

export default playgroundSlice.reducer;
