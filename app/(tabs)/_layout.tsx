import { Tabs } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function TabLayout() {
    return (
        <GestureHandlerRootView>
        <Tabs>
            <Tabs.Screen name="index" options={{ title: "Home" }}/>
            <Tabs.Screen name="profile" options={{ title: "Profile" }}/>
        </Tabs>
        </GestureHandlerRootView>
    );
}
