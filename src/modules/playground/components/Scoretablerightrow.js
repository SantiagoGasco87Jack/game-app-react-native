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

export default function ScoretablerightRow({}) {
  let right = useAppSelector((s) => s.PlaygroundReducer?.right);
  const cards = useAppSelector((s) => s.PlaygroundReducer?.cards);
  let yazround = useAppSelector((s) => s.PlaygroundReducer?.yazround);
  const rightscores = useAppSelector((s) => s.PlaygroundReducer?.rightscores);
  const rightScore = useAppSelector((s) => s.PlaygroundReducer?.rightScore);
  const round = useAppSelector((s) => s.PlaygroundReducer?.round);
  const rightnames = useAppSelector((s) => s.PlaygroundReducer?.rightnames);
  const value = useAppSelector((s) => s.PlaygroundReducer?.value);

  const doScore = (rulename, ruleFn) => {
    dispatcher(DO_SCORE({ rulename, ruleFn, leftright: false }));
    if (round < 15) {
      dispatcher(RESET_SEL());
      dispatcher(RESET_CARD());
      dispatcher(RESET_ROLL());
    }
    // animateRoll();
  };

  const setScore = (rulename, ruleFn, index) => {
    let score;
    index === 0 && (score = ruleFn(cards, value, 2));
    index === 1 && (score = ruleFn(cards, 30));
    index === 2 && (score = ruleFn(cards, 40));
    index === 3 && (score = ruleFn(cards, value, 0));
    index === 4 && (score = ruleFn(cards, right[index].estimate[yazround]));

    doScore(rulename, score);
    // swipeModal.close();
  };
  const getScore = (index) => {
    return rightscores[rightnames[index]];
  };

  const scorehandle = (index) => {
    if (cards[0].n === 0) return;
    const rulename = rightnames[index];
    let ruleFn;
    switch (index) {
      case 0:
      case 3:
        ruleFn = totalOfKind.evalRoll;
        break;
      case 1:
      case 2:
        ruleFn = straightTotal.evalRoll;
        break;
      case 4:
        ruleFn = yahtzee.evalRoll;
        break;
      default:
        break;
    }
    setScore(rulename, ruleFn, index);
  };

  const render = right.map((item, key) => {
    let rightRow = {
      width: "100%",
      height: "14%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: item.bg,
      paddingHorizontal: "5%",
    };
    let imgstyle = {
      width: item.width,
      height: "8vw",
    };
    const img = Cardimg({ order: item.order });
    let label = item.order == "yaz" ? item.estimateScore : item.estimate;
    rightRow.height = item.order == "yaz" ? "28%" : "14%";
    const yazStatus = item.order == "yaz" ? yazround >= 5 : true;
    let doneStatus = getScore(key) !== undefined && yazStatus;
    if (doneStatus) {
      rightRow.opacity = 0.5;
    }
    if (item.order == "straight_ii") {
      doneStatus = getScore(key - 1) === undefined;
    }
    let labelStyle = {
      fontFamily: "Lato",
      fontStyle: "normal",
      fontWeight: label == 0 ? 400 : 800,
      fontSize: label == 0 ? 12 : 13,
      lineHeight: 14,
      color: label == 0 ? "#14321D" : "red",
      width: "100%",
    };
    return (
      <Pressable
        style={rightRow}
        key={key}
        onPress={() => scorehandle(key)}
        disabled={doneStatus}
      >
        <View style={styles.rightlabel}>
          <Image source={img} style={imgstyle} />
          <View style={styles.labels}>
            <Text style={labelStyle}> +{label}</Text>
          </View>
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
        <Text style={styles.value}>{rightScore}</Text>
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
    paddingHorizontal: "5%",
  },
  totallabel: {
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    zIndex: 1,
    color: "#110803",
  },
  rightlabel: {
    flexDirection: "row",
    alignItems: "center",
  },
  value: {
    fontFamily: "Montagu Slab",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: 22,
    lineHeight: 28,
    textAlign: "right",
    zIndex: 1,
    color: "#110803",
  },
  labels: {
    marginLeft: 5,
  },
});
