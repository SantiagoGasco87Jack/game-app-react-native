/**
 * @author Ali Burhan Keskin <alikeskin@milva.com>
 */
import * as React from "react";
import Landing from "@screens/PlaygroundStack/Landing";
import Settings from "@screens/PlaygroundStack/Settings";
import Playground from "@screens/PlaygroundStack/Playground";
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import { Dimensions } from "react-native";
import Routes, { PlaygroundStackParams } from "@utils/Routes";
import translate from "@helpers/localization";
import { enableScreens } from "react-native-screens";
import { useTheme } from "@src/hooks";

enableScreens();

const Stack = createStackNavigator<PlaygroundStackParams>();

const screenOptions: StackNavigationOptions = {
  gestureEnabled: true,
  gestureResponseDistance: Dimensions.get("screen").width,
  headerShown: true,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerStyle: { backgroundColor: "#FFF" },
  headerTitleStyle: { fontFamily: "Bold" },
  headerTitleAlign: "center",
};

function PlaygroundStack() {
  const theme = useTheme();
  return (
    <Stack.Navigator
      initialRouteName={Routes.Landing}
      screenOptions={{ ...screenOptions, headerTintColor: theme.primary }}
    >
      <Stack.Screen
        name={Routes.Landing}
        component={Landing}
        options={{
          headerTitle: translate("navigation.landing"),
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={Routes.Settings}
        component={Settings}
        options={{
          headerTitle: translate("navigation.settings"),
        }}
      />

      <Stack.Screen
        name={Routes.Playground}
        component={Playground}
        options={{
          headerTitle: translate("navigation.landing"),
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default React.memo(PlaygroundStack);
