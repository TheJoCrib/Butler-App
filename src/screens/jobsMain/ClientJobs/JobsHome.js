import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import MainBackground from "../../../containers/common/MainBackground";
import {
  screenHeightInPercent,
  screenWidthInPercent,
} from "../../../utils/screenDimensions";
import R from "../../../assets";
import { useDispatch, useSelector } from "react-redux";
import { setAppLoading } from "../../../modules/general/actions";
import { getJobsList } from "../../../network/jobApi";
import { setJobsList } from "../../../modules/jobsCards.js/actions";

const JobsHome = ({ navigation }) => {
  const user = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  console.log("user===>", user.token);

  useEffect(() => {
    console.log("use Effect    k ");
    if (user?.token) {
      dispatch(setAppLoading(true));
      getJobsList()
        .then((res) => {
          dispatch(setAppLoading(false));
          dispatch(setJobsList(res?.data));
        })
        .catch((err) => {
          dispatch(setAppLoading(false));
        });
    }
  }, []);
  return (
    <MainBackground showButler>
      <View style={styles.mainView}>
        <Text style={styles.mainTxt}>My Jobs</Text>
        <View style={styles.contentView}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("JobsList", { jobType: "Current Jobs" })
            }
            style={[
              styles.card,
              { backgroundColor: R.colors.PrimaryColorDark },
            ]}
          >
            <Text style={styles.cardTxt}>Current Jobs</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("JobsList", { jobType: "Previous Jobs" })
            }
            style={[styles.card, { backgroundColor: R.colors.LightGrey }]}
          >
            <Text style={styles.cardTxt}>Previous Jobs</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={{ height: screenHeightInPercent(12) }} /> */}
        <View style={{ justifyContent: "flex-end" }}>
          <Image
            style={{
              width: screenWidthInPercent(100),
              resizeMode: "contain",
              height: screenHeightInPercent(10),
            }}
            source={R.images.birds}
          />
        </View>
      </View>
    </MainBackground>
  );
};

export default JobsHome;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginTop: screenHeightInPercent(Platform.OS == "ios" ? 16 : 22),
  },
  contentView: {
    flex: 1,
    justifyContent: "space-around",
    paddingTop: screenHeightInPercent(5),
  },
  mainTxt: {
    color: "#a1a1a1",
    textAlign: "center",
    fontFamily: R.fonts.Maven_bold,
    fontSize: screenHeightInPercent(3.4),
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
    fontFamily: R.fonts.BalooBhai_extrabold,
    fontSize: screenHeightInPercent(3.9),
    color: R.colors.White,
  },
});
