import React from "react";
import { StyleSheet, View, Pressable, Image, Text } from "react-native";
import { dispatcher } from "@helpers/redux";
import { NEW_GAME } from "@modules/playground/redux/playgroundSlice";

export default function ToolButton({ icon, label, l_style }) {
  let textlabel;
  if (label === 0 || label) {
    if (l_style) {
      textlabel = <Text style={styles.btn_score_style}>{label}</Text>;
    } else {
      textlabel = <Text style={styles.btn_label_style}>{label}</Text>;
    }
  }

  const restart = () => {
    if (confirm("Do you want to restart this game?")) {
      dispatcher(NEW_GAME());
    }
  };
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={styles.button}
        onPress={() =>
          typeof label === "string" && label.search("nd") !== -1 && restart()
        }
      >
        <Image source={icon} style={styles.image} />
        {textlabel}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: "90%",
  },
  button: {
    alignItems: "center",
    flexDirection: "row",
    height: "100%",
    width: "100%",
  },
  image: {
    width: 40,
    height: "70%",
  },
  btn_label_style: {
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: 18,
    lineHeight: 22,
    color: "#F8BC04",
  },
  btn_score_style: {
    fontFamily: "Montagu Slab",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: 34,
    lineHeight: 44,
    color: "#FFFFFF",
    textShadowColor: "#14321D",
    textShadowOffset: {
      width: 2,
      height: 1,
    },
    textShadowRadius: 2,
  },
});
