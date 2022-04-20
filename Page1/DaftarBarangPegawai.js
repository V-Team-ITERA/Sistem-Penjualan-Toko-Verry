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

export default function DaftarBarangPegawai({ navigation }) {

    const [users, setUsers] = useState([]);
    const x = "Produk";
    const usersCollectionRef = collection(db, x);

    useEffect(
        () =>
            onSnapshot(usersCollectionRef, (snapshot) =>
                setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            ),
        []
    );
    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: "row",
                marginTop: "13%",
                borderBottomColor: 'lightgray',
                borderBottomWidth: 1
            }}>
                <TouchableOpacity style={{
                    backgroundColor: "#F24E1E",
                    borderRadius: 3,
                    padding: 5,
                    marginLeft: '2%',
                    marginRight: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    width: "40%"
                }} onPress={() => navigation.navigate("MenuProdukPegawai")}>
                    <Text style={{
                        fontWeight: 700,
                        fontSize: 12,
                        color: "white",
                    }}> Menu Produk </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    backgroundColor: "#F24E1E",
                    borderRadius: 3,
                    padding: 5,
                    marginRight: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    width: "40%"
                }} onPress={() => navigation.navigate("DaftarBarangPegawai")}>
                    <Text style={{
                        fontWeight: 700,
                        fontSize: 12,
                        color: "white",
                    }}> Daftar Produk </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    backgroundColor: "#F24E1E",
                    borderRadius: 3,
                    padding: 5,
                    justifyContent: "center",
                    alignItems: "center"
                }}
                    onPress={() => navigation.navigate("Notifikasi2")}>
                    <Image
                        source={require('../assets/notifikasi.png')}
                        style={{
                            height: 17,
                            width: 17,
                            marginBottom: "4%"
                        }}>
                    </Image>
                </TouchableOpacity>


            </View>
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