import React, { useState, useRef, useEffect } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import R from "../../assets";
import PhoneInput from "react-native-phone-number-input";
import CheckedIcon from "../preview/checkedIcon";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export const PhoneNumber = (props) => {
  const {
    value,
    onChangeNumber,
    placeHolder,
    containerStyle,
    maxDate,
    title,
    titleTextStyle,
    defaultCode = "EG",
    disabled,
  } = props;
  const [valid, setValid] = useState(false);
  const phoneInput = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <>
      {title && (
        <Text
          style={[
            {
              marginBottom: 10,
              marginTop: 5,
              fontSize: hp("1.5%"),
              color: R.colors.Grey,
              fontFamily: R.fonts.defaultSemiBold,
            },
            titleTextStyle,
          ]}
        >
          {title}
        </Text>
      )}
      <View
        style={[
          {
            color: "rgba(255, 255, 255, 1)",
            justifyContent: "center",
            borderColor: R.colors.GreenOutlineColor,
            borderWidth: 1,
            color: "#353635",
            borderRadius: 12,
            paddingHorizontal: 10,
            alignItems: "center",
            flexDirection: "row",
          },
          containerStyle,
        ]}
      >
        <PhoneInput
          countryPickerProps={{
            countryCodes: ["EG"],
          }}
          containerStyle={{
            backgroundColor: "transparent",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
          textContainerStyle={{
            backgroundColor: "transparent",
          }}
          codeTextStyle={{
            fontFamily: R.fonts.defaultMedium,
          }}
          textInputStyle={{
            fontFamily: R.fonts.defaultMedium,
          }}
          placeholder={"1234567..."}
          ref={phoneInput}
          defaultValue={value}
          defaultCode={defaultCode}
          layout="first"
          disabled={disabled}
          onChangeText={(text) => {
            setPhoneNumber(text);
          }}
          onChangeFormattedText={(text) => {
            const checkValid = phoneInput.current?.isValidNumber(text);
            setValid(checkValid ? checkValid : false);
            onChangeNumber(checkValid ? text : "");
          }}
          autoFocus
        />
        {valid && (
          <CheckedIcon>
            <Icon name="check-circle" size={hp("2.6%")} />
          </CheckedIcon>
        )}
      </View>
    </>
  );
};
