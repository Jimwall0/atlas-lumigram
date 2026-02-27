import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Image,
} from "react-native";

export default function App() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const loginCheck = () => {
    if (email && password) {
      router.push('/(tabs)');
    } else {
      alert("Please valid email and password");
    }
  }
  
  const createAccount = () => {
    router.push('/(tabs)/home');
  }

  return (
    <View style={styles.container}>

      <Image
      source={{ uri: "./assets/images/logo" }}
      style={{ width: 200, height: 400 }}
      />

      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text: string) => setEmail(text)}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text: string) => setPassword(text)}
        secureTextEntry
      />

      <Button title="Sign In" onPress={loginCheck} color="green"/>
      <Button title="Create New Account" onPress={createAccount} color="white"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 32,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});