import "react-native-gesture-handler";
import React, { Component } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import configureStore from "./src/config-store";
import AppContainer from "./src/containers/appContainer";
import FlashMessage from "react-native-flash-message";
import * as Font from "expo-font";
import fonts from "./assets/fonts";
import Toast from "react-native-toast-notifications";
import { View, ActivityIndicator } from "react-native";
import "./src/utils/logBoxRendering";
import * as SplashScreen from "expo-splash-screen";

export const { store, persistor } = configureStore();

SplashScreen.preventAutoHideAsync(); // Basically Prevent the splash screen from auto-hiding

class App extends Component {
  state = {
    fontsLoaded: false,
  };

  async componentDidMount() {
    const loaded = await this.loadFonts();
    if(loaded) {
      await SplashScreen.hideAsync();
    }

    /*
    setTimeout(() => {
      SplashScreen.hideAsync(); //Basically Hide splash screen after the delay
    }, 1500); // Basically Adjust the delay time as needed (3000 ms = 3 seconds)
    */
  }

  loadFonts = async () => {
    try {
      await Font.loadAsync(fonts);
      this.setState({ fontsLoaded: true });
      return true
    } catch (error) {
      console.error("Error loading fonts:", error);
    }
  };

  render() {
    if (!this.state.fontsLoaded) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    return (
      <SafeAreaProvider style={{ flex: 1, backgroundColor: "#fff" }}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <FlashMessage position="bottom" />
            <AppContainer />
            <Toast ref={(ref) => (global.toast = ref)} />
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    );
  }
}

export default App;
