import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import {
  screenHeightInPercent,
  screenWidthInPercent,
} from "../../utils/screenDimensions";
import R from "../../assets";
import MainBackground from "../../containers/common/MainBackground";

const JobChatHome = ({ navigation }) => {
  return (
    <MainBackground showButler>
      <View style={styles.mainView}>
        <Text style={styles.mainTxt}>Jobs</Text>
        <View style={styles.contentView}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("JobChatList", {
                chatListType: "discussion jobs",
              })
            }
            style={[
              styles.card,
              { backgroundColor: R.colors.PrimaryColorDarkExtra },
            ]}
          >
            <Text style={styles.cardTxt}>Discussion</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("JobChatList", {
                chatListType: "active jobs",
              })
            }
            style={[styles.card, { backgroundColor: R.colors.PrimaryLight2 }]}
          >
            <Text style={styles.cardTxt}>Active Jobs</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={{ height: screenHeightInPercent(12) }} /> */}
        {/* <View style={{ backgroundColor: "transparent" }}> */}
        <Image
          style={{
            width: screenWidthInPercent(100),
            resizeMode: "contain",
            height: screenHeightInPercent(12),
            //   backgroundColor: R.colors.White,
            // position: "absolute",
            // bottom: 0,
          }}
          source={R.images.birds}
        />
        {/* </View> */}
      </View>
    </MainBackground>
  );
};

export default JobChatHome;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginTop: screenHeightInPercent(Platform.OS == "ios" ? 20 : 25),
  },
  contentView: {
    flex: 1,
    justifyContent: "space-around",
    paddingTop: screenHeightInPercent(5),
  },
  mainTxt: {
    color: "#a1a1a1",
    textAlign: "center",
    fontFamily: R.fonts.Maven_semiBold,
    fontSize: screenHeightInPercent(4.2),
  },
  card: {
    height: screenHeightInPercent(17),
    width: screenWidthInPercent(90),
    alignSelf: "center",
    borderRadius: screenHeightInPercent(2),
    justifyContent: "center",
    alignItems: "center",
  },
  cardTxt: {
    fontFamily: R.fonts.Maven_bold,
    fontSize: screenHeightInPercent(3.8),
    color: R.colors.White,
  },
});
