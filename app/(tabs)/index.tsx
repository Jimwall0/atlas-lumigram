import React from "react";
import { View, Text, Image } from "react-native";
import { FlashList } from "@shopify/flash-list";
import {homeFeed} from "@/placeholder"

export default function App() {
  return (
    <View style={{flex: 1, flexDirection: "column"}}>
        <Text style={{flex: 1, fontSize: 24, fontWeight: 'bold'}}>Home Feed</Text>
        <FlashList
            data={homeFeed}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
                <View style={{marginBottom: 16}}>
                    <Image
                    source={{ uri: item.image }}
                    style={{width: 300, height: 400}}
                    resizeMode="contain"
                    />
                    <Text style={{marginTop: 8}}>
                        {item.caption}
                    </Text>
                </View>
            )}
        />
    </View>
  );
}