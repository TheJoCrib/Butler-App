import { StyleSheet, Text, View, Alert, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import R from "../../../assets";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  screenHeightInPercent,
  screenWidthInPercent,
} from "../../../utils/screenDimensions";
import Icons from "../../../containers/common/Icons";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import RoundedBG from "../../../containers/common/RoundedBG";
import MainBackground from "../../../containers/common/MainBackground";
import { logout } from "../../../modules/auth/actions";
// import { showMessage } from "react-native-flash-message";
import { setAppLoading } from "../../../modules/general/actions";
import { getAllCards } from "../../../network/paymentApi";
import { setCardsList } from "../../../modules/jobsCards.js/actions";
import RoundedBG2 from "../../../containers/common/RoundedBG2";
import { Platform } from "react-native";
import Dialog from "react-native-dialog"
import { softDeleteAccount } from "../../../network/userApi";


const ProfileHome = ({ navigation }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [deletionVisible, setDeletionVisible] = useState(false);

  const handleLogout = () => {
    setVisible(false);
    dispatch(logout());
  };

  const handleDeleteAccount = () => {
    setDeletionVisible(false);
    dispatch(setAppLoading(true));

    navigation.navigate("DeleteModule");
    setTimeout(() => {
      
        dispatch(logout());
        softDeleteAccount(user?._id);
        Alert.alert("Success!, we hope to see you again soon!")
        setTimeout(() => {
          Alert.alert("Restart your application for all changes to go through")
        }, 3000);
    }, 6000);
  };

  return (
    <MainBackground showButler={true}>
      <Text
        style={{
          textAlign: "center",
          fontFamily: R.fonts.Maven_semiBold,
          fontSize: screenHeightInPercent(4.2),
          color: R.colors.Grey,
          marginTop:
            Platform.OS == "ios"
              ? screenHeightInPercent(20)
              : screenHeightInPercent(25),
        }}
      >
        Account
      </Text>
      <RoundedBG2
        paddingHorizontal={0.001}
        marginTop={screenHeightInPercent(3)}
      >
        {/* User Data section */}
        <View
          style={{
            marginTop: 18,
            backgroundColor: "#fff",
            paddingHorizontal: screenWidthInPercent(4),
          }}
        >
          {/* user Heading */}
          <View
            style={[
              R.appStyles.rowSpaceBtwn,
              {
                borderBottomWidth: 1,
                borderBottomColor: R.colors.BorderPrimaryLight,
                paddingBottom: 10,
              },
            ]}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={R.images.userInfoIcon}
                style={{
                  width: screenHeightInPercent(3),
                  height: screenHeightInPercent(2),
                  resizeMode: "contain",
                }}
              />
              <Text style={styles.userH}>User Detail</Text>
            </View>
            <TouchableOpacity
              style={{ paddingHorizontal: 5 }}
              onPress={() => navigation.navigate("EditProfile")}
            >
              <Icons
                family={"MaterialIcons"}
                name="edit"
                size={22}
                color={R.colors.Grey}
              />
            </TouchableOpacity>
          </View>

          <View>
            <View style={styles.userDataRow}>
              <Text style={styles.userFieldTxt}>Full Name:</Text>
              <Text numberOfLines={1} style={styles.userValueTxt}>
                {user?.firstName} {user?.lastName}
              </Text>
            </View>
            <View style={styles.userDataRow}>
              <Text style={styles.userFieldTxt}>Email:</Text>
              <Text numberOfLines={1} style={styles.userValueTxt}>
                {user?.email}
              </Text>
            </View>
            <View style={styles.userDataRow}>
              <Text style={styles.userFieldTxt}>Phone:</Text>
              <Text numberOfLines={1} style={styles.userValueTxt}>
                🇪🇬{user?.phone}
              </Text>
            </View>
            <View style={styles.userDataRow}>
              <Text style={styles.userFieldTxt}>Password:</Text>
              <TouchableOpacity
                style={{ flex: 2 }}
                onPress={() => navigation.navigate("ChangePassword")}
              >
                <Text style={[styles.userValueTxt, styles.userUnderLineTxt]}>
                  Change Password
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.userDataRow}>
              <Text style={styles.userFieldTxt}>Payment method:</Text>
              <TouchableOpacity
                style={{ flex: 2 }}
                onPress={() => {
                  dispatch(setAppLoading(true));
                  getAllCards(user?._id)
                    .then((res) => {
                      dispatch(setAppLoading(false));
                      dispatch(setCardsList(res));
                      navigation.navigate("PaymentCardsList");
                    })
                    .catch((err) => {
                      dispatch(setAppLoading(false));
                    });
                }}
              >
                <Text style={[styles.userValueTxt, styles.userUnderLineTxt]}>
                  Add Payment Method
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.userDataRow}>
              <Text style={styles.userFieldTxt}>Logout:</Text>
              <TouchableOpacity
                style={{ flex: 2 }}
                onPress={() => {
                  Alert.alert("Logout", "Are you sure want to logout", [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel",
                    },
                    { text: "OK", onPress: () => dispatch(logout()) },
                  ]);
                }}
              >
                <Text style={[styles.userValueTxt, styles.userUnderLineTxt]}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.userDataRow,
                { paddingBottom: 20, borderBottomWidth: 0 },
              ]}
            >
              <Text style={styles.userFieldTxt}>Delete Account:</Text>
              <TouchableOpacity
                style={{ flex: 2 }}
                onPress={() => setDeletionVisible(true)}
              >
                <Text style={[styles.userValueTxt, styles.userUnderLineTxt]}>
                  <Text style={{ color: R.colors.Red }}>Delete Account</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </RoundedBG2>
      <TouchableOpacity
        style={{ alignSelf: "flex-end", marginTop: 15, marginRight: 20 }}
        onPress={
          () => navigation.navigate("SupportChatList")
          // showMessage({ type: "success", message: `How can I help` })
        }
      >
        <Text style={[styles.help]}>Need Help?</Text>
      </TouchableOpacity>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Image
          style={{
            width: screenWidthInPercent(100),
            resizeMode: "contain",
            height: screenHeightInPercent(10),
          }}
          source={R.images.birds}
        />
      </View>
      {/* Logout Dialog */}
      <Dialog.Container visible={visible}>
        <Dialog.Title>Logout</Dialog.Title>
        <Dialog.Description>Are you sure want to logout?</Dialog.Description>
        <Dialog.Button
          label="Cancel"
          onPress={() => setVisible(false)}
          color="green"
        />
        <Dialog.Button label="OK" onPress={handleLogout} />
      </Dialog.Container>

      {/* Account Deletion Dialog */}
      <Dialog.Container visible={deletionVisible}>
        <Dialog.Title>Account Deletion</Dialog.Title>
        <Dialog.Description>Are you sure want to delete?</Dialog.Description>

        <Dialog.Button
          label="Delete"
          onPress={() => {
            handleDeleteAccount();
            //add other functions later if necessary
          }}
          color="red"
        />
        <Dialog.Button
          label="Cancel"
          onPress={() => setDeletionVisible(false)}
          color="green"
        />
      </Dialog.Container>
    </MainBackground>
  );
};

