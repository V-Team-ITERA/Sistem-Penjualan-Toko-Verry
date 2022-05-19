import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, Text, Image, View, Modal, TouchableOpacity } from 'react-native';

export default function Login({ navigation }) {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [modalVisible2, setModalVisible2] = useState(false);

  const ceklogin = async (newUsername, newPassword) => {
    if (newUsername == "owner" && newPassword == "ownerpass") {
      navigation.navigate("MenuProduk")
      setNewPassword("")
      setNewUsername("")
    } else if (newUsername == "staff" && newPassword == "staffpass") {
      navigation.navigate("MenuProdukPegawai")
      setNewPassword("")
      setNewUsername("")
    } else {
      setModalVisible2(true)
      setNewPassword("")
      setNewUsername("")
    }
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible2}
      >
        <View style={{
          flex: 1,
          justifyContent: "center",
          marginTop: 22
        }}>

          <View style={{
            backgroundColor: "white",
            flexDirection: "colum",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "7%",
            paddingBottom: "3%",
            marginLeft: "8%",
            marginRight: "8%",
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4
          }}>

            <View style={{ marginBottom: "5%" }} >
              <Text style={{
                fontWeight: 650,
                fontSize: "90%",
                color: "black",
                textAlign: "center"
              }}> Maaf Nama Pengguna atau Kata Sandi yang anda masukan salah.
              </Text>
            </View>

            <View style={{
              flexDirection: "row",
              width: "65%",
              marginTop: "5%",
              marginBottom: "8%"
            }}>
              <TouchableOpacity style={{
                flex: 1,
                backgroundColor: "white",
                borderRadius: 3,
                borderWidth: 1,
                borderColor: "#F24E1E",
                padding: 5,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "10%",
              }}
                onPress={() => setModalVisible2(!modalVisible2)}>
                <Text style={{
                  fontWeight: 700,
                  fontSize: "90%",
                  color: "#F24E1E",
                }}> Ya </Text>
              </TouchableOpacity>

            </View>

          </View>

          <StatusBar style="auto" />
        </View>
      </Modal>
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

        <Text style={{
          flex: 1,
          fontWeight: 700,
          fontSize: "170%",
          marginTop: "5%",
          marginBottom: "15%"
        }}>
          Toko Verry
        </Text>
      </View>

      <View style={{ flexDirection: "columnn", padding: "8%" }}>


        <Text style={{ flex: 1, fontSize: "90%" }}> Nama Pengguna  </Text>

        <TextInput style={{
          flex: 1,
          borderWidth: 1,
          borderRadius: 6,
          padding: 8,
          fontSize: "90%",
          marginBottom: "5%"
        }}
          onChangeText={setNewUsername}
          value={newUsername}>
        </TextInput>

        <Text style={{ flex: 1, fontSize: "90%" }}> Kata Sandi  </Text>

        <TextInput style={{
          flex: 1,
          borderWidth: 1,
          borderRadius: 6,
          padding: 8,
          fontSize: "90%",
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
