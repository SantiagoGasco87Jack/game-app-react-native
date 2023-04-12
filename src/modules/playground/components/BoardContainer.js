import React, { useState, useEffect } from "react";
import { StyleSheet, View, Pressable, Image, Text } from "react-native";
import ToolBtn from "./ToolBtn";
import RollStatus from "./RollStatusImg";
import Card from "./Card";
import { useAppSelector } from "@utils/redux/store";
import { dispatcher } from "@helpers/redux";
import ScoreBoard from "@modules/Playground/components/ScoreBoard";
import { useSwipeModal } from "react-native-swipe-modal";
import {
  ROLL_CARD,
  SET_ROLLING,
  DO_SCORE,
  ESTIMATE_SCORE,
  RESET_SEL,
  RESET_ROLL,
  RESET_CARD,
  UPDATE_SCORE,
} from "@modules/playground/redux/playgroundSlice";

const i_board = require("@src/assets/images/i_board.png");
const tool_bar = require("@src/assets/images/tool_bar.png");
const t_M = require("@src/assets/images/t_M.png");
const t_btn_green = require("@src/assets/images/t_btn_green.png");
const t_refresh = require("@src/assets/images/t_refresh.png");
const b_yellow = require("@src/assets/images/b_yellow.png");
const t_dice = require("@src/assets/images/t_dice.png");
const t_footer = require("@src/assets/images/t_footer.png");
const b_scoreband = require("@src/assets/images/b_scoreband.png");
const t_star = require("@src/assets/images/t_star.png");

