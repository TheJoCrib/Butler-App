import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import MainBackground from "../../../containers/common/MainBackground";
import R from "../../../assets";
import {
  screenHeightInPercent,
  screenWidthInPercent,
} from "../../../utils/screenDimensions";
import Icons from "../../../containers/common/Icons";
// import { showMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from "react-redux";
import { getHomeData } from "../../../network/jobApi";
import { useEffect } from "react";
import { setAppLoading } from "../../../modules/general/actions";

const HomeFreelancer = () => {
  const { user } = useSelector((state) => state.auth);
  const userr = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (userr?.token) {
      dispatch(setAppLoading(true));
      getHomeData()
        .then((res) => {
          dispatch(setAppLoading(false));
          setData(res);
        })
        .catch((err) => {
          dispatch(setAppLoading(false));
        });
    }
  }, []);
  return (
    <MainBackground showButler>
      <View
        style={{
          marginTop: screenHeightInPercent(Platform.OS == "ios" ? 12 : 17),
          paddingHorizontal: screenWidthInPercent(7),
        }}
      >
        <Text style={styles.headTxt}>My Jobs</Text>
        <View style={styles.cardRow}>
          <View style={styles.card}>
            <Text style={styles.cardHead}>{data?.activeJobsCount}</Text>
            <Text style={styles.cardTxt}>Current Jobs</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardHead}>{data?.previousJobsCount}</Text>
            <Text style={styles.cardTxt}>Previous Jobs</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardHead}>${data?.walletBalance}</Text>
            <Text style={styles.cardTxt}>Wallet</Text>
          </View>
        </View>
        <Image style={styles.mainImg} source={R.images.HomeImg} />
        <View style={[styles.cardRow, styles.longBtn]}>
          <Text style={styles.btnTxt}>Balance</Text>
          <Text style={styles.earnTxt}>
            {data?.walletBalance}
            <Text style={{ fontSize: screenHeightInPercent(1.1) }}>EGP</Text>
          </Text>
          <TouchableOpacity style={[R.appStyles.rowCenter]}>
            <Text style={[styles.btnTxt, { alignItems: "center" }]}>
              Transfer
            </Text>
            <Icons
              family={"AntDesign"}
              name="swap"
              size={screenHeightInPercent(1.8)}
              color={R.colors.White}
            />
          </TouchableOpacity>
        </View>
      </View>
    </MainBackground>
  );
};

export default HomeFreelancer;

const styles = StyleSheet.create({
  headTxt: {
    fontSize: screenHeightInPercent(4.2),
    color: "#A1A1A1",
    fontFamily: R.fonts.Maven_semiBold,
    textAlign: "center",
  },
  earnTxt: {
    fontSize: screenHeightInPercent(3),
    color: "#344F4A",
    fontFamily: R.fonts.Maven_regular,
    opacity: 0.6,
    textAlign: "center",
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: screenHeightInPercent(2),
    paddingHorizontal: screenWidthInPercent(0),
  },
  card: {
    width: screenWidthInPercent(24),
    height: screenWidthInPercent(24),
    borderRadius: screenWidthInPercent(5),
    backgroundColor: R.colors.PrimaryColorDark,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: screenWidthInPercent(13),
    height: screenWidthInPercent(13),
  },
  cardHead: {
    fontFamily: R.fonts.Maven_semiBold,
    color: "#344F4A",
    fontSize: screenHeightInPercent(3.6),
  },
  cardTxt: {
    fontFamily: R.fonts.BalooBhai_regular,
    color: R.colors.White,
    fontSize: screenHeightInPercent(1.4),
    marginTop: screenHeightInPercent(1),
  },
  btnTxt: {
    fontFamily: R.fonts.Maven_regular,
    color: R.colors.Black,
    fontSize: screenHeightInPercent(1.4),
    textAlign: "center",
  },
  mainImg: {
    width: screenHeightInPercent(31),
    height: screenHeightInPercent(31),
    marginTop: screenHeightInPercent(3.5),
    marginBottom: screenHeightInPercent(1),
    resizeMode: "contain",
    alignSelf: "center",
  },
  longBtn: {
    backgroundColor: R.colors.PrimaryColorDark,
    padding: screenHeightInPercent(1.5),
    paddingHorizontal: screenWidthInPercent(4),
    borderRadius: screenHeightInPercent(3),
    marginTop: screenHeightInPercent(4),
  },
  userValueTxt: {
    flex: 2,
    fontSize: screenHeightInPercent(1.6),
    color: R.colors.DarkBlack,
    fontFamily: R.fonts.Inter_regular,
  },
  userUnderLineTxt: {
    textDecorationColor: R.colors.DarkGrey,
    textDecorationLine: "underline",
    color: R.colors.DarkGrey,
  },
});
