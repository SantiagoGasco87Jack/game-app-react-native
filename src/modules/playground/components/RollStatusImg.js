import React from "react";
import { StyleSheet, View, Pressable, Image, Text } from "react-native";
import { useAppSelector } from "@utils/redux/store";

const t_roll_ecl_greyyellowy = require("@src/assets/images/t_roll_ecl_yellow.png");
const t_roll_ecl_blue = require("@src/assets/images/t_roll_ecl_blue.png");

export default function RollStatusImg({}) {
  let rollsLeft = useAppSelector((s) => s.PlaygroundReducer?.rollsLeft);
  let rollstatus = new Array(3);
  // rollstatus.map((roll, index) => {
  // roll = rollsLeft >= i ? t_roll_ecl_greyyellowy : t_roll_ecl_blue;
  // });
  for (let i = 0; i < 2; i++) {
    rollstatus[1 - i] =
      rollsLeft <= i ? t_roll_ecl_greyyellowy : t_roll_ecl_blue;
  }
  return (
    <View style={styles.Container}>
      {rollstatus.map((roll, key) => {
        return <Image source={roll} style={styles.img} key={key} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  img: {
    width: 20,
    height: 20,
    marginHorizontal: 2,
  },
});
