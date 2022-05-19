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
import { ScrollView } from 'react-native-gesture-handler';

export default function DaftarBarang({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [modalVisible4, setModalVisible4] = useState(false);
  const [modalVisible5, setModalVisible5] = useState(false);
  const [modalVisible6, setModalVisible6] = useState(false);
  const [newNama, setNewNama] = useState('');
  const [newName, setNewName] = useState('');
  const [newKB, setNewKB] = useState('');
  const [newStock, setNewStock] = useState('');
  const [newBatas, setNewBatas] = useState('');
  const [newHarga, setNewHarga] = useState('');
  const [newID, setNewID] = useState('');

  const [users, setUsers] = useState([]);
  const x = "Produk";
  const usersCollectionRef = collection(db, x);

  const cekhapus = async () => {
    setModalVisible(false);
    setModalVisible6(true);
  }

  const deleteUser = async (id) => {
    setModalVisible6(false);
    setModalVisible5(true);
    deleteDoc(id);
    setNewID(null);
    setNewNama('');
    setNewKB('');
    setNewStock('');
    setNewBatas('');
    setNewHarga('');
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
    setModalVisible4(true);
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

  const createUser = async (KB, Nama, Stock, Batas, Harga) => {
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
      setModalVisible3(true)
      addDoc(usersCollectionRef, {
        KB: KB,
        Nama: Nama,
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
      setModalVisible1(!modalVisible1);
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

            <View style={{ marginTop: "3%", marginBottom: "8%", paddingRight: "5%" }} >
              <Text style={{
                fontWeight: 650,
                fontSize: "90%",
                color: "black"
              }}> Pastikan Anda memasukan semua data
              </Text>
              <TouchableOpacity style={{
                marginTop: "10%",
                marginLeft: "33%",
                flex: 1,
                backgroundColor: "#F24E1E",
                borderRadius: 3,
                padding: 5,
                justifyContent: "center",
                alignItems: "center",
                width: "40%"
              }}
                onPress={() => setModalVisible2(!modalVisible2)}>
                <Text style={{
                  fontWeight: 700,
                  fontSize: 12,
                  color: "white",
                }}> Ok </Text>
              </TouchableOpacity>
            </View>


          </View>

          <StatusBar style="auto" />
        </View>
      </Modal>

      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible6}
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
              }}> Apakah Anda yakin ingin Menghapus ?
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
                onPress={() => deleteUser(newID)}>
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
                onPress={() => setModalVisible6(!modalVisible6)}>
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

      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible3}
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

            <View style={{ marginTop: "3%", marginBottom: "8%", paddingRight: "5%" }} >
              <Text style={{
                fontWeight: 650,
                fontSize: "90%",
                color: "black"
              }}> Berhasil Memasukan Data.
              </Text>
              <TouchableOpacity style={{
                marginTop: "10%",
                marginLeft: "33%",
                flex: 1,
                backgroundColor: "#F24E1E",
                borderRadius: 3,
                padding: 5,
                justifyContent: "center",
                alignItems: "center",
                width: "40%"
              }}
                onPress={() => setModalVisible3(!modalVisible3)}>
                <Text style={{
                  fontWeight: 700,
                  fontSize: 12,
                  color: "white",
                }}> Ok </Text>
              </TouchableOpacity>
            </View>


          </View>

          <StatusBar style="auto" />
        </View>
      </Modal>

      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible4}
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

            <View style={{ marginTop: "3%", marginBottom: "8%", paddingRight: "5%" }} >
              <Text style={{
                fontWeight: 650,
                fontSize: "90%",
                color: "black"
              }}> Berhasil Mengubah Data.
              </Text>
              <TouchableOpacity style={{
                marginTop: "10%",
                marginLeft: "33%",
                flex: 1,
                backgroundColor: "#F24E1E",
                borderRadius: 3,
                padding: 5,
                justifyContent: "center",
                alignItems: "center",
                width: "40%"
              }}
                onPress={() => setModalVisible4(!modalVisible4)}>
                <Text style={{
                  fontWeight: 700,
                  fontSize: 12,
                  color: "white",
                }}> Ok </Text>
              </TouchableOpacity>
            </View>


          </View>

          <StatusBar style="auto" />
        </View>
      </Modal>

      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible5}
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

            <View style={{ marginTop: "3%", marginBottom: "8%", paddingRight: "5%" }} >
              <Text style={{
                fontWeight: 650,
                fontSize: "90%",
                color: "black"
              }}> Berhasil Menghapus Data.
              </Text>
              <TouchableOpacity style={{
                marginTop: "10%",
                marginLeft: "33%",
                flex: 1,
                backgroundColor: "#F24E1E",
                borderRadius: 3,
                padding: 5,
                justifyContent: "center",
                alignItems: "center",
                width: "40%"
              }}
                onPress={() => setModalVisible5(!modalVisible5)}>
                <Text style={{
                  fontWeight: 700,
                  fontSize: 12,
                  color: "white",
                }}> Ok </Text>
              </TouchableOpacity>
            </View>


          </View>

          <StatusBar style="auto" />
        </View>
      </Modal>

      <Modal
        animationType="none"
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
                fontSize: "90%",
                color: "white",
                marginTop: "3%",
              }}> ID Barang         : </Text>
              <TextInput style={{
                flex: 1,
                backgroundColor: "white",
                borderRadius: 3,
                padding: 4,
                fontSize: "90%", marginTop: "2%",
                marginBottom: "5%"
              }} onChangeText={setNewKB}
                value={newKB}>
              </TextInput>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={{
                fontWeight: 700,
                fontSize: "90%",
                color: "white",
                marginTop: "3%",
              }}> Nama Barang   : </Text>
              <TextInput style={{
                flex: 1,
                backgroundColor: "white",
                borderRadius: 3,
                padding: 4,
                fontSize: "90%", marginTop: "2%",
                marginBottom: "5%"
              }} onChangeText={setNewNama}
                value={newNama}>
              </TextInput>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={{
                fontWeight: 700,
                fontSize: "90%",
                color: "white",
                marginTop: "3%",
              }}>  Stok                   : </Text>
              <TextInput style={{
                flex: 1,
                backgroundColor: "white",
                borderRadius: 3,
                padding: 4,
                fontSize: "90%", marginTop: "2%",
                marginBottom: "5%"
              }} onChangeText={setNewStock}
                value={newStock}>
              </TextInput>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={{
                fontWeight: 700,
                fontSize: "90%",
                color: "white",
                marginTop: "3%",
              }}>  Batas                : </Text>
              <TextInput style={{
                flex: 1,
                backgroundColor: "white",
                borderRadius: 3,
                padding: 4,
                fontSize: "90%", marginTop: "2%",
                marginBottom: "5%"
              }} onChangeText={setNewBatas}
                value={newBatas}>
              </TextInput>
            </View>


            <View style={{ flexDirection: "row" }}>
              <Text style={{
                fontWeight: 700,
                fontSize: "90%",
                color: "white",
                marginTop: "3%",
              }}> Harga               : </Text>
              <TextInput style={{
                flex: 1,
                backgroundColor: "white",
                borderRadius: 3,
                padding: 4,
                fontSize: "90%", marginTop: "2%",
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
                onPress={() => cekhapus()}
              >
                <Text style={{
                  fontWeight: 700,
                  fontSize: "90%",
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
                  updateUser(newID, newKB, newNama, newStock, newBatas, newHarga)
                }>
                <Text style={{
                  fontWeight: 700,
                  fontSize: "90%",
                  color: "#F24E1E",
                }}> Selesai </Text>
              </TouchableOpacity>
            </View>
          </View>




          <StatusBar style="auto" />
        </View>
      </Modal >


      <Modal
        animationType="none"
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
                fontSize: "90%",
                color: "white",
                marginTop: "3%",
              }}> ID Barang         : </Text>
              <TextInput style={{
                flex: 1,
                backgroundColor: "white",
                borderRadius: 3,
                padding: 4,
                fontSize: "90%", marginTop: "2%",
                marginBottom: "5%"
              }} onChangeText={setNewKB}
                value={newKB}>
              </TextInput>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={{
                fontWeight: 700,
                fontSize: "90%",
                color: "white",
                marginTop: "3%",
              }}> Nama Barang    : </Text>
              <TextInput style={{
                flex: 1,
                backgroundColor: "white",
                borderRadius: 3,
                padding: 4,
                fontSize: "90%", marginTop: "2%",
                marginBottom: "5%"
              }} onChangeText={setNewNama}
                value={newNama}>
              </TextInput>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={{
                fontWeight: 700,
                fontSize: "90%",
                color: "white",
                marginTop: "3%",
              }}>  Stok                   : </Text>
              <TextInput style={{
                flex: 1,
                backgroundColor: "white",
                borderRadius: 3,
                padding: 4,
                fontSize: "90%", marginTop: "2%",
                marginBottom: "5%"
              }} onChangeText={setNewStock}
                value={newStock}>
              </TextInput>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={{
                fontWeight: 700,
                fontSize: "90%",
                color: "white",
                marginTop: "3%",
              }}> Batas                 : </Text>
              <TextInput style={{
                flex: 1,
                backgroundColor: "white",
                borderRadius: 3,
                padding: 4,
                fontSize: "90%", marginTop: "2%",
                marginBottom: "5%"
              }} onChangeText={setNewBatas}
                value={newBatas}>
              </TextInput>
            </View>


            <View style={{ flexDirection: "row" }}>
              <Text style={{
                fontWeight: 700,
                fontSize: "90%",
                color: "white",
                marginTop: "3%",
              }}> Harga               : </Text>
              <TextInput style={{
                flex: 1,
                backgroundColor: "white",
                borderRadius: 3,
                padding: 4,
                fontSize: "90%", marginTop: "2%",
                marginBottom: "5%"
              }} onChangeText={setNewHarga}
                value={newHarga}>
              </TextInput>
            </View>

            <View style={{ flexDirection: "row", width: "65%", marginTop: "5%", marginBottom: "8%" }}>
              <Text style={{
                fontWeight: 700,
                fontSize: "90%",
                color: "white",
                marginTop: "3%",
              }}>                  </Text>
              <TouchableOpacity style={{
                flex: 1,
                backgroundColor: "white",
                borderRadius: 3,
                padding: 5,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "30%",
                width: "40%"
              }}
                onPress={() =>
                  createUser(newKB, newNama, newStock, newBatas, newHarga)
                }>
                <Text style={{
                  fontWeight: 700,
                  fontSize: "90%",
                  color: "#F24E1E",
                }}> Selesai </Text>
              </TouchableOpacity>
            </View>
          </View>
          <StatusBar style="auto" />
        </View>
      </Modal >

      <View style={{
        flexDirection: "row",
        marginTop: "8%",
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1
      }}>

        <TouchableOpacity style={{
          marginTop: "4%",
          marginLeft: "4%"
        }}
          onPress={() => navigation.getParent('RightDrawer').openDrawer()}>
          <Image
            source={require('../assets/Sidebar.png')}
            style={{
              height: 15,
              width: 17,
              marginBottom: "4%"
            }}>
          </Image>
        </TouchableOpacity>

        <Text style={{
          flex: 1,
          fontWeight: 700,
          fontSize: "115%",
          margin: "3%",
          marginBottom: "4%"
        }}>
          Menu Data Barang
        </Text>

      </View>

      <View style={{
        marginTop: "6%",
        marginBottom: "6%",
        marginLeft: "10%",
        flexDirection: "row"
      }}>
        <TextInput style={{
          flex: 4.1,
          backgroundColor: "white",
          borderRadius: 3,
          borderWidth: 1,
          paddingLeft: 10,
          padding: 2,
          fontSize: "85%",
        }} onChangeText={setNewName}
          value={newName}
          placeholder="cari barang .."
        >
        </TextInput>

        <TouchableOpacity style={{
          flex: 1,
          marginLeft: "5%",
        }} onPress={() => setModalVisible1(true)}>
          <Image
            source={require('../assets/add.png')}
            style={{
              height: 30,
              width: 33
            }}>
          </Image>
        </TouchableOpacity>
      </View>

      <View style={{
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1
      }}>

      </View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={{ flex: 1.2 }}>ID</DataTable.Title>
          <DataTable.Title style={{ flex: 2.5 }}>Nama Barang</DataTable.Title>
          <DataTable.Title style={{ flex: 1 }}>Stok</DataTable.Title>
          <DataTable.Title style={{ flex: 1.1 }}>Harga</DataTable.Title>
          <DataTable.Title style={{ flex: 1 }}> </DataTable.Title>
        </DataTable.Header>
      </DataTable>

      <ScrollView>
        {users.map((user) => {
          const Nama1 = newName.toLowerCase();
          const Nama2 = user.Nama.toLowerCase();
          if (Nama2.includes(Nama1)) {
            return (
              <DataTable>
                <DataTable.Row>
                  <DataTable.Cell style={{ flex: 1.2 }}>{user.KB}</DataTable.Cell>
                  <DataTable.Cell style={{ flex: 2.5 }}>{user.Nama}</DataTable.Cell>
                  <DataTable.Cell style={{ flex: 1 }}>{user.Stock}</DataTable.Cell>
                  <DataTable.Cell style={{ flex: 1.1 }}>{user.Harga}</DataTable.Cell>
                  <DataTable.Cell style={{ flex: 1 }}>
                    <TouchableOpacity style={{
                      borderWidth: 1,
                      backgroundColor: "white",
                      borderRadius: 3,
                      padding: 5,
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%"
                    }}
                      onPress={() => editUser(user.id, user.KB, user.Nama, user.Stock, user.Batas, user.Harga)}>
                      <Text style={{
                        fontWeight: 600,
                        fontSize: "90%",
                        color: "black",
                      }}> Edit </Text>
                    </TouchableOpacity>
                  </DataTable.Cell>
                </DataTable.Row>
              </DataTable>
            );
          }
        })}
      </ScrollView>

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
