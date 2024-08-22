import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CreateRootNavigator from "../routes";
import { connect } from "react-redux";
import { isLoginSelector } from "../modules/auth/selectors";

const USER_KEY = "accessToken";
const USER_DATA = "userData";

class AppContainer extends Component {
  state = {
    signedIn: null,
    isOnboarding: null,
  };

  async componentDidMount() {
    try {
      const [[, accessToken], [, userData]] = await AsyncStorage.multiGet([
        USER_KEY,
        USER_DATA,
      ]);

      if (accessToken) {
        this.setState({
          signedIn: true,
          isOnboarding: false, // Assume onboarding is false if signed in
          data: JSON.parse(userData),
        });
      } else {
        this.setState({ signedIn: false, isOnboarding: false });
      }
    } catch (err) {
      console.error("Error retrieving data from AsyncStorage:", err);
      this.setState({ signedIn: false, isOnboarding: false });
    }
  }

  render() {
    const { isLogin } = this.props;
    const { signedIn, isOnboarding } = this.state;

    if (signedIn === null || isOnboarding === null) {
      // Show a loading indicator while AsyncStorage is being checked
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    return (
      <CreateRootNavigator
        signedIn={isLogin || signedIn}
        isOnboarding={isOnboarding}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  isLogin: isLoginSelector(state),
});

export default connect(mapStateToProps)(AppContainer);