export default function BoardContainer({}) {
  const player = useAppSelector((s) => s.PlaygroundReducer?.player);
  const round = useAppSelector((s) => s.PlaygroundReducer?.round);
  const maxScore = useAppSelector((s) => s.PlaygroundReducer?.maxScore);
  const tiplabel = useAppSelector((s) => s.PlaygroundReducer?.tiplabel);
  const rolling = useAppSelector((s) => s.PlaygroundReducer?.rolling);
  let cards = useAppSelector((s) => s.PlaygroundReducer?.cards);
  const rollsLeft = useAppSelector((s) => s.PlaygroundReducer?.rollsLeft);
  const completed = useAppSelector((s) => s.PlaygroundReducer?.completed);
  const finalScore = useAppSelector((s) => s.PlaygroundReducer?.finalScore);
  // const [autoHideState, setAutoHideState]=useState(true)
  const swipeModal = useSwipeModal();

  const ShowScore = () => {
    swipeModal.show({
      direction: "bottom",
      //  autoHide:autoHideState,
      // duration:3000,
      renderChild: () => {
        return <ScoreBoard setScore={setScore} />;
      },
    });
  };
  const setScore = (rulename, ruleFn) => {
    doScore(rulename, ruleFn);
    swipeModal.close();
  };

  const setRolling = (state) => {
    dispatcher(SET_ROLLING({ rolling: state }));
  };

  const animateRoll = () => {
    if (rollsLeft > 0) {
      setRolling(true);
      setTimeout(rollFunc, 0);
    } else {
      ShowScore();
    }
  };

  const rollFunc = () => {
    dispatcher(ROLL_CARD());
    dispatcher(ESTIMATE_SCORE());
    setRolling(false);
  };

  const setleftScore = () => {
    dispatcher(UPDATE_SCORE({ leftscores: {} }));
    return useAppSelector((s) => s.PlaygroundReducer?.leftScore);
  };

  const doScore = (rulename, ruleFn) => {
    dispatcher(DO_SCORE({ rulename, ruleFn }));
    dispatcher(RESET_SEL());
    dispatcher(RESET_CARD());
    dispatcher(RESET_ROLL());
    animateRoll();
  };

  return (
    <View style={styles.boardContainer}>
      <Image source={i_board} style={styles.board} />
      <View style={styles.toolContainer}>
        <View style={styles.tool_bar}>
          <Image source={tool_bar} style={styles.tool_bar} />
        </View>
        <View style={styles.tool_content}>
          <ToolBtn icon={t_M} label={player} l_style={styles.btn_label_style} />
          <Text style={styles.tool_label}>Player</Text>
        </View>
        <View style={styles.tool_star}>
          <Image source={t_btn_green} style={styles.t_btn_green} />
          <ToolBtn icon={t_star} label={maxScore} l_style={true} />
          <Text style={styles.tool_label}>Scores</Text>
        </View>
        <View style={styles.tool_content}>
          <ToolBtn
            icon={t_refresh}
            label={round + "nd"}
            l_style={styles.btn_label_style}
          />
          <Text style={styles.tool_label}>Round</Text>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <View>
          {!completed && <Text style={styles.tiplabel}>{tiplabel}</Text>}
        </View>
        <View style={styles.cardContent}>
          {completed ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Text
                style={{
                  ...styles.tiplabel,
                  marginTop: "10%",
                  paddingVertical: "5%",
                }}
              >
                Max Score: {maxScore}
              </Text>
              <Text style={{ ...styles.tiplabel, marginTop: 0 }}>
                Final Score: {finalScore}
              </Text>
            </View>
          ) : (
            <Card />
          )}
        </View>
      </View>
      <Pressable
        style={styles.rollContainer}
        disabled={rolling || cards.every((card) => card.sel)}
        // disabled={rolling || rollsLeft === 0 || cards.every((card) => card.sel)}
        onPress={() => animateRoll()}
      >
        <View style={styles.yellowContainer}>
          <Image source={b_yellow} style={styles.ylwbg} />
        </View>
        <View style={styles.rollcontentContainer}>
          <Text style={styles.rolltext}>Roll</Text>
          <RollStatus />
          <Image source={t_dice} style={styles.diceimg} />
        </View>
      </Pressable>
      <Pressable
        onPress={() => {
          ShowScore();
        }}
        style={styles.footerContainer}
      >
        <Image source={b_scoreband} style={styles.scoreband} />
        <Image source={t_footer} style={styles.t_footer} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  boardContainer: {
    width: "100%",
    height: "90%",
  },
  board: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  toolContainer: {
    width: "100%",
    height: "10%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  tool_bar: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  tool_content: {
    alignItems: "center",
    marginHorizontal: 20,
    height: "90%",
  },
  t_btn_green: {
    position: "absolute",
    top: "12%",
    height: "65%",
    width: "95%",
    objectFit: "contain",
  },
  tool_label: {
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 13,
    lineHeight: 16,
    color: "#ffffff",
    opacity: 0.6,
    height: "10%",
  },
  tool_star: {
    alignItems: "center",
    width: "31%",
    height: "90%",
  },
  cardContainer: {
    position: "relative",
    height: "70%",
    width: "100%",
    alignItems: "center",
  },
  tiplabel: {
    marginTop: "50%",
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: 24,
    lineHeight: 29,
    color: "#FFFFFF",
    textShadowOffset: {
      width: -2,
      height: 2,
    },
    textShadowRadius: 2,
    textShadowColor: "#D84142",
  },
  cardContent: {
    position: "relative",
    width: "100%",
    height: "80%",
  },
  rollContainer: {
    width: "100%",
    height: "12%",
    alignItems: "center",
  },
  yellowContainer: {
    alignItems: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  ylwbg: {
    width: "90%",
    height: "100%",
  },
  rollcontentContainer: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  rolltext: {
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: 900,
    fontSize: 34,
    lineHeight: 41,
    color: "#FFFFFF",
    textShadowColor: "#110803",
    textShadowOffset: {
      width: -3,
      height: 3,
    },
    textShadowRadius: 2,
    marginRight: "3vw",
  },
  diceimg: {
    marginLeft: "3vw",
    width: "16vw",
    height: "14vw",
  },
  footerContainer: {
    width: "100%",
    height: "8%",
    alignItems: "center",
  },
  scoreband: {
    width: "40%",
    height: "80%",
  },
  t_footer: {
    width: "100%",
    height: "20%",
  },
  SwipeUpDownModal: {
    // position: "absolute",
  },
});
