import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import MainBackground from "../../containers/common/MainBackground";
import {
  screenHeightInPercent,
  screenWidthInPercent,
} from "../../utils/screenDimensions";
import R from "../../assets";
import Icons from "../../containers/common/Icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getActiveChat,
  getDiscussionChat,
  getSupportChat,
} from "../../network/chatApi";
import {
  setActiveChats,
  setDiscussionChats,
  setSupportChats,
} from "../../modules/chat/actions";
import { setAppLoading } from "../../modules/general/actions";

const ChatHome = ({ navigation }) => {
  const { user } = useSelector((state) => state.auth);
  const { supportChats } = useSelector((state) => state.chats);
  const { discussionChats } = useSelector((state) => state.chats);
  const { activeChats } = useSelector((state) => state.chats);
  const dispatch = useDispatch();
  // console.log("red chat==", supportChats);

  useEffect(async () => {
    dispatch(setAppLoading(true));
    const [supportRes, discRes, activeRes] = await Promise.all([
      getSupportChat(100, 1),
      getDiscussionChat(100, 1),
      getActiveChat(
        user?.userType == "client" ? "client" : "freelancer",
        100,
        1
      ),
    ]);
    dispatch(setAppLoading(false));
    if (supportRes[0].data) {
      dispatch(setSupportChats(supportRes[0].data));
    }
    if (discRes[0].data) {
      dispatch(setDiscussionChats(discRes[0].data));
    }
    if (activeRes[0].data) {
      dispatch(setActiveChats(activeRes[0].data));
    }
  }, []);

  return (
    <MainBackground showButler>
      <View style={styles.mainView}>
        <Text style={styles.mainTxt}>My Chats</Text>
        <View style={styles.contentView}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                user.userType == "freelancer" ? "JobChatList" : "JobChatHome",
                {
                  chatListType: "freelancer jobs",
                }
              )
            }
            style={[
              styles.card,
              { backgroundColor: "rgba(99, 189, 146, 0.61)" },
            ]}
          >
            {/* <View style={styles.notificationView}>
              <Text style={styles.notificationTxt}>2</Text>
            </View> */}
            <Text style={styles.cardTxt}>Jobs</Text>
            <Icons
              family={"FontAwesome5"}
              name="briefcase"
              size={screenHeightInPercent(12)}
              color="#366A52"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.card, { backgroundColor: R.colors.ExtraLightGrey }]}
            onPress={() =>
              navigation.navigate("JobChatList", { chatListType: "support" })
            }
          >
            <Text style={styles.cardTxt}>Support</Text>
            <Icons
              family={"FontAwesome"}
              name="question-circle"
              size={screenHeightInPercent(13)}
              color="#736868"
            />
          </TouchableOpacity>
        </View>
      </View>
    </MainBackground>
  );
};

export default ChatHome;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginTop: screenHeightInPercent(Platform.OS == "ios" ? 20 : 25),
  },
  contentView: {
    flex: 1,
    justifyContent: "space-around",
    marginTop: screenHeightInPercent(7),
    backgroundColor: R.colors.White,
    borderTopLeftRadius: screenHeightInPercent(5.5),
    borderTopRightRadius: screenHeightInPercent(5.5),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: screenWidthInPercent(2.5),
  },
  mainTxt: {
    color: "#a1a1a1",
    textAlign: "center",
    fontFamily: R.fonts.Maven_semiBold,
    fontSize: screenHeightInPercent(4.2),
  },
  card: {
    flex: 1,
    height: screenHeightInPercent(30),
    marginHorizontal: screenWidthInPercent(1.5),
    borderRadius: screenHeightInPercent(3.5),
    alignItems: "center",
    justifyContent: "center",
  },
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
  cardTxt: {
    fontFamily: R.fonts.BalooBhai_regular,
    fontSize: screenHeightInPercent(2.5),
    color: R.colors.Black,
    marginBottom: screenHeightInPercent(2),
    marginTop: -screenHeightInPercent(3),
  },
});
