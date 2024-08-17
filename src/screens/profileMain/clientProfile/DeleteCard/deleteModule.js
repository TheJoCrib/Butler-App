import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import R from "../../../../assets";
import RoundedBG2 from "../../../../containers/common/RoundedBG2"; // Updated to RoundedBG2
import CirclesDesign from "../../../../assets/images/circles_design.svg";
import {
  screenHeightInPercent,
  screenWidthInPercent,
} from "../../../../utils/screenDimensions";

const DeleteConfirmation = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          position: "relative",
          right: -130,
          zIndex: 999,
          marginTop: -60,
        }}
      >
        <CirclesDesign />
      </View>
      <View style={styles.content}>
        <Image
          source={R.images.butlerLogo}
          style={styles.logo}
          resizeMode="contain"
        />
        <RoundedBG2
          borderRadius={10}
          backgroundColor={R.colors.White}
          marginTop={screenHeightInPercent(5)}
          paddingHorizontal={60}
          paddingTop={45} // Changed from paddingVertical to paddingTop
        >
          <View
            style={{
              justifyContent: "center",
              alignSelf: "center",
              paddingBottom: "20%",
            }}
          >
            <Text style={styles.message}>Account Deleted</Text>
            <TouchableOpacity
              style={[styles.button]}
              onPress={() => console.log("User clicked ok.. lol. ")} // Replace "Home" with your actual route
            >
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </RoundedBG2>
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Image
          style={{
            width: screenWidthInPercent(100),
            resizeMode: "contain",
            height: screenHeightInPercent(10),
          }}
          source={R.images.deleteLeaves}
        />
      </View>
    </SafeAreaView>
  );
};

export default DeleteConfirmation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.GreenDarkColor,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: screenHeightInPercent(-40),
  },
  logo: {
    width: screenWidthInPercent(46),
    height: screenHeightInPercent(20),
  },
  message: {
    fontFamily: R.fonts.Maven_semiBold,
    fontSize: screenHeightInPercent(3),
    color: R.colors.DarkBlack,
    textAlign: "center",
    marginBottom: screenHeightInPercent(2),
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: R.colors.PrimaryColorDark,
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 15, // Increase this value to add more space around the text
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center", // Ensure the button is centered within its container
  },

  buttonText: {
    color: R.colors.White,
    fontSize: screenHeightInPercent(2),
    fontFamily: R.fonts.Maven_medium,
  },
});
