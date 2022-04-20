import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View, TouchableOpacity, TextInput, Modal } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import { DataTable } from 'react-native-paper';
import { db } from "../firebase.js";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc, onSnapshot,
} from "firebase/firestore";

export default function MenuKeuangan({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const year = new Date().getFullYear();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = months[new Date().getMonth()];
  const [newbulan, setNewbulan] = useState(month);
  const [newtahun, setNewtahun] = useState(year);
  let indexbulan = 0;
  const bulan = [
    { key: indexbulan++, label: 'January' },
    { key: indexbulan++, label: 'February' },
    { key: indexbulan++, label: 'March' },
    { key: indexbulan++, label: 'April' },
    { key: indexbulan++, label: 'May' },
    { key: indexbulan++, label: 'June' },
    { key: indexbulan++, label: 'July' },
    { key: indexbulan++, label: 'August' },
    { key: indexbulan++, label: 'September' },
    { key: indexbulan++, label: 'October' },
    { key: indexbulan++, label: 'November' },
    { key: indexbulan++, label: 'December' },
  ];
  let indextahun = 0;
  const tahun = [
    { key: indextahun++, label: year - 3 },
    { key: indextahun++, label: year - 2 },
    { key: indextahun++, label: year - 1 },
    { key: indextahun++, label: year },
    { key: indextahun++, label: year + 1 },
    { key: indextahun++, label: year + 2 },
    { key: indextahun++, label: year + 3 },
  ]

  const usersCollectionRef2 = collection(db, newbulan + newtahun);
  const [users, setUsers] = useState([]);
  useEffect(
    () =>
      onSnapshot(usersCollectionRef2, (snapshot) =>
        setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
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
            marginTop: "10%",
            marginBottom: "10%"
          }}>

            <View style={{ marginBottom: "5%", paddingRight: "30%" }} >
              <Text style={{
                fontWeight: 650,
                fontSize: 12,
                color: "black"
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
                  fontSize: 12,
                  color: "white",
                }}> Ya </Text>
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
                  fontSize: 12,
                  color: "#F24E1E",
                }}> Tidak </Text>
              </TouchableOpacity>
            </View>

          </View>

          <StatusBar style="auto" />
        </View>
      </Modal>
      <View style={{
        flexDirection: "row",
        marginTop: "13%",
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1
      }}>
        <Text style={{
          flex: 1,
          fontWeight: 700,
          fontSize: 15,
          margin: "3%",
          marginLeft: "5%",
          marginBottom: "4%"
        }}>
          Menu Keuangan
        </Text>

        <TouchableOpacity style={{
          margin: "3%",
          marginLeft: "1%"
        }}>
          <Image >

          </Image>
        </TouchableOpacity>

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
      <ModalSelector
        style={styles.input}
        data={bulan}
        onChange={(option) => {
          setNewbulan(option.label);
          const usersCollectionRef2 = collection(db, option.label + newtahun);
          onSnapshot(usersCollectionRef2, (snapshot) =>
            setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))))
        }}
      >
        <TextInput
          editable={false}
          value={newbulan}
        />
      </ModalSelector>
      <ModalSelector
        style={styles.input}
        data={tahun}
        onChange={(option) => {
          setNewtahun(option.label);
          const usersCollectionRef2 = collection(db, newbulan + option.label);
          onSnapshot(usersCollectionRef2, (snapshot) =>
            setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))))
        }}
      >
        <TextInput
          editable={false}
          value={newtahun}
        />
      </ModalSelector>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>ID</DataTable.Title>
          <DataTable.Title>Nama Barang</DataTable.Title>
          <DataTable.Title>Stock</DataTable.Title>
        </DataTable.Header>
      </DataTable>
      {users.map((user) => {
        return (
          <DataTable>
            <DataTable.Row>
              <DataTable.Cell>{user.Tanggal}</DataTable.Cell>
              <DataTable.Cell>{user.IdNota}</DataTable.Cell>
              <DataTable.Cell>{user.Total}</DataTable.Cell>
              <DataTable.Cell><TouchableOpacity style={{
                backgroundColor: "#F24E1E",
                borderRadius: 3,
                padding: 5,
                justifyContent: "center",
                alignItems: "center",
                width: "40%"
              }}
                onPress={() => navigation.navigate("LihatNota", { time: user.IdNota })}>
                <Text style={{
                  fontWeight: 700,
                  fontSize: 12,
                  color: "white",
                }}> Print </Text>
              </TouchableOpacity></DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        );
      })}
      <TouchableOpacity style={{
        backgroundColor: "#F24E1E",
        borderRadius: 3,
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        width: "40%"
      }}
        onPress={() => setModalVisible(true)}>
        <Text style={{
          fontWeight: 700,
          fontSize: 12,
          color: "white",
        }}> Print </Text>
      </TouchableOpacity>
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