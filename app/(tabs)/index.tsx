import React from "react";
import { View, Text, Image, Button } from "react-native";
import { FlashList } from "@shopify/flash-list";
import {homeFeed} from "@/placeholder"
import { useRouter } from "expo-router";

export default function App() {
    const router = useRouter();
  return (
    <View style={{flex: 1, flexDirection: "column"}}>
        <View style={{flex:1, flexDirection: "row", justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 18}}>
            <Text style={{flex: 1, fontSize: 24, fontWeight: 'bold'}}>Test Page</Text>
            <View><Button title="Sign out" onPress={() => router.replace('/')} color="#00ad90"/></View>
        </View>
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