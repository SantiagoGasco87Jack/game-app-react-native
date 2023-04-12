import React from "react";
import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import Cardimg from "./Cardimg";
import { useAppSelector } from "@utils/redux/store";
import { dispatcher } from "@helpers/redux";
import {
  ROLL_CARD,
  SET_ROLLING,
  DO_SCORE,
  RESET_SEL,
  RESET_ROLL,
  RESET_CARD,
  UPDATE_SCORE,
} from "@modules/playground/redux/playgroundSlice";
import {
  leftTotal,
  totalOfKind,
  fullHouse,
  straightTotal,
  yahtzee,
} from "./Rules";

export default function ScoretableleftRow() {
  const left = useAppSelector((s) => s.PlaygroundReducer?.left);
  const cards = useAppSelector((s) => s.PlaygroundReducer?.cards);
  const leftscores = useAppSelector((s) => s.PlaygroundReducer?.leftscores);
  const leftScore = useAppSelector((s) => s.PlaygroundReducer?.leftScore);
  const round = useAppSelector((s) => s.PlaygroundReducer?.round);
  const gameMode = useAppSelector((s) => s.PlaygroundReducer?.gameMode);
  const value = useAppSelector((s) => s.PlaygroundReducer?.value);
  const leftnames = useAppSelector((s) => s.PlaygroundReducer?.leftnames);

  const doScore = (rulename, ruleFn) => {
    dispatcher(DO_SCORE({ rulename, ruleFn, leftright: true }));
    if (round < 15) {
      dispatcher(RESET_SEL());
      dispatcher(RESET_CARD());
      dispatcher(RESET_ROLL());
    }
    // animateRoll();
  };

  const setScore = (rulename, ruleFn, index) => {
    doScore(rulename, ruleFn(cards, value, index));
    // swipeModal.close();
  };
  const getScore = (index) => {
    return leftscores[leftnames[index]];
  };

  const scorehandle = (index) => {
    if (cards[0].n === 0) return;
    setScore(leftnames[index], leftTotal.evalRoll, index);
  };

  const render = left.map((item, key) => {
    let leftRow = {
      width: "100%",
      height: "14%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: item.bg,
    };
    const img = Cardimg({ n: key + 1 });
    let label = " ";
    gameMode === "Regular" && label;
    gameMode === "Poker" && (label += item.n + "'s +" + value[key]);
    gameMode === "Chess" && (label += "+" + value[key]);

    const doneStatus = getScore(key) !== undefined;
    if (doneStatus) {
      leftRow.opacity = 0.5;
    }
    let estimateStyle = {
      fontFamily: "Lato",
      fontStyle: "normal",
      fontWeight: item.estimate == 0 ? 400 : 800,
      fontSize: item.estimate == 0 ? 12 : 13,
      lineHeight: 14,
      color: item.estimate == 0 ? "#14321D" : "red",
      width: "100%",
    };
    return (
      <Pressable
        style={leftRow}
        key={key}
        onPress={() => scorehandle(key)}
        disabled={doneStatus}
      >
        <View style={styles.leftlabel}>
          <Image source={img} style={styles.img} />
          <Text style={styles.label}>
            {label}
            <Text style={estimateStyle}> {"  " + item.estimate}</Text>
          </Text>
        </View>
        <Text style={styles.value}>
          {getScore(key) == undefined ? 0 : getScore(key)}
        </Text>
      </Pressable>
    );
  });
  return (
    <>
      {render}
      <View style={styles.totalRow}>
        <Text style={styles.totallabel}>Total</Text>
        <Text style={styles.value}>{leftScore}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  totalRow: {
    width: "100%",
    height: "16%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#A5CCBB",
  },
  totallabel: {
    paddingLeft: "5%",
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    textAlign: "right",
    zIndex: 1,
    color: "#110803",
  },
  leftlabel: {
    paddingLeft: "5%",
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 14,
    color: "#14321D",
    width: "100%",
  },
  img: {
    width: "10vw",
    height: "10vw",
  },
  value: {
    paddingRight: "5%",
    fontFamily: "Montagu Slab",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: 22,
    lineHeight: 28,
    textAlign: "right",
    color: "#110803",
    zIndex: 1,
  },
});
