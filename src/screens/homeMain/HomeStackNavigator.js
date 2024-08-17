import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CreateJob from "./home/create";
import PaymentCard from "../Rating/PaymentCard";
import Rating from "../Rating/Rating";

const Stack = createStackNavigator();

function HomeStackNavigator({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CreateJob"
        options={{ headerShown: false }}
        component={CreateJob}
      />
      <Stack.Screen
        name="PaymentCard"
        options={{ headerShown: false }}
        component={PaymentCard}
      />
      <Stack.Screen
        name="Rating"
        options={{ headerShown: false }}
        component={Rating}
      />
    </Stack.Navigator>
  );
}

export default HomeStackNavigator;