export default ProfileHome;

const styles = StyleSheet.create({
  userH: {
    marginLeft: 10,
    fontSize: screenHeightInPercent(1.7),
    color: R.colors.DarkBlack,
    fontFamily: R.fonts.Maven_regular,
  },
  aboutTxt: {
    fontSize: screenHeightInPercent(1.7),
    color: R.colors.MediumDarkGrey,
    fontFamily: R.fonts.Inter_regular,
  },
  userDataRow: {
    borderBottomWidth: 1,
    borderBottomColor: R.colors.BorderPrimaryLight,
    paddingHorizontal: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  userFieldTxt: {
    flex: 1,
    fontSize: screenHeightInPercent(1.5),
    color: R.colors.Grey,
    fontFamily: R.fonts.Maven_regular,
  },
  userValueTxt: {
    flex: 2,
    fontSize: screenHeightInPercent(1.5),
    color: R.colors.DarkBlack,
    fontFamily: R.fonts.Maven_regular,
  },
  userUnderLineTxt: {
    textDecorationColor: R.colors.PrimaryColorDark,
    textDecorationLine: "underline",
    color: R.colors.PrimaryColorDark,
  },
  help: {
    fontSize: screenHeightInPercent(1.4),
    color: R.colors.DarkGrey,
    fontFamily: R.fonts.Maven_medium,
    textDecorationLine: "underline",
  },
});
