import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Pressable, Animated } from "react-native";
import Cardimg from "./Cardimg";
import { useAppSelector } from "@utils/redux/store";
import { dispatcher } from "@helpers/redux";
import { SET_SEL } from "@modules/playground/redux/playgroundSlice";

const c_border_red = require("@src/assets/images/c_border_red.png");

export default function Card({}) {
  let cards = useAppSelector((s) => s.PlaygroundReducer?.cards);
  // let rolling = useAppSelector((s) => s.PlaygroundReducer?.rolling);

  // const [spinValue] = useState(new Animated.Value(0));
  // useEffect(() => {
  //   Animated.loop(
  //     Animated.timing(spinValue, {
  //       toValue: 1,
  //       duration: 3000,
  //       useNativeDriver: true,
  //     })
  //   ).start();
  // }, []);
  // const spin = spinValue.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: ["0deg", "360deg"],
  // });

  const selectCard = (index) => {
    dispatcher(SET_SEL({ index }));
  };
  const render = cards.map((card, index) => {
    let style = {
      position: "absolute",
      width: "20vw",
      height: "20vw",
      left: card.left,
      top: card.top,
    };
    const cardimg = Cardimg({ n: card.n });
    return (
      <Pressable style={style} key={index} onPress={() => selectCard(index)}>
        {/* <Animated.View
          style={[
            { width: "100%", height: "100%" },
            { transform: [{ rotate: spin }] },
          ]}
        /> */}
        <Image source={cardimg} style={styles.img}></Image>
        {card.sel && (
          <Image source={c_border_red} style={styles.border}></Image>
        )}
      </Pressable>
    );
  });

  return <>{render}</>;
}

const styles = StyleSheet.create({
  Container: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "20vw",
    height: "20vw",
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: "10%",
    borderColor: "red",
    borderWidth: "89",
  },
  border: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});
