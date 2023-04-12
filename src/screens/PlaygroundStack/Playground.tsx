/**
 * @author Ali Burhan Keskin <alikeskin@milva.com>
 */
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import Routes, { PlaygroundStackParams } from "@utils/Routes";
import { useAppSelector } from "@utils/redux/store";
import { dispatcher } from "@helpers/redux";
import {
  SET_LEFT,
  SET_RIGHT,
  SET_CARD,
  ROLL_CARD,
  CHANGE_MODE,
} from "@modules/playground/redux/playgroundSlice";

import BoardContainer from "@modules/Playground/components/BoardContainer";
import RedHeaderbar from "@modules/playground/components/RedHeaderbar";

function Playground() {
  const route = useRoute<RouteProp<PlaygroundStackParams, Routes.Playground>>();
  const id = route?.params?.id;

  return (
    <View style={styles.container}>
      <RedHeaderbar />
      <BoardContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    alignItems: "center",
  },
});

export default Playground;
