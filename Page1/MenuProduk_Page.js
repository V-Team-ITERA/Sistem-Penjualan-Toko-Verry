import React, { useState, useEffect } from "react";
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
import { ScrollView } from "react-native-gesture-handler";

export default function MenuProduk({ navigation }) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const bulan = months[new Date().getMonth()];
  const year = new Date().getFullYear();
  const time = bulan + new Date().getDate() + new Date().getHours() + new Date().getMinutes()
  const tanggal = new Date().getDate();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [newName, setNewName] = useState('');
  const [newqty, setNewqty] = useState('');
  const [newid, setNewid] = useState('Awal');
  const [users, setUsers] = useState([]);
  const [users1, setUsers1] = useState([]);
  const [users2, setUsers2] = useState([]);
  const [Total, setTotal] = useState(0);
  const [waktu, setwaktu] = useState(time);
  const usersCollectionRef = collection(db, "Produk");
  const usersCollectionRef2 = collection(db, bulan + year);
  const [usersCollectionRef1, setusersCollectionRef1] = useState(collection(db, waktu));

  const editUser = async (id, Nama, Qty, Harga) => {
    const userDoc = doc(db, newid, id);
    const stocklama = Number(Qty);
    setNewName(Nama);
    setNewqty(Qty);
    setTotal(Total - Harga);
    {
      users.map((user) => {
        if (user.Nama == newName) {
          updateDoc(userDoc, {
            Id: user.KB,
            Nama: user.Nama,
            Qty: newqty,
            Harga: newqty * user.Harga
          });
          setTotal(Total + newqty * user.Harga);
          setNewName('');
          setNewqty('');
          updateDoc(doc(db, "Produk", user.id), { Stock: user.Stock - newqty + stocklama });
        }
      })
    }
  };

  const ceknota = async (x, y) => {
    setNewid('Awal');
    setModalVisible(false);
    const xy = bulan + new Date().getDate() + new Date().getHours() + new Date().getMinutes();
    setwaktu(xy);
    setusersCollectionRef1(collection(db, waktu));
    setUsers2([]);
    setTotal(0);
    {
      users1.map((user) => {
        if (user.IdNota == x) {
          updateDoc(doc(db, bulan + year, user.id), { Total: y });
        }
      })
    }
    navigation.navigate("LihatNota", { time: x })
  }

  const deleteUser = async (id, Harga, Qty, Nama) => {
    const userDoc = doc(db, newid, id);
    deleteDoc(userDoc);
    const stocklama = Number(Qty);
    setTotal(Total - Harga);
    users.map((user) => {
      if (user.Nama == Nama) {
        updateDoc(doc(db, "Produk", user.id), { Stock: user.Stock + stocklama });
      }
    })
  };

  const createUser = async (newName, newqty, Total) => {
    if (newqty % 1 != 0) {
      setModalVisible2(true)
    }
    else if (newid == 'Awal') {
      addDoc(usersCollectionRef2, { Total: 0, IdNota: waktu, Tanggal: tanggal });
      setNewid(waktu);
      const usersCollectionRef1 = collection(db, waktu);
      onSnapshot(usersCollectionRef1, (snapshot) =>
        setUsers2(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))))
      {
        users.map((user) => {
          if (user.Nama == newName) {
            addDoc(usersCollectionRef1, {
              Id: user.KB,
              Nama: user.Nama,
              Qty: newqty,
              Harga: newqty * user.Harga
            })
            setTotal(Total + newqty * user.Harga);
            updateDoc(doc(db, "Produk", user.id), { Stock: user.Stock - newqty });
          }
        })
      }
      setNewName('');
      setNewqty('');
    } else {
      const usersCollectionRef1 = collection(db, newid);
      {
        users.map((user) => {
          if (user.Nama == newName) {
            addDoc(usersCollectionRef1, {
              Id: user.KB,
              Nama: user.Nama,
              Qty: newqty,
              Harga: newqty * user.Harga
            })
            setTotal(Total + newqty * user.Harga);
            updateDoc(doc(db, "Produk", user.id), { Stock: user.Stock - newqty });
          }
        })
      }
      setNewName('');
      setNewqty('');
    }
  };


  useEffect(
    () =>
      onSnapshot(usersCollectionRef, (snapshot) =>
        setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );
  useEffect(
    () =>
      onSnapshot(usersCollectionRef1, (snapshot) =>
        setUsers2(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );
  useEffect(
    () =>
      onSnapshot(usersCollectionRef2, (snapshot) =>
        setUsers1(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );


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

            <View style={{ marginBottom: "5%", paddingRight: "28%" }} >
              <Text style={{
                fontWeight: 650,
                fontSize: "90%",
                color: "black",
              }}> Apakah Anda yakin ?
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
                backgroundColor: "#F24E1E",
                borderRadius: 3,
                padding: 5,
                justifyContent: "center",
                alignItems: "center",
                width: "40%"
              }}>
                <Text style={{
                  fontWeight: 700,
                  fontSize: "90%",
                  color: "white",
                }}
                  onPress={() => ceknota(newid, Total)}> Ya </Text>
              </TouchableOpacity>

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
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={{
                  fontWeight: 700,
                  fontSize: "90%",
                  color: "#F24E1E",
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
              }}> Pastikan Memasukan Angka.
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
          Menu Penjualan
        </Text>

      </View>

      <View>
        <View style={{ flexDirection: "row", marginTop: "3%" }}>
          <Text style={{
            fontWeight: 700,
            fontSize: "85%",
            color: "black",
            margin: "3%",
          }}>  Barang : </Text>
          <TextInput style={{
            flex: 1,
            backgroundColor: "white",
            borderRadius: 3,
            borderWidth: 1,
            padding: 5,
            fontSize: "75%",
            marginTop: "2%",
            marginBottom: "2%"
          }} onChangeText={setNewName}
            value={newName}>
          </TextInput>
          <Text style={{
            fontWeight: 700,
            fontSize: "85%",
            color: "black",
            margin: "3%",
          }}>  Jumlah : </Text>
          <TextInput style={{
            flex: 1,
            backgroundColor: "white",
            borderRadius: 3,
            borderWidth: 1,
            padding: 5,
            fontSize: "75%",
            marginTop: "2%",
            marginBottom: "2%",
            marginRight: "8%",
            width: "50%"
          }} onChangeText={setNewqty}
            value={newqty}
            keyboardType="numeric">
          </TextInput>
        </View>

        <View style={{ flexDirection: "row", height: "40%" }}>
          <View style={{ flex: 2.18, marginLeft: "22%" }}>
            <ScrollView>
              {users.map((user) => {
                const Nama1 = newName.toLowerCase();
                const Nama2 = user.Nama.toLowerCase();
                if (Nama2.includes(Nama1) && newName != '') {
                  return (<TouchableOpacity style={{ fontSize: "90%", borderColor: "gainsboro", borderWidth: 1 }}
                    onPress={() => setNewName(user.Nama)}>{user.Nama}</TouchableOpacity>)
                }
              })}
            </ScrollView>
          </View>

          <View style={{ flex: 2, height: "50%", marginLeft: "5%", marginTop: "4%", marginBottom: "10%", marginRight: "5%" }}>
            <TouchableOpacity style={{
              backgroundColor: "#F24E1E",
              borderRadius: 15,
              padding: 6,
              alignItems: "center",
            }} onPress={() => createUser(newName, newqty, Total)}>
              <Text style={{
                fontWeight: 700,
                fontSize: "85%",
                color: "white",
              }}> Masukan </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <DataTable style={{ borderTopWidth: 1, borderTopColor: 'lightgray' }}>
        <DataTable.Header>
          <DataTable.Title style={{ flex: 1 }}>ID</DataTable.Title>
          <DataTable.Title style={{ flex: 1.8 }}>Nama Barang</DataTable.Title>
          <DataTable.Title style={{ flex: 0.7 }}>Qty</DataTable.Title>
          <DataTable.Title style={{ flex: 1.7 }}>Harga</DataTable.Title>
          <DataTable.Title style={{ flex: 1.5 }}>Edit</DataTable.Title>
          <DataTable.Title style={{ flex: 1.4 }}>Hapus</DataTable.Title>
        </DataTable.Header>
      </DataTable>

      <ScrollView>
        {users2.map((user) => {
          return (
            <DataTable>
              <DataTable.Row>
                <DataTable.Cell style={{ flex: 1.5 }}>{user.Id}</DataTable.Cell>
                <DataTable.Cell style={{ flex: 3.2 }}>{user.Nama}</DataTable.Cell>
                <DataTable.Cell style={{ flex: 1 }}>{user.Qty}</DataTable.Cell>
                <DataTable.Cell style={{ flex: 2.5 }}>{user.Harga}</DataTable.Cell>
                <DataTable.Cell style={{ flex: 2.5 }}>
                  <TouchableOpacity style={{
                    borderWidth: 1,
                    backgroundColor: "white",
                    borderRadius: 3,
                    padding: 5,
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%"
                  }}
                    onPress={() => editUser(user.id, user.Nama, user.Qty, user.Harga)}>
                    <Text style={{
                      fontWeight: 600,
                      fontSize: "90%",
                      color: "black",
                    }}> Edit </Text>
                  </TouchableOpacity>
                </DataTable.Cell>
                <DataTable.Cell style={{ flex: 2.5 }}>
                  <TouchableOpacity style={{
                    borderWidth: 1,
                    backgroundColor: "white",
                    borderRadius: 3,
                    padding: 5,
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%"
                  }}
                    onPress={() => deleteUser(user.id, user.Harga, user.Qty, user.Nama)}>
                    <Text style={{
                      fontWeight: 600,
                      fontSize: "90%",
                      color: "black",
                    }}> Hapus </Text>
                  </TouchableOpacity>
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          );
        })}
      </ScrollView>


      <View style={{
        borderTopColor: 'lightgray',
        borderTopWidth: 1,
        marginTop: "20%"
      }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{
            flex: 1,
            fontWeight: 700,
            fontSize: "95%",
            color: "black",
            margin: "3%",
          }}>Total</Text>

          <Text style={{
            flex: 1,
            fontWeight: 500,
            fontSize: "95%",
            color: "black",
            margin: "3%",
          }}> Rp.  {Total} </Text>
        </View>

        <TouchableOpacity style={{
          backgroundColor: "#F24E1E",
          borderRadius: 3,
          margin: "3%",
          marginLeft: "54%",
          padding: 5,
          justifyContent: "center",
          alignItems: "center",
          width: "40%"
        }}
          onPress={() => setModalVisible(true)}>
          <Text style={{
            fontWeight: 700,
            fontSize: "95%",
            color: "white",
          }}> Print </Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
