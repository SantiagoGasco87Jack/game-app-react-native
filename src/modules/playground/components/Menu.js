import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { dispatcher } from "@helpers/redux";
import {
  CHANGE_MODE,
  NEW_GAME,
} from "@modules/playground/redux/playgroundSlice";
import { useAppSelector } from "@utils/redux/store";
import { navigate } from "@src/routers/Router";
import Routes, { PlaygroundStackParams } from "@src/utils/Routes";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

const checkimg = require("@src/assets/images/check.png");
const t_menu = require("@src/assets/images/t_menu.png");

const menu = [
  { label: "Regular dice game" },
  { label: "Poker dice game" },
  { label: "Chess dice game" },
  { label: "Settings" },
];

export default function Menubar({}) {
  const navigation = useNavigation();

  const goToSettings = useCallback(() => navigate(Routes.Settings), []);
  const gameMode = useAppSelector((s) => s.PlaygroundReducer?.gameMode);

  const pressHandler = (item) => {
    if (item.label == "Settings") {
      goToSettings();
      return;
    }
    if (confirm("Do you want to change mode for new game?")) {
      dispatcher(
        CHANGE_MODE({ gameMode: item.label.replace(" dice game", "") })
      );
      dispatcher(NEW_GAME());
    }
  };

  return (
    <Menu style={styles.menuContainer}>
      <MenuTrigger>
        <Image source={t_menu} style={styles.menu} />
      </MenuTrigger>
      <MenuOptions style={styles.menuOptions}>
        {menu.map((item, key) => {
          return (
            <MenuOption
              style={styles.Row}
              key={key}
              onSelect={() => pressHandler(item)}
            >
              {item.label.includes(gameMode) ? (
                <Image source={checkimg} style={styles.checkstyle} />
              ) : (
                <Image style={styles.checkstyle} />
              )}
              <Text style={styles.label}>{item.label}</Text>
            </MenuOption>
          );
        })}
      </MenuOptions>
    </Menu>
  );
}

const styles = StyleSheet.create({
  menuContainer: {},
  menuOptions: {
    width: "100%",
    height: "100%",
  },
  Row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#9B9B9B",
    borderBottomWidth: 1,
    width: "100%",
    height: "25%",
  },
  label: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "70%",
    marginLeft: "5%",
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "4vw",
    lineHeight: 17,
    color: "#9B9B9B",
  },
  checkstyle: {
    width: "5vw",
    height: "5vw",
  },
  menu: {
    width: "15vw",
    height: "15vw",
  },
});
