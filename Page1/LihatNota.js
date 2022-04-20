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

export default function LihatNota({ navigation, route }) {
    const { time } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [users2, setUsers2] = useState([]);

    const usersCollectionRef1 = collection(db, time);

    useEffect(
        () =>
            onSnapshot(usersCollectionRef1, (snapshot) =>
                setUsers2(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
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
                    Menu Produk
                </Text>

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
                    <DataTable.Title style={{ flex: 1.5 }}>ID</DataTable.Title>
                    <DataTable.Title style={{ flex: 3 }}>Nama Barang</DataTable.Title>
                    <DataTable.Title style={{ flex: 1 }}>Qty</DataTable.Title>
                    <DataTable.Title style={{ flex: 2.5 }}>Harga</DataTable.Title>
                </DataTable.Header>
            </DataTable>
            {users2.map((user) => {
                return (
                    <DataTable>
                        <DataTable.Row>
                            <DataTable.Cell style={{ flex: 1.5 }}>{user.Id}</DataTable.Cell>
                            <DataTable.Cell style={{ flex: 3 }}>{user.Nama}</DataTable.Cell>
                            <DataTable.Cell style={{ flex: 1 }}>{user.Qty}</DataTable.Cell>
                            <DataTable.Cell style={{ flex: 2.5 }}>{user.Harga}</DataTable.Cell>
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