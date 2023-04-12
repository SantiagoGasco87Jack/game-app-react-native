import React from "react";
import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import Cardimg from "./Cardimg";
import { useAppSelector } from "@utils/redux/store";
import {
  ROLL_CARD,
  SET_ROLLING,
  DO_SCORE,
  RESET_SEL,
  RESET_ROLL,
  UPDATE_SCORE,
} from "@modules/playground/redux/playgroundSlice";

export default function ScoretablerightRow({}) {
  let right = useAppSelector((s) => s.PlaygroundReducer?.right);
  const cards = useAppSelector((s) => s.PlaygroundReducer?.cards);
  let yazround = useAppSelector((s) => s.PlaygroundReducer?.yazround);
  const rightscores = useAppSelector((s) => s.PlaygroundReducer?.rightscores);
  const rightScore = useAppSelector((s) => s.PlaygroundReducer?.rightScore);

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
    let label;
    if (item.order == "yaz") {
      rightRow.height = "28%";
      label = new Array(...item.num);
    } else {
      label = new Array();
      if (typeof item.num == "string") {
        if (item.order == "5" || item.order == "6") {
          label.push("  of a kind +" + item.num);
        } else {
          label.push(item.num);
        }
      } else {
        item.num.map((n) => {
          label.push("+" + n);
        });
      }
    }
    return (
      <Pressable style={rightRow} key={key}>
        <View style={styles.rightlabel}>
          <Image source={img} style={imgstyle} />
          <View style={styles.labels}>
            {label.map((n, key) => {
              return (
                <Text style={styles.label} key={key}>
                  +{n}
                </Text>
              );
            })}
          </View>
        </View>
        <Text style={styles.value}>{item.value}</Text>
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
  label: {
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 14,
    color: "#14321D",
    width: "100%",
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
