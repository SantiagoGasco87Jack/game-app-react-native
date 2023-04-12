/**
 * @author Ali Burhan Keskin <alikeskin@milva.com>
 */
import React, { useState } from "react";
import { StyleSheet, View, Image, Text, Switch, Pressable } from "react-native";
import Cardimg from "@modules/playground/components/Cardimg";
import { useAppSelector } from "@utils/redux/store";

const crown = require("@assets/images/crown.png");

function Settings() {
  const playGame = useAppSelector((s) => s.PlaygroundReducer?.playGame);
  const player = useAppSelector((s) => s.PlaygroundReducer?.player);
  const gameMode = useAppSelector((s) => s.PlaygroundReducer?.gameMode);
  const mainLogo = Cardimg({ order: playGame + "Logo" });
  let download = "Lucky 7 Royale ";
  if (playGame == download) {
    download = "Triple Dice ";
  }
  const [labels, setLabels] = useState([
    { label: "Download Lucky 7 Royale for .99", sel: false },
    { label: `Purchase ${gameMode} game for .99`, sel: false },
    { label: "Remove Ads for .99", sel: false },
  ]);
  const pressHandler = (index) => {
    setLabels([
      ...labels.slice(0, index),
      { ...labels[index], sel: !labels[index].sel },
      ...labels.slice(index + 1),
    ]);
  };

  const render = (
    <View style={styles.container}>
      <View style={styles.generalcontainer}>
        <Text style={styles.general}> GENERAL </Text>
        <View style={styles.Raw}>
          <Text style={styles.label}> Player </Text>
          <Text style={styles.playername}>{player}</Text>
        </View>
        {labels.map((label, index) => {
          let crownimg = {
            width: "10vw",
            height: "10vw",
            opacity: label.sel ? 1 : 0.3,
          };
          return (
            <Pressable
              style={styles.Raw}
              onPress={() => pressHandler(index)}
              key={index}
            >
              <Text style={styles.label}> {label.label} </Text>
              <Image source={crown} style={crownimg} />
            </Pressable>
          );
        })}
      </View>
      <View style={styles.markcontainer}>
        <Image source={mainLogo} style={styles.mainLogo} />
      </View>
    </View>
  );
  return <>{render}</>;
}

export default Settings;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100vw",
    height: "100vh",
    flex: 1,
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "5vw",
    lineHeight: "4vh",
    color: "#110803",
    alignItems: "center",
    // flexDirection: 'column',
    // justifyContent: "center",
  },
  settingcontainer: {
    width: "90vw",
    height: "10vh",
    justifyContent: "center",
  },
  setting: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "10vw",
    lineHeight: "5vh",
    color: "#110803",
    justifyContent: "center",
  },
  generalcontainer: {
    width: "90vw",
    height: "60vh",
  },
  general: {
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "6vw",
    lineHeight: "5vh",
    textTransform: "uppercase",
    padding: "1vh",
    color: "#110803",
  },
  blank: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
    padding: "4vh",
  },
  Raw: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
    padding: "1vw",
  },
  label: {
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "5vw",
    lineHeight: "5vh",
    color: "#110803",
  },
  playername: {
    color: "#077242",
  },
  switch: {},
  markcontainer: {
    height: "30vh",
    alignItems: "center",
    justifyContent: "center",
  },
  mainLogo: {
    width: "25vw",
    height: "25vw",
  },
  version: {
    fontGFamily: "Lato",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "5vw",
    lineHeight: "3vh",
    textAlign: "center",
    color: "#9B9B9B",
  },
});
