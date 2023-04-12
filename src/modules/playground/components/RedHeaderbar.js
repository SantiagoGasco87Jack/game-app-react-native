import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { useAppSelector } from "@utils/redux/store";
import Menu from "@modules/Playground/components/Menu";

const redbar = require("@src/assets/images/redbar.png");

export default function RedHeaderbar({}) {
  const playGame = useAppSelector((s) => s.PlaygroundReducer?.playGame);
  const gameMode = useAppSelector((s) => s.PlaygroundReducer?.gameMode);
  return (
    <View style={styles.headerContainer}>
      <Image source={redbar} style={styles.redbar} />
      <Text style={styles.title}>{playGame + gameMode}</Text>
      <View style={styles.menuContainer}>
        <Menu style={styles.menu} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    possition: "relative",
    width: "100%",
    height: "10%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  redbar: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  title: {
    fontFamily: "Montagu Slab",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: 22,
    lineHeight: 28,
    textAlign: "center",
    color: "#FFFFFF",
    textShadowColor: "#110803",
    textShadowOffset: {
      width: -3,
      height: 3,
    },
    textShadowRadius: 2,
    zIndex: 5,
  },
  menuContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: "3vh",
    width: "100%",
    height: "100%",
  },
  menu: {
    width: "15vw",
    height: "15vw",
  },
});
