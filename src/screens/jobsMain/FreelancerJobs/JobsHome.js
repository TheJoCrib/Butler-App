import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import MainBackground from "../../../containers/common/MainBackground";
import {
  screenHeightInPercent,
  screenWidthInPercent,
} from "../../../utils/screenDimensions";
import R from "../../../assets";
import { useDispatch, useSelector } from "react-redux";
import { getJobsList } from "../../../network/jobApi";
import { setJobsList } from "../../../modules/jobsCards.js/actions";
import { setAppLoading } from "../../../modules/general/actions";
import { useFocusEffect } from "@react-navigation/native";

const JobsHome = ({ navigation }) => {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [notification, setNotinfication] = useState(0);

  useFocusEffect(
    useCallback(async () => {
      getJobsList()
        .then((res) => {
          var list = res.data.filter((d) => d.status == "PENDING");
          setNotinfication(list.length);
          dispatch(setJobsList(res?.data));
        })
        .catch((err) => {});
    }, [])
  );

  useEffect(() => {
    if (user?.token) {
      dispatch(setAppLoading(true));
      getJobsList()
        .then((res) => {
          var list = res.data.filter((d) => d.status == "PENDING");
          setNotinfication(list.length);
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
          <View style={{ height: screenHeightInPercent(3) }} />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("JobsList", { jobType: "New Jobs" })
            }
            style={[
              styles.card,
              { backgroundColor: R.colors.PrimaryColorDarkExtra },
            ]}
          >
            {notification > 0 && (
              <View style={styles.notificationView}>
                <Text style={styles.notificationTxt}>{notification}</Text>
              </View>
            )}

            <Text style={styles.cardTxt}>New Jobs</Text>
          </TouchableOpacity>
          <View style={{ height: screenHeightInPercent(5) }} />
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
          <View style={{ height: screenHeightInPercent(5) }} />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("JobsList", { jobType: "Previous Jobs" })
            }
            style={[styles.card, { backgroundColor: R.colors.LightGrey }]}
          >
            <Text style={styles.cardTxt}>Previous Jobs</Text>
          </TouchableOpacity>
        </View>
        <View style={{}}>
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
    justifyContent: "flex-start",
    paddingTop: screenHeightInPercent(3),
  },
  mainTxt: {
    color: "#a1a1a1",
    textAlign: "center",
    fontFamily: R.fonts.Maven_bold,
    fontSize: screenHeightInPercent(3.4),
  },
  card: {
    height: screenHeightInPercent(11),
    width: screenWidthInPercent(75),
    alignSelf: "center",
    borderRadius: screenHeightInPercent(2),
    justifyContent: "center",
    alignItems: "center",
  },
  cardTxt: {
    fontFamily: R.fonts.Maven_medium,
    fontSize: screenHeightInPercent(3.2),
    color: R.colors.White,
  },
  // notificationTxt: {
  //   backgroundColor: R.colors.Red,
  //   width: screenHeightInPercent(6.5),
  //   height: screenHeightInPercent(6.5),
  //   textAlign: "center",
  //   textAlignVertical: "center",
  //   borderRadius: screenHeightInPercent(4),
  //   position: "absolute",
  //   right: -screenWidthInPercent(4),
  //   top: -screenHeightInPercent(3.2),
  //   fontFamily: R.fonts.Inter_regular,
  //   color: R.colors.White,
  //   fontSize: screenHeightInPercent(2.5),
  // },
  notificationTxt: {
    textAlign: "center",
    textAlignVertical: "center",
    fontFamily: R.fonts.Inter_regular,
    color: R.colors.White,
    fontSize: screenHeightInPercent(2.5),
  },
  notificationView: {
    backgroundColor: R.colors.Red,
    opacity: 1,
    width: screenHeightInPercent(6.5),
    height: screenHeightInPercent(6.5),
    borderRadius: screenHeightInPercent(4),
    justifyContent: "center",
    position: "absolute",
    right: -screenWidthInPercent(1.5),
    top: -screenHeightInPercent(3.2),
  },
});
