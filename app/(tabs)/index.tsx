import React from "react";
import { View, Text, StatusBar } from "react-native";
import { FlashList } from "@shopify/flash-list";
import {homeFeed} from "@/placeholder"

export default function App() {
  return (
    <View style={{flex: 1, flexDirection: "column"}}>
        <FlashList
            data={homeFeed}
            renderItem={({item}) => <Text>{item.image}</Text>}
        />
    </View>
  );
}