import React, { useState, useRef, useEffect } from "react";
import { View, TextInput, Text, TouchableOpacity, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import R from "../../assets";
import OTPInputView from "@twotalltotems/react-native-otp-input";
// import { showMessage } from "react-native-flash-message";
import OTPCode from "../../assets/images/otpCode.svg";

export const PhoneVerification = (props) => {
  const { containerStyle, phoneNumber, codeContainerStyle, onCodeFilled } =
    props;
  const [isResendButtonVisible, setIsResendButtonVisible] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [code, setCode] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsResendButtonVisible(true);
    }, 60000);
    return () => {
      clearTimeout(timeout);
    };
  }, [isResendButtonVisible]);

  function onSubmitButtonClicked() {
    if (!code && code.length < 4) {
      // showMessage({ type: "danger", message: `Code must be of 4 numbers` });
      return;
    }
    // verifyOTP();
  }

  useEffect(() => {
    if (code.length == 4) {
      // verifyOTP();
      onCodeFilled(code);
    }
  }, [code]);

  function onCodeChange(text) {
    setCode(text);
  }

  function renderResendButton() {
    if (!isResendButtonVisible) return null;
    return (
      <TouchableOpacity onPress={onResendButtonClicked}>
        <Text style={styles.resendCode}>{strings.ResendCode}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={[{}, containerStyle]}>
      <View style={{ alignItems: "center" }}>
        <Image
          source={R.images.otpCodeBanner}
          style={{ height: hp("18%") }}
          resizeMode={"contain"}
        />
        <Text
          style={{
            fontSize: hp("3.6%"),
            marginTop: 10,
            color: R.colors.DarkBlack,
            fontFamily: R.fonts.BalooBhai_regular,
          }}
        >
          OTP Code
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: hp("2%"),
          width: "80%",
          alignSelf: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: hp("1.8%"),
            color: R.colors.Grey,
            fontFamily: R.fonts.BalooBhai_regular,
          }}
        >
          Please type an OTP verification code sent to
          <Text
            style={{
              fontSize: hp("1.8%"),
              color: R.colors.DarkBlack,
              fontFamily: R.fonts.defaultBold,
            }}
          >
            {" "}
            {phoneNumber}
          </Text>
        </Text>
      </View>
      <TouchableOpacity>
        <Text
          style={{
            marginTop: 10,
            fontSize: hp("1.8%"),
            textAlign: "center",
            color: R.colors.Grey,
            fontFamily: R.fonts.BalooBhai_medium,
            textDecorationColor: R.colors.Grey,
            textDecorationLine: "underline",
          }}
        >
          Resend code
        </Text>
      </TouchableOpacity>
      <OTPInputView
        code={code}
        style={[{ height: 120 }, codeContainerStyle]}
        pinCount={4}
        editable={true}
        autoFocusOnLoad={false}
        codeInputFieldStyle={{
          borderColor: R.colors.ExtraLightGrey,
          borderWidth: 2,
          borderRadius: 15,
          height: 60,
          width: 60,
          fontFamily: R.fonts.defaultRegular,
          color: R.colors.DarkBlack,
          fontSize: hp("3%"),
          backgroundColor: R.colors.White,
        }}
        onCodeChanged={onCodeChange}
      />
    </View>
  );
};
