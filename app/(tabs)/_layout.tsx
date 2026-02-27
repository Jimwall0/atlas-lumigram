import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{ title: "Home", headerShown: false}}/>
            <Tabs.Screen name="addFriends" options={{ title: "Add Friends", headerShown: false }} />
            <Tabs.Screen name="post" options={{ title: "Add Post", headerShown: false}}/>
        </Tabs>
    );
}
