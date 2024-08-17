import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import MainBackground from "../../containers/common/MainBackground";
import {
  screenHeightInPercent,
  screenWidthInPercent,
} from "../../utils/screenDimensions";
import R from "../../assets";
import Icons from "../../containers/common/Icons";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import { useFocusEffect } from "@react-navigation/native";
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
import { designer, getImageByName } from "../../utils/data";

const JobChatList = ({ navigation, route }) => {
  const { chatListType } = route.params;
  const { user } = useSelector((state) => state.auth);
  // console.log("chat list type===>", chatListType);
  const [searchTxt, setSearchTxt] = useState("");
  const { supportChats } = useSelector((state) => state.chats);
  const { discussionChats } = useSelector((state) => state.chats);
  const { activeChats } = useSelector((state) => state.chats);
  const [ListData, setListData] = useState([]);
  const [SearchedList, setSearchedList] = useState([]);
  const dispatch = useDispatch();

  const searchHandle = (txt) => {
    setSearchTxt(txt);
    if (txt !== "") {
      const searched = List.filter((d) => {
        return d.title.toLowerCase().search(txt.toLowerCase()) !== -1;
      });
      setSearchedList(searched);
    }
  };
  // console.log("list data==>", ListData[0]);

  function formatMessageSendTime(sendTime) {
    const today = moment().startOf("day");
    const sendMoment = moment(sendTime);
    if (sendMoment.isSame(today, "day")) {
      // Message sent today
      return sendMoment.format("h:mm A");
    } else {
      // Message sent on a different day
      return sendMoment.format("MMM D, YY");
    }
  }

  useFocusEffect(
    useCallback(async () => {
      const [supportRes, discRes, activeRes] = await Promise.all([
        getSupportChat(100, 1),
        getDiscussionChat(100, 1),
        getActiveChat(
          user?.userType == "client" ? "client" : "freelancer",
          100,
          1
        ),
      ]);
      if (supportRes[0].data) {
        dispatch(setSupportChats(supportRes[0].data));
      }
      console.log("dis res ===>", discRes[0].data);
      if (discRes[0].data) {
        dispatch(setDiscussionChats(discRes[0].data));
      }
      if (activeRes[0].data) {
        dispatch(setActiveChats(activeRes[0].data));
      }
      chatListType == "support"
        ? setListData(supportRes[0].data)
        : chatListType == "discussion jobs"
        ? setListData(discRes[0].data)
        : setListData(activeRes[0].data);
    }, [])
  );

  useEffect(() => {
    chatListType == "support"
      ? setListData(supportChats)
      : chatListType == "discussion jobs"
      ? setListData(discussionChats)
      : setListData(activeChats);
  }, []);

  return (
    <MainBackground BGcolor={R.colors.White} showButler>
      <View style={styles.mainView}>
        <Text style={styles.mainTxt}>
          {chatListType == "support" ? "Support" : "Jobs"}
        </Text>

        <View style={styles.contentView}>
          {
            <FlatList
              data={ListData}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ flexGrow: 1 }}
              ListHeaderComponent={() =>
                ListData.length == 0 && (
                  <Text
                    style={{
                      fontFamily: R.fonts.Maven_medium,
                      fontSize: 18,
                      color: R.colors.Black,
                      textAlign: "center",
                      marginTop: 40,
                    }}
                  >
                    No Chat Found
                  </Text>
                )
              }
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("ChatSingle", {
                        chatRoomID: item._id,
                        endChat:
                          chatListType == "support"
                            ? true
                            : chatListType == "discussion jobs"
                            ? true
                            : chatListType == "active jobs" &&
                              (item?.job?.status?.toLowerCase() == "done" ||
                                item?.job?.status?.toLowerCase() ==
                                  "completed") &&
                              user?.userType == "freelancer"
                            ? true
                            : false,
                      })
                    }
                    style={styles.card}
                  >
                    <Image
                      source={
                        chatListType == "support"
                          ? R.images.questionMark
                          : getImageByName(item?.title)
                      }
                      resizeMode="contain"
                      style={styles.cardImg}
                    />

                    <View
                      style={{
                        marginLeft: screenWidthInPercent(5),
                        paddingVertical: screenHeightInPercent(2.8),
                        flex: 1,
                      }}
                    >
                      <Text style={styles.chatTitle}>
                        {item?.title
                          ? item.title
                          : item?.admins[0]?.participant?.fullName}
                      </Text>
                      <Text style={styles.chatTxt}>
                        {item?.lastMessage?.body}
                      </Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                      <Text style={styles.chatTxt}>
                        {item?.lastMessage &&
                          formatMessageSendTime(item?.lastMessage?.sentAt)}
                      </Text>
                      <View style={{ height: screenHeightInPercent(2.4) }} />
                      {/* <View style={styles.chatCountBG}>
												<Text style={styles.countTxt}>1</Text>
											</View> */}
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          }

          <View style={styles.createBtnBG}>
            {chatListType == "support" ? (
              <TouchableOpacity
                onPress={() => navigation.navigate("SupportChatList")}
                style={styles.smallBtn}
              >
                <Text style={styles.btnTxt}>CREATE A TICKET</Text>
              </TouchableOpacity>
            ) : (
              <Image
                style={{
                  width: screenWidthInPercent(100),
                  resizeMode: "contain",
                  height: screenHeightInPercent(10),
                  backgroundColor: R.colors.White,
                  // position: "absolute",
                  // bottom: 0,
                }}
                source={R.images.birds}
              />
            )}
          </View>
        </View>
      </View>
    </MainBackground>
  );
};

