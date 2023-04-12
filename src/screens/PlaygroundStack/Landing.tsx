/**
 * @author Ali Burhan Keskin <alikeskin@milvasoft.com>
 */
import React, { useCallback, useState } from "react";
import { Text, View, StyleSheet, Button, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector } from "@utils/redux/store";
import { navigate } from "@src/routers/Router";
import Routes, { PlaygroundStackParams } from "@src/utils/Routes";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Cardimg from "@modules/playground/components/Cardimg";

const bg = require("@src/assets/images/i_bg.png");

const mainButton = require("@src/assets/images/mainButton.png");

function Landing() {
  const playGame = useAppSelector((s) => s.PlaygroundReducer?.playGame);
  const mainLogo = Cardimg({ order: playGame + "Logo" });
  const navigation =
    useNavigation<StackNavigationProp<PlaygroundStackParams>>();

  const goToPlayground = useCallback(
    () => navigation.navigate(Routes.Playground),
    [navigation]
  );

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <Image source={bg} style={styles.bgimg} />
        <Image source={mainLogo} style={styles.mainLogo} />
        <Pressable onPress={goToPlayground}>
          <Image source={mainButton} style={styles.mainButton} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default Landing;

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },

  // root: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },

  // container: {
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginTop: 30,
  // },

  // fontBlack: {
  //   fontFamily: "Black",
  // },

  // counter: {
  //   marginTop: 30,
  //   fontSize: 30,
  //   color: "red",
  // },

  // button: {
  //   marginTop: 20,
  // },

  // siginButton: {
  //   marginTop: 50,
  // },
  container: {
    flex: 1,
    alignItems: "center",
    width: "100vw",
    height: "100%",
    justifyContent: "space-between",
  },
  bgimg: {
    position: "absolute",
    width: "100vw",
    height: "100%",
  },
  mainLogo: {
    marginTop: "50%",
    width: "35vw",
    height: "35vw",
  },
  mainButton: {
    marginBottom: "40%",
    width: "70vw",
    height: "20vw",
  },
});
