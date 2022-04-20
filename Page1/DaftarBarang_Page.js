import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View, TouchableOpacity, TextInput, Modal } from 'react-native';
import { DataTable } from 'react-native-paper';
import { db } from "../firebase.js";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc, onSnapshot,
} from "firebase/firestore";

export default function DaftarBarang({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [newNama, setNewNama] = useState('');
  const [newKB, setNewKB] = useState('');
  const [newStock, setNewStock] = useState('');
  const [newBatas, setNewBatas] = useState('');
  const [newHarga, setNewHarga] = useState('');
  const [newID, setNewID] = useState('');

  const [users, setUsers] = useState([]);
  const x = "Produk";
  const usersCollectionRef = collection(db, x);

  const deleteUser = async (id) => {
    setModalVisible(!modalVisible);
    deleteDoc(id);
  };

  const editUser = async (id, Nama, KB, Stock, Batas, Harga) => {
    setModalVisible(true);
    const userDoc = doc(db, "Produk", id);
    setNewID(userDoc);
    setNewNama(Nama);
    setNewKB(KB);
    setNewStock(Stock);
    setNewBatas(Batas);
    setNewHarga(Harga);
  };

  const updateUser = async (id, Nama, KB, Stock, Batas, Harga) => {
    setModalVisible(!modalVisible);
    updateDoc(id, {
      Nama: Nama,
      KB: KB,
      Stock: Stock,
      Batas: Batas,
      Harga: Harga
    });
    setNewID(null);
    setNewNama('');
    setNewKB('');
    setNewStock('');
    setNewBatas('');
    setNewHarga('');
  }

  const createUser = async (Nama, KB, Stock, Batas, Harga) => {
    if (Nama == '' || KB == '' || Stock == '' || Batas == '' || Harga == '') {
      setModalVisible1(!modalVisible1);
      setModalVisible2(true)
      setNewID(null);
      setNewNama('');
      setNewKB('');
      setNewStock('');
      setNewBatas('');
      setNewHarga('');
    } else {
      // const usersCollectionRef = collection(db, "Produk");
      addDoc(usersCollectionRef, {
        Nama: Nama,
        KB: KB,
        Stock: Number(Stock),
        Batas: Number(Batas),
        Harga: Number(Harga)
      });
      setNewID(null);
      setNewNama('');
      setNewKB('');
      setNewStock('');
      setNewBatas('');
      setNewHarga('');
    }
  }

  useEffect(
    () =>
      onSnapshot(usersCollectionRef, (snapshot) =>
        setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
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
            marginTop: "10%",
            marginBottom: "10%"
          }}>

            <View style={{ marginBottom: "5%", paddingRight: "30%" }} >
              <Text style={{
                fontWeight: 650,
                fontSize: 12,
                color: "black"
              }}> Pastikan Memasukan Semua Data
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
                width: "40%"
              }}
                onPress={() => setModalVisible2(!modalVisible2)}>
                <Text style={{
                  fontWeight: 700,
                  fontSize: 12,
                  color: "#F24E1E",
                }}> Ok </Text>
              </TouchableOpacity>
            </View>

          </View>

          <StatusBar style="auto" />
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.container}>
          <View>
            <TouchableOpacity style={{
              flex: 1,
              marginTop: "4.25%",
              marginLeft: "5%"
            }} onPress={() => setModalVisible(!modalVisible)}>
              <Image
                source={require('../assets/back.png')}
                style={{
                  height: 13,
                  width: 18,
                  marginBottom: "3%"
                }}>
              </Image>
            </TouchableOpacity>
          </View>

          <View style={{
            backgroundColor: "#F24E1E",
            flexDirection: "colum",
            marginTop: "2%",
            justifyContent: "center",
            alignItems: "center"
          }}>

            <View style={{
              flexDirection: "row",
              marginTop: "8%",
            }}>
              <Text style={{
                fontWeight: 700,
                fontSize: 12,
                color: "white",
                marginTop: "3%",
              }}>  Nama        : </Text>
              <TextInput style={{
                flex: 1,
                backgroundColor: "white",
                borderRadius: 3,
                padding: 4,
                fontSize: 10, marginTop: "2%",
                marginBottom: "5%"
              }} onChangeText={setNewNama}
                value={newNama}>
              </TextInput>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={{
                fontWeight: 700,
                fontSize: 12,
                color: "white",
                marginTop: "3%",
              }}>  Kode Barang   : </Text>
              <TextInput style={{
                flex: 1,
                backgroundColor: "white",
                borderRadius: 3,
                padding: 4,
                fontSize: 10, marginTop: "2%",
                marginBottom: "5%"
              }} onChangeText={setNewKB}
                value={newKB}>
              </TextInput>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={{
                fontWeight: 700,
                fontSize: 12,
                color: "white",
                marginTop: "3%",
              }}>  Stock                : </Text>
              <TextInput style={{
                flex: 1,
                backgroundColor: "white",
                borderRadius: 3,
                padding: 4,
                fontSize: 10, marginTop: "2%",
                marginBottom: "5%"
              }} onChangeText={setNewStock}
                value={newStock}>
              </TextInput>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={{
                fontWeight: 700,
                fontSize: 12,
                color: "white",
                marginTop: "3%",
              }}>  Batas                : </Text>
              <TextInput style={{
                flex: 1,
                backgroundColor: "white",
                borderRadius: 3,
                padding: 4,
                fontSize: 10, marginTop: "2%",
                marginBottom: "5%"
              }} onChangeText={setNewBatas}
                value={newBatas}>
              </TextInput>
            </View>


            <View style={{ flexDirection: "row" }}>
              <Text style={{
                fontWeight: 700,
                fontSize: 12,
                color: "white",
                marginTop: "3%",
              }}> Harga               : </Text>
              <TextInput style={{
                flex: 1,
                backgroundColor: "white",
                borderRadius: 3,
                padding: 4,
                fontSize: 10, marginTop: "2%",
                marginBottom: "5%"
              }} onChangeText={setNewHarga}
                value={newHarga}>
              </TextInput>
            </View>

            <View style={{ flexDirection: "row", width: "65%", marginTop: "5%", marginBottom: "8%" }}>
              <TouchableOpacity style={{
                flex: 1,
                backgroundColor: "white",
                borderRadius: 3,
                padding: 5,
                justifyContent: "center",
                alignItems: "center",
                width: "40%"
              }}
                onPress={() => deleteUser(newID)}
              >
                <Text style={{
                  fontWeight: 700,
                  fontSize: 12,
                  color: "#F24E1E",
                }}> Hapus </Text>
              </TouchableOpacity>

              <TouchableOpacity style={{
                flex: 1,
                backgroundColor: "white",
                borderRadius: 3,
                padding: 5,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 30,
                width: "40%"
              }}
                onPress={() =>
                  updateUser(newID, newNama, newKB, newStock, newBatas, newHarga)
                }>
                <Text style={{
                  fontWeight: 700,
                  fontSize: 12,
                  color: "#F24E1E",
                }}> Selesai </Text>
              </TouchableOpacity>
            </View>
          </View>




          <StatusBar style="auto" />
        </View>
      </Modal >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible1}
      >
        <View style={styles.container}>
          <View>
            <TouchableOpacity style={{
              flex: 1,
              marginTop: "4.25%",
              marginLeft: "5%"
            }} onPress={() => setModalVisible1(!modalVisible1)}>
              <Image
                source={require('../assets/back.png')}
                style={{
                  height: 13,
                  width: 18,
                  marginBottom: "3%"
                }}>
              </Image>
            </TouchableOpacity>
          </View>

          <View style={{
            backgroundColor: "#F24E1E",
            flexDirection: "colum",
            marginTop: "2%",
            justifyContent: "center",
            alignItems: "center"
          }}>

            <View style={{
              flexDirection: "row",
              marginTop: "8%",
            }}>
              <Text style={{
                fontWeight: 700,
                fontSize: 12,
                color: "white",
                marginTop: "3%",
              }}>  Nama        : </Text>
              <TextInput style={{
                flex: 1,
                backgroundColor: "white",
                borderRadius: 3,
                padding: 4,
                fontSize: 10, marginTop: "2%",
                marginBottom: "5%"
              }} onChangeText={setNewNama}
                value={newNama}>
              </TextInput>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={{
                fontWeight: 700,
                fontSize: 12,
                color: "white",
                marginTop: "3%",
              }}>  Kode Barang   : </Text>
              <TextInput style={{
                flex: 1,
                backgroundColor: "white",
                borderRadius: 3,
                padding: 4,
                fontSize: 10, marginTop: "2%",
                marginBottom: "5%"
              }} onChangeText={setNewKB}
                value={newKB}>
              </TextInput>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={{
                fontWeight: 700,
                fontSize: 12,
                color: "white",
                marginTop: "3%",
              }}>  Stock                : </Text>
              <TextInput style={{
                flex: 1,
                backgroundColor: "white",
                borderRadius: 3,
                padding: 4,
                fontSize: 10, marginTop: "2%",
                marginBottom: "5%"
              }} onChangeText={setNewStock}
                value={newStock}>
              </TextInput>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={{
                fontWeight: 700,
                fontSize: 12,
                color: "white",
                marginTop: "3%",
              }}>  Batas                : </Text>
              <TextInput style={{
                flex: 1,
                backgroundColor: "white",
                borderRadius: 3,
                padding: 4,
                fontSize: 10, marginTop: "2%",
                marginBottom: "5%"
              }} onChangeText={setNewBatas}
                value={newBatas}>
              </TextInput>
            </View>


            <View style={{ flexDirection: "row" }}>
              <Text style={{
                fontWeight: 700,
                fontSize: 12,
                color: "white",
                marginTop: "3%",
              }}> Harga               : </Text>
              <TextInput style={{
                flex: 1,
                backgroundColor: "white",
                borderRadius: 3,
                padding: 4,
                fontSize: 10, marginTop: "2%",
                marginBottom: "5%"
              }} onChangeText={setNewHarga}
                value={newHarga}>
              </TextInput>
            </View>

            <View style={{ flexDirection: "row", width: "65%", marginTop: "5%", marginBottom: "8%" }}>

              <TouchableOpacity style={{
                flex: 1,
                backgroundColor: "white",
                borderRadius: 3,
                padding: 5,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 30,
                width: "40%"
              }}
                onPress={() =>
                  createUser(newNama, newKB, newStock, newBatas, newHarga)
                }>
                <Text style={{
                  fontWeight: 700,
                  fontSize: 12,
                  color: "#F24E1E",
                }}> Selesai </Text>
              </TouchableOpacity>
            </View>
          </View>




          <StatusBar style="auto" />
        </View>
      </Modal >
      <View>
        <TouchableOpacity style={{
          flex: 1,
          marginTop: "4.25%",
          marginLeft: "5%"
        }}>
          <Image
            source={require('../assets/back.png')}
            style={{
              height: 13,
              width: 18,
              marginBottom: "3%"
            }}>
          </Image>
        </TouchableOpacity>
      </View>

      <View style={{
        flexDirection: "row",
        marginTop: "2%",
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1
      }}>

        <TouchableOpacity style={{
          margin: "3%",
          marginLeft: "15%",
          marginBottom: "3%"
        }} onPress={() => setModalVisible1(true)}>
          <Image
            source={require('../assets/add.png')}
            style={{
              height: 23,
              width: 25
            }}>
          </Image>
        </TouchableOpacity>

        <TextInput style={{
          flex: 1,
          height: 23,
          padding: 8,
          borderWidth: 1,
          borderRadius: 4,
          fontSize: 12,
          margin: "3%"
        }}

          placeholder="cari" >
        </TextInput>

        <TouchableOpacity style={{
          margin: "3%",
          marginLeft: "1%"
        }}
          onPress={() => navigation.getParent('RightDrawer').openDrawer()}>
          <Image
            source={require('../assets/Sidebar.png')}
            style={{
              height: 17,
              width: 17,
              marginBottom: "4%"
            }}>
          </Image>
        </TouchableOpacity>

      </View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>ID</DataTable.Title>
          <DataTable.Title>Nama Barang</DataTable.Title>
          <DataTable.Title>Stock</DataTable.Title>
          <DataTable.Title >Harga</DataTable.Title>
          <DataTable.Title >Edit</DataTable.Title>
        </DataTable.Header>
      </DataTable>
      {users.map((user) => {
        return (
          <DataTable>
            <DataTable.Row>
              <DataTable.Cell>{user.KB}</DataTable.Cell>
              <DataTable.Cell>{user.Nama}</DataTable.Cell>
              <DataTable.Cell>{user.Stock}</DataTable.Cell>
              <DataTable.Cell>{user.Harga}</DataTable.Cell>
              <DataTable.Cell>
                <TouchableOpacity style={{
                  margin: "3%",
                  marginLeft: "1%"
                }}
                  onPress={() => editUser(user.id, user.Nama, user.KB, user.Stock, user.Batas, user.Harga)}>
                  <Image
                    source={require('../assets/Sidebar.png')}
                    style={{
                      height: 17,
                      width: 17,
                      marginBottom: "4%"
                    }}>
                  </Image>
                </TouchableOpacity>
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        );
      })}
      <StatusBar style="auto" />
    </View >
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});