import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{ title: "Home", headerShown: false}}/>
            <Tabs.Screen name="profile" options={{ title: "Search", headerShown: false}}/>
            <Tabs.Screen name="profile" options={{ title: "Add Post", headerShown: false}}/>
            <Tabs.Screen name="profile" options={{ title: "Favorite", headerShown: false}}/>
            <Tabs.Screen name="profile" options={{ title: "My Profile", headerShown: false}}/>
        </Tabs>
    );
}
