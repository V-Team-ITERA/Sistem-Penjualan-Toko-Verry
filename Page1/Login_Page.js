import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, Text, Image, View, TouchableOpacity } from 'react-native';

export default function Login({ navigation }) {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const ceklogin = async (newUsername, newPassword) => {
    if (newUsername == "owner" && newPassword == "ownerpass") {
      navigation.navigate("MenuProduk")
    } if (newUsername == "staff" && newPassword == "staffpass") {
      navigation.navigate("MenuProdukPegawai")
    }
  }

  return (
    <View style={styles.container}>
      <View style={{
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Image
          source={require('../assets/Trolli.png')}
          style={{
            height: 125,
            width: 120,
            marginTop: "25%",
          }}>
        </Image>
      </View>

      <View style={{ flexDirection: "columnn", padding: "8%" }}>
        <Text style={{
          flex: 1,
          fontWeight: 700,
          fontSize: "170%",
          marginTop: "10%",
          marginBottom: "25%"
        }}>
          Masuk
        </Text>

        <Text style={{ flex: 1, fontSize: "100%" }}> Username  </Text>

        <TextInput style={{
          flex: 1,
          borderWidth: 1,
          borderRadius: 6,
          padding: 8,
          fontSize: "100%",
          marginBottom: "5%"
        }}
          onChangeText={setNewUsername}
          value={newUsername}>
        </TextInput>

        <Text style={{ flex: 1, fontSize: "100%" }}> Password  </Text>

        <TextInput style={{
          flex: 1,
          borderWidth: 1,
          borderRadius: 6,
          padding: 8,
          fontSize: "100%",
          marginBottom: "10%"
        }}
          secureTextEntry={true}
          onChangeText={setNewPassword}
          value={newPassword}>
        </TextInput>

        <TouchableOpacity style={{
          flex: 1,
          padding: 8,
          fontSize: "100%",
          backgroundColor: "#F24E1E",
          borderRadius: 20
        }}
          onPress={() => ceklogin(newUsername, newPassword)}>

          <Text style={{
            textAlign: "center",
            color: "white",
            fontSize: "100%"
          }}>
            Masuk
          </Text>

        </TouchableOpacity>

        <StatusBar style="auto" />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
