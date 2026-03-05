import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "expo-router";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {user?.email}!</Text>

      <Text style={styles.subtitle}>Your pages:</Text>

      <View style={styles.buttons}>
        <View style={styles.buttonWrapper}>
          <Button
            title="Page 1"
            onPress={() => router.push("/(tabs)/post")}
            color="#00ad90"
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title="Page 2"
            onPress={() => router.push("/(tabs)/addFriends")}
            color="#091858"
          />
        </View>
      </View>

      <View style={{ marginTop: 40, width: "60%" }}>
        <Button title="Logout" onPress={handleLogout} color="#ff4d4d" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#091858",
    padding: 24,
  },
  welcome: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 24,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 16,
    textAlign: "center",
  },
  buttons: {
    width: "75%",
    gap: 16,
  },
  buttonWrapper: {
    marginBottom: 12,
  },
});
