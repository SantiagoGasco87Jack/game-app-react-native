import * as React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import { useAppSelector } from "@utils/redux/store";
import { Dimensions } from "react-native";
import translate from "@helpers/localization";
import { enableScreens } from "react-native-screens";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Routes, { PlaygroundStackParams } from "@utils/Routes";
import { useTheme } from "@src/hooks";
import { navigationRef } from "./Router";
import Playground from "./PlaygroundStack";

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

const mainTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#FFF",
  },
};

function RootNavigation() {
  const theme = useTheme();

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef} theme={mainTheme}>
        <Stack.Navigator
          initialRouteName={Routes.Landing}
          screenOptions={{ ...screenOptions, headerTintColor: theme.primary }}
        >
          <Stack.Screen
            name={Routes.Landing}
            component={Playground}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default React.memo(RootNavigation);

// import * as Linking from 'expo-linking';
// import * as Notifications from 'expo-notifications';
// const prefix = Linking.createURL('/');

// const notificationType = {
//   Post: 1,
// };

// // Change ip
// const baseUrl = 'exp://111.111.111.111:19000/--';

// const config = {
//   screens: {
//     Home: {
//       screens: {

//         Profile: {

//           screens: {
//             Post: 'mypost/:id',
//           },

//         }

//       },
//     },
//   },
// };

// const _linking = {
//   prefixes: [prefix],
//   config,
//   subscribe(listener) {

//     const onReceiveURL = ({ url }) => listener(url);

//     Linking.addEventListener('url', onReceiveURL);

//     const subscription = Notifications.addNotificationResponseReceivedListener((response) => {

//       // From API
//       const data = response?.notification?.request?.content.data;

//       if (data?.NotificationId === notificationType.Post) {

//         listener(`${baseUrl}/mypost/${data?.Data}`);

//       }

//     });

//     return () => {

//       Linking.removeEventListener('url', onReceiveURL);

//       subscription.remove();

//     };

//   },
// };
