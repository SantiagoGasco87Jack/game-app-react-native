import React from "react";
import { StyleSheet, View } from "react-native";
import LeftRow from "./ScoretableleftRow";
import RightRow from "./ScoretablerightRow";

export default function Scoretable(setScore) {
  return (
    <View style={styles.scoreTable}>
      <View style={styles.scoreTableleft}>
        <LeftRow setScore={setScore} />
      </View>
      <View style={styles.scoreTableright}>
        <RightRow />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scoreTable: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: "90%",
  },
  scoreTableleft: {
    width: "40%",
    height: "100%",
  },
  scoreTableright: {
    width: "58%",
    height: "100%",
  },
});
