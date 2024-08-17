import "react-native-gesture-handler";
import React, { Component } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import configureStore from "./src/config-store";
import AppContainer from "./src/containers/appContainer";
import FlashMessage from "react-native-flash-message";
import Toast from "react-native-toast-notifications";
import { Text, View } from "react-native";

export const { store, persistor } = configureStore();

class App extends Component {
  render() {
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
