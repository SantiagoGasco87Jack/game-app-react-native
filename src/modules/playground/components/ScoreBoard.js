import React from "react";
import { StyleSheet, View, Pressable, Image, Text } from "react-native";
import ToolBtn from "./ToolBtn";
import Scoretable from "./Scoretable";
import { useAppSelector } from "@utils/redux/store";

const t_btn_green = require("@src/assets/images/t_btn_green.png");
const b_yellow = require("@src/assets/images/b_yellow.png");
const t_star = require("@src/assets/images/t_star.png");
const t_spd_yellow = require("@src/assets/images/t_spd_yellow.png");

export default function ScoreBoard(setScore) {
  const playGame = useAppSelector((s) => s.PlaygroundReducer?.playGame);
  const gameMode = useAppSelector((s) => s.PlaygroundReducer?.gameMode);
  const player = useAppSelector((s) => s.PlaygroundReducer?.player);
  const bonusScoure = useAppSelector((s) => s.PlaygroundReducer?.bonusScoure);
  const finalScore = useAppSelector((s) => s.PlaygroundReducer?.finalScore);

  return (
    <View style={styles.scoreBoard}>
      <View style={styles.scoreHeaderbar}>
        <View style={styles.scoreHeadertitle}>
          <Image source={t_spd_yellow} style={styles.scoreHeadertitleimg} />
          <Text style={styles.scoreHeadertitlelabel}>
            {playGame + gameMode}
          </Text>
        </View>
        <Text style={styles.scoreHeaderlabel}>{player}’s Scoreboard</Text>
      </View>
      <View style={styles.scoreTable}>
        <Text style={styles.scoreTableheader}>Select your score</Text>
        <Scoretable setScore={setScore} />
      </View>
      <View style={styles.scoreFooterbar}>
        <View style={styles.scoreFooterbarcontent}>
          <View style={styles.scoreFooterbarcontentbonus}>
            <Image
              source={b_yellow}
              style={styles.scoreFooterbarcontentbonusimg}
            />
            <Text style={styles.scoreFooterbarcontentbonuslabel}>
              + Bonus {bonusScoure}
            </Text>
          </View>
          <View style={styles.scoreFooterbarcontentfinal}>
            <View style={styles.scoreFooterbarcontentfinallbl}>
              <Text style={styles.scoreFooterbarcontentfinallable}>Final</Text>
              <Text style={styles.scoreFooterbarcontentfinallable}>score</Text>
            </View>
            <View style={styles.scoreFooterbarcontentfinalbtn}>
              <Image
                source={t_btn_green}
                style={styles.scoreFooterbarcontentfinalbtngreen}
              />
              <ToolBtn icon={t_star} label={finalScore} l_style={true} />
            </View>
          </View>
        </View>
        <View style={styles.scoreFooterbarblackbtn}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scoreBoard: {
    position: "absolute",
    top: "35%",
    flexDirection: "column",
    justifyContent: "bottom",
    alignItems: "center",
    width: "100%",
    height: "65%",
  },
  scoreHeaderbar: {
    backgroundColor: "#077242",
    borderTopStartRadius: "34px",
    borderTopEndRadius: "34px",
    alignItems: "center",
    justifyContent: "center",
    height: "20%",
    width: "100%",
  },
  scoreHeadertitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  scoreHeadertitleimg: {
    width: "10vw",
    height: "10vw",
  },
  scoreHeadertitlelabel: {
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
  },
  scoreHeaderlabel: {
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: 20,
    lineHeight: 24,
    textAlign: "center",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  scoreTable: {
    marginHorizontal: "5%",
    height: "60%",
    width: "100%",
    backgroundColor: "#FFFFFF",
  },
  scoreTableheader: {
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: 20,
    lineHeight: 24,
    color: "#110803",
    height: "20%",
  },
  scoreFooterbar: {
    height: "20%",
    width: "100%",
    backgroundColor: "#14321D",
    alignItems: "center",
  },
  scoreFooterbarcontent: {
    width: "100%",
    height: "85%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scoreFooterbarcontentbonus: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
    height: "90%",
  },
  scoreFooterbarcontentbonusimg: {
    position: "absolute",
    width: "80%",
    height: "40%",
  },
  scoreFooterbarcontentfinallbl: {
    width: "30%",
    height: "100%",
    justifyContent: "center",
  },
  scoreFooterbarcontentbonuslabel: {
    fontFamily: "Montagu Slab",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 21,
    textAlign: "center",
    color: "#FFFFFF",
    textColor: "#110803",
    textShadowOffset: {
      width: 2,
      height: 1,
    },
    textShadowRadius: 2,
    zIndex: 1,
  },
  scoreFooterbarcontentfinal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
    height: "100%",
  },
  scoreFooterbarcontentfinallable: {
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 13,
    lineHeight: 12,
    textAlign: "right",
    color: "#FFFFFF",
  },
  scoreFooterbarcontentfinalbtn: {
    width: "70%",
    height: "100%",
    alignItems: "center",
  },
  scoreFooterbarcontentfinalbtngreen: {
    top: "16%",
    position: "absolute",
    width: "80%",
    height: "60%",
  },
  scoreFooterbarblackbtn: {
    width: "40%",
    height: "5%",
    backgroundColor: "#000000",
    borderRadius: 100,
  },
});
