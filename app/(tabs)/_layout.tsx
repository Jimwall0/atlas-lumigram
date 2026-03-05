import { Tabs, useRouter } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function TabLayout() {
    const { user, loading } = useAuth();
    const router = useRouter();
    useEffect(() => {
        if (!loading && !user) {
            router.replace('/');
        }
    }, [user, loading]);
    if (loading) return null;
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{ title: "Home", headerShown: false}}/>
            <Tabs.Screen name="addFriends" options={{ title: "Add Friends", headerShown: false }} />
            <Tabs.Screen name="post" options={{ title: "Add Post", headerShown: false}}/>
        </Tabs>
    );
}