export default JobChatList;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginTop: screenHeightInPercent(Platform.OS == "ios" ? 20 : 25),
  },
  createBtnBG: {
    alignSelf: "center",
    paddingVertical: screenHeightInPercent(2.6),
  },
  mainTxt: {
    color: "#a1a1a1",
    textAlign: "center",
    fontFamily: R.fonts.Maven_semiBold,
    fontSize: screenHeightInPercent(4.2),
  },
  inputView: {
    borderRadius: screenHeightInPercent(1.3),
    flexDirection: "row",
    height: screenHeightInPercent(7),
    backgroundColor: R.colors.LightGreyShade,
    marginHorizontal: screenWidthInPercent(5),
    alignItems: "center",
    paddingHorizontal: screenWidthInPercent(4),
    // paddingVertical: screenHeightInPercent(0.8),
    marginBottom: screenHeightInPercent(2),
  },
  input: {
    flex: 1,
    fontFamily: R.fonts.BalooBhai_bold,
    fontSize: screenHeightInPercent(1.8),
    color: R.colors.Black,
  },
  contentView: {
    flex: 1,
    marginTop: screenHeightInPercent(2),
  },
  card: {
    marginVertical: screenHeightInPercent(0.8),
    height: screenHeightInPercent(9.5),
    flexDirection: "row",
    backgroundColor: "rgba(129, 201, 166, 0.24)",
    alignItems: "center",
    paddingHorizontal: screenWidthInPercent(4),
    borderRadius: screenHeightInPercent(1.3),
    marginHorizontal: screenWidthInPercent(5),
  },
  cardImg: {
    height: screenHeightInPercent(6),
    width: screenHeightInPercent(6),
    borderRadius: screenHeightInPercent(3),
  },
  chatTitle: {
    fontFamily: R.fonts.BalooBhai_regular,
    fontSize: screenHeightInPercent(2.2),
    color: R.colors.Black,
  },
  chatTxt: {
    fontFamily: R.fonts.BalooBhai_regular,
    fontSize: screenHeightInPercent(1.7),
    color: R.colors.Grey,
  },
  chatCountBG: {
    height: screenHeightInPercent(2.4),
    width: screenHeightInPercent(2.4),
    borderRadius: screenHeightInPercent(1.5),
    backgroundColor: R.colors.Grey,
    justifyContent: "center",
    alignItems: "center",
  },
  countTxt: {
    color: R.colors.White,
    fontFamily: R.fonts.Inter_regular,
    fontSize: screenHeightInPercent(1.5),
  },
  smallBtn: {
    height: screenHeightInPercent(4.5),
    backgroundColor: R.colors.PrimaryColorDark,
    justifyContent: "center",
    // width: 135,
    paddingHorizontal: 15,
    alignItems: "center",
    borderRadius: 12,
    alignSelf: "center",
  },
  // cardTxt: {},
  btnTxt: {
    fontSize: screenHeightInPercent(1.4),
    fontFamily: R.fonts.Maven_medium,
    color: R.colors.White,
  },
});
