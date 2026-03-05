import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "expo-router";
import { View, ActivityIndicator } from "react-native";

export const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace("/(tabs)"); 
      } else {
        router.replace("/"); 
      }
    }
  }, [user, loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#00ad90" />
      </View>
    );
  }

  return <>{children}</>;
};