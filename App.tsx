/**
 * @author Ali Burhan Keskin <alikeskin@milva.com>
 */
import React, { useEffect } from "react";
import { enableScreens } from "react-native-screens";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import * as ScreenOrientation from "expo-screen-orientation";
import { Platform } from "react-native";
import RootNavigation from "./src/routers";
import CustomProvider from "./src/providers";
import Store from "./src/utils/redux/store";
import { MenuProvider } from "react-native-popup-menu";
import { SwipeModalProvider } from "react-native-swipe-modal";

enableScreens();

function App() {
  useEffect(() => {
    if (Platform.OS !== "web") {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    }
  }, []);

  return (
    <Provider store={Store}>
      <CustomProvider>
        <SwipeModalProvider>
          <MenuProvider>
            <RootNavigation />
          </MenuProvider>
        </SwipeModalProvider>
      </CustomProvider>
    </Provider>
  );
}

export default App;
