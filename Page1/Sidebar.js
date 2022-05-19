import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View, TouchableOpacity, Modal } from 'react-native';

export default function Sidebar({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  const yakeluar = async () => {
    setModalVisible(false);
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
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

            <View style={{ marginBottom: "5%", paddingRight: "5%" }} >
              <Text style={{
                fontWeight: 650,
                fontSize: "90%",
                color: "black"
              }}> Apakah Anda yakin ingin keluar ?
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
                width: "40%"
              }}
                onPress={() => yakeluar()}>
                <Text style={{
                  fontWeight: 700,
                  fontSize: "90%",
                  color: "#F24E1E",
                }}> Ya </Text>
              </TouchableOpacity>

              <TouchableOpacity style={{
                flex: 1,
                backgroundColor: "#F24E1E",
                borderRadius: 3,
                padding: 5,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "10%",
                width: "40%"
              }}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={{
                  fontWeight: 700,
                  fontSize: "90%",
                  color: "white",
                }}> Tidak </Text>
              </TouchableOpacity>
            </View>

          </View>

          <StatusBar style="auto" />
        </View>
      </Modal>
      <View style={{ flexDirection: "row", paddingLeft: "85%", marginTop: "7%" }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Notifikasi")}
        >
          <Image
            source={require('../assets/notifikasi.png')}
            style={{
              height: 25,
              width: 25
            }}>
          </Image>
        </TouchableOpacity>
      </View>


      <View style={{ margin: "8%" }}>

        <TouchableOpacity
          onPress={() => navigation.navigate("MenuProduk")}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require('../assets/menuproduk.png')}
              style={{
                height: 25.5,
                width: 28,
              }}>
            </Image>
            <Text style={{
              fontWeight: 500,
              fontSize: "90%",
              color: "white",
              marginLeft: "3%",
              marginTop: "1.5%"
            }}> Menu Penjualan
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("MenuKeuangan")}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require('../assets/menukeuangan.png')}
              style={{
                height: 33,
                width: 28,
                marginTop: "8%",
              }}>
            </Image>
            <Text style={{
              fontWeight: 500,
              fontSize: "90%",
              color: "white",
              marginLeft: "3%",
              marginTop: "9.5%"
            }}> Menu Keuangan
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("DaftarBarang")}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require('../assets/menudatabarang.png')}
              style={{
                height: 30,
                width: 28,
                marginTop: "8%",
              }}>
            </Image>
            <Text style={{
              fontWeight: 500,
              fontSize: "90%",
              color: "white",
              marginLeft: "3%",
              marginTop: "9.5%"
            }}> Menu Data Barang
            </Text>
          </View>
        </TouchableOpacity>

      </View>


      <TouchableOpacity>
        <View style={{ flexDirection: "row", paddingTop: "75%", margin: "8%" }}>
          <Image
            source={require('../assets/Logout.png')}
            style={{
              height: 25.4,
              width: 26.4,
              marginTop: "8%",
            }}>
          </Image>
          <Text style={{
            fontWeight: 500,
            fontSize: "90%",
            color: "white",
            marginLeft: "3.5%",
            marginTop: "9.5%"
          }}
            onPress={() => setModalVisible(true)}> Keluar
          </Text>
        </View>
      </TouchableOpacity>


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F24E1E',
  },
});
