import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Landing from "./Screens/Landing";
import Login from "./Screens/Login";
import Campus from "./Screens/Campus";
import Subjects from "./Screens/Subjects";
import Chapters from "./Screens/Chapters";
import Content from "./Screens/Content";
// import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen";
// import { useEffect } from "react";

// SplashScreen.preventAutoHideAsync();
const Stack = createStackNavigator();

export default function App() {
  // const [loaded, error] = useFonts({
  //   'NerkoOne': require("./assets/fonts/NerkoOne.ttf"),
  // });

  // useEffect(() => {
  //   if (loaded || error) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded, error]);

  // if (!loaded && !error) {
  //   return null;
  // }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen
          name="Landing"
          component={Landing}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Campus"
          component={Campus}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Subjects"
          component={Subjects}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Chapters"
          component={Chapters}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Content"
          component={Content}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
