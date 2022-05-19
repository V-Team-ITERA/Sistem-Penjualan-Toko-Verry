import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View, TouchableOpacity, TextInput, Modal } from 'react-native';
import { DataTable } from 'react-native-paper';
import { db } from "../firebase.js";
import {
    collection,
    onSnapshot,
} from "firebase/firestore";
import { ScrollView } from 'react-native-gesture-handler';

export default function DaftarBarangPegawai({ navigation }) {

    const [modalVisible1, setModalVisible1] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [newName, setNewName] = useState('');
    const [users, setUsers] = useState([]);
    const x = "Produk";
    const usersCollectionRef = collection(db, x);

    const yakeluar = async () => {
        setModalVisible2(false);
        navigation.navigate("Login");
    };

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
                                marginLeft: "10%",
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
                                onPress={() => setModalVisible2(!modalVisible2)}>
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
                visible={modalVisible1}
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
                                onPress={() => setModalVisible1(!modalVisible1)}>
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
                paddingBottom: "8%",
                borderBottomColor: 'lightgray',
                borderBottomWidth: 1
            }}>

                <TouchableOpacity style={{
                    backgroundColor: "#F24E1E",
                    borderRadius: 3,
                    marginLeft: '1%',
                    padding: 5,
                    justifyContent: "center",
                    alignItems: "center"
                }}
                    onPress={() => setModalVisible2(true)}>
                    <Image
                        source={require('../assets/Logout.png')}
                        style={{
                            height: 17,
                            width: 17,
                            marginBottom: "4%"
                        }}>
                    </Image>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    backgroundColor: "#F24E1E",
                    borderRadius: 3,
                    padding: 5,
                    marginLeft: '1.5%',
                    justifyContent: "center",
                    alignItems: "center",
                    width: "40%"
                }} onPress={() => navigation.navigate("MenuProdukPegawai")}>
                    <Text style={{
                        fontWeight: 700,
                        fontSize: "80%",
                        color: "white",
                    }}> Menu Penjualan </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    backgroundColor: "#white",
                    borderRadius: 3,
                    borderWidth: 2,
                    borderColor: "#F24E1E",
                    padding: 5,
                    marginLeft: '1.5%',
                    justifyContent: "center",
                    alignItems: "center",
                    width: "40%"
                }} onPress={() => navigation.navigate("DaftarBarangPegawai")}>
                    <Text style={{
                        fontWeight: 700,
                        fontSize: "80%",
                        color: "#F24E1E",
                    }}> Daftar Barang </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    backgroundColor: "#F24E1E",
                    borderRadius: 3,
                    marginLeft: '1.5%',
                    marginRight: "1%",
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

            <View style={{
                marginTop: "6%",
                marginBottom: "6%",
                marginLeft: "10%",
                marginRight: "10%",
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
            </View>

            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>ID</DataTable.Title>
                    <DataTable.Title>Nama Barang</DataTable.Title>
                    <DataTable.Title>       Stock</DataTable.Title>
                    <DataTable.Title >Harga</DataTable.Title>
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
                                    <DataTable.Cell>{user.KB}</DataTable.Cell>
                                    <DataTable.Cell>{user.Nama}</DataTable.Cell>
                                    <DataTable.Cell>       {user.Stock}</DataTable.Cell>
                                    <DataTable.Cell>{user.Harga}</DataTable.Cell>
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
