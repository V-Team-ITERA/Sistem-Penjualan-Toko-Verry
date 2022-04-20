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
        animationType="none"
        transparent={true}
        visible={modalVisible}
      >
        <View style={{
          flex: 1,
          justifyContent: "center",
          marginTop: 22,
         
        }}>

          <View style={{
            backgroundColor: "white",
            flexDirection: "colum",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "7%",
            paddingBottom: "3%",
            marginLeft:"8%",
            marginRight:"8%", 
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: {
            width: 0,
            height: 2},
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
                  fontSize: "90%",
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
          margin: "3%",
          fontSize: "115%",
          marginBottom: "4%"
        }}>
          Menu Keuangan
        </Text>

      </View>

      <View style={{
              flexDirection: "row",
              width: "80%",
              marginLeft:"8%",
              marginTop: "1%",
              marginBottom: "1%"
            }}>
        <ModalSelector
          style={{  flex: 1,
                    borderRadius: 3,
                    backgroundColor: "#F24E1E",
                    padding: 5,
                    margin: "5%"
                  }}
          data={bulan}
          onChange={(option) => {
            setNewbulan(option.label);
            const usersCollectionRef2 = collection(db, option.label + newtahun);
            onSnapshot(usersCollectionRef2, (snapshot) =>
              setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))))
          }}
        >
          <TextInput
            style={{  marginLeft:"10%",
                      fontWeight: 700,
                      fontSize: 14,
                      color: "white"}}
            editable={false}
            value={newbulan}
          />

        </ModalSelector>


        <ModalSelector
          style={{  flex: 0.7,
                    borderRadius: 3,
                    backgroundColor: "#F24E1E",
                    padding: 5,
                    margin: "5%",
          }}
          data={tahun}
          onChange={(option) => {
            setNewtahun(option.label);
            const usersCollectionRef2 = collection(db, newbulan + option.label);
            onSnapshot(usersCollectionRef2, (snapshot) =>
              setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))))
          }}
        >
          <TextInput
            style={{  marginLeft:"35%",
                      fontWeight: 700,
                      fontSize: 14,
                      color: "white"}}
            editable={false}
            value={newtahun}
          />
        </ModalSelector>
        </View>

      
      <DataTable>
        <DataTable.Header >
          <DataTable.Title>Tanggal</DataTable.Title>
          <DataTable.Title>ID</DataTable.Title>
          <DataTable.Title>Total</DataTable.Title>
          <DataTable.Title>View</DataTable.Title>
        </DataTable.Header>
      </DataTable>

      {users.map((user) => {
        return (
          <DataTable>
            <DataTable.Row>
              <DataTable.Cell>{user.Tanggal}</DataTable.Cell>
              <DataTable.Cell>{user.IdNota}</DataTable.Cell>
              <DataTable.Cell>{user.Total}</DataTable.Cell>
              <DataTable.Cell>
                
                <TouchableOpacity style={{borderWidth:1,
                                          backgroundColor: "white",
                                          borderRadius: 3,
                                          padding: 5,
                                          justifyContent: "center",
                                          alignItems: "center",
                                          width: "100%"
                                        }}
                onPress={() => navigation.navigate("LihatNota", { time: user.IdNota })}>
                <Text style={{
                  fontWeight: 600,
                  fontSize: 12,
                  color: "black",
                }}> Detail </Text>
              </TouchableOpacity></DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        );
      })}


      <View>
      <TouchableOpacity style={{
        backgroundColor: "#F24E1E",
        borderRadius: 3,
        margin:"10%",
        marginLeft:"25%",
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        width: "40%"
      }}
        onPress={() => setModalVisible(true)}>
        <Text style={{
          fontWeight: 700,
          fontSize: 16,
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
