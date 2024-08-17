import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import R from "../../assets";
import DatePickerRN from "react-native-date-picker";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import colors from "../../assets/colors";

export const DatePicker = (props) => {
  const { value, onChangeDate, placeHolder, containerStyle, maxDate } = props;
  const [open, setOpen] = useState(false);

  return (
    <View style={containerStyle}>
      <TouchableOpacity
        onPress={() => setOpen(true)}
        style={{
          height: 50,
          color: "rgba(255, 255, 255, 1)",
          justifyContent: "center",
          borderColor: R.colors.GreenOutlineColor,
          borderWidth: 1,
          color: "#353635",
          borderRadius: 12,
          paddingHorizontal: 15,
        }}
      >
        <Text
          style={{
            color: !value ? R.colors.Grey : R.colors.DefaultTextColor,
            fontSize: hp("1.8%"),
            fontFamily: value ? R.fonts.defaultMedium : R.fonts.defaultRegular,
          }}
        >
          {value ? moment(value).format("MMMM DD, YYYY") : placeHolder}
        </Text>
      </TouchableOpacity>
      {open && (
        <DateTimePicker
          // testID="dateTimePicker"
          is24Hour={true}
          value={value ? value : new Date()}
          maximumDate={maxDate}
          accentColor={colors.PrimaryColorDark}
          mode="date"
          themeVariant="light"
          onChange={(t, date) => {
            setOpen(false);
            onChangeDate(date);
          }}
          display="inline"
        />
      )}
      {/* <DatePickerRN
        modal
        maximumDate={maxDate}
        mode="date"
        open={open}
        date={value ? value : new Date()}
        onConfirm={(date) => {
          setOpen(false);
          onChangeDate(date);
        }}
        onCancel={() => {  
          setOpen(false);
        }}
      /> */}
    </View>
  );
};
