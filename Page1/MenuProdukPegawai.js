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

export default function MenuProdukPegawai({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [newName, setNewName] = useState('');
    const [newqty, setNewqty] = useState('');
    const [newid, setNewid] = useState('Awal');
    const [users, setUsers] = useState([]);
    const [users2, setUsers2] = useState([]);
    const [Total, setTotal] = useState(0);

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const bulan = months[new Date().getMonth()];
    const year = new Date().getFullYear();
    const time = bulan + new Date().getDate() + new Date().getHours() + new Date().getMinutes()
    const tanggal = new Date().getDate();
    const usersCollectionRef = collection(db, "Produk");
    const usersCollectionRef2 = collection(db, bulan + year);
    const usersCollectionRef1 = collection(db, time);

    const editUser = async (id, Nama, Qty) => {
        const userDoc = doc(db, newid, id);
        setNewName(Nama);
        setNewqty(Qty);
        {
            users.map((user) => {
                if (user.Nama == newName) {
                    updateDoc(userDoc, {
                        Id: user.KB,
                        Nama: user.Nama,
                        Qty: newqty,
                        Harga: newqty * user.Harga
                    })
                    setNewName('');
                    setNewqty('');
                    updateDoc(doc(db, "Produk", user.id), { Stock: user.Stock - newqty });
                }
            })
        }
    };

    const deleteUser = async (id) => {
        const userDoc = doc(db, newid, id);
        deleteDoc(userDoc);
    };

    const createUser = async (newName, newqty, Total) => {
        if (newid == 'Awal') {
            addDoc(usersCollectionRef2, { Total: 0, IdNota: time, Tanggal: tanggal });
            setNewid(time);
            const usersCollectionRef1 = collection(db, time);
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
                paddingBottom:"8%",
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

            <View style={{ 
                borderBottomColor: 'lightgray',
                borderBottomWidth: 1}}>
                <View style={{ flexDirection: "row", marginTop:"3%", marginBottom:"2%" }}>
                <Text style={{
                  fontWeight: 700,
                  fontSize: "85%",
                  color: "black",
                  margin: "3%",
                }}>  Produk : </Text>
                <TextInput style={{
                  flex:1,
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
                  flex:1,
                  backgroundColor: "white",
                  borderRadius: 3,
                  borderWidth: 1,
                  padding: 5,
                  fontSize: "75%", 
                  marginTop: "2%",
                  marginBottom: "2%",
                  marginRight:"8%",
                  width:"50%"
                }} onChangeText={setNewqty}
                  value={newqty}>
                </TextInput>
              </View>
        
              <TouchableOpacity style={{
                backgroundColor: "#F24E1E",
                borderRadius: 15,
                marginLeft:"33%",
                marginBottom:"5%",
                padding: 6,
                justifyContent: "center",
                alignItems: "center",
                width: "30%"
              }} onPress={() => createUser(newName, newqty, Total)}>
                <Text style={{
                  fontWeight: 700,
                  fontSize: "85%",
                  color: "white",
                }}> Masukan </Text>        
              </TouchableOpacity>
              </View>


            <DataTable>
                <DataTable.Header>
                    <DataTable.Title style={{ flex: 1 }}>ID</DataTable.Title>
                    <DataTable.Title style={{ flex: 1.8 }}>Nama Barang</DataTable.Title>
                    <DataTable.Title style={{ flex: 0.7 }}>Qty</DataTable.Title>
                    <DataTable.Title style={{ flex: 1.7 }}>Harga</DataTable.Title>
                    <DataTable.Title style={{ flex: 1 }}>Edit</DataTable.Title>
                    <DataTable.Title style={{ flex: 1 }}>Hapus</DataTable.Title>
                </DataTable.Header>
            </DataTable>
            {users2.map((user) => {
                return (
                <DataTable>
                    <DataTable.Row>
                        <DataTable.Cell style={{ flex: 1.5 }}>{user.Id}</DataTable.Cell>
                        <DataTable.Cell style={{ flex: 3.2 }}>{user.Nama}</DataTable.Cell>
                        <DataTable.Cell style={{ flex: 1 }}>{user.Qty}</DataTable.Cell>
                        <DataTable.Cell style={{ flex: 2.5 }}>{user.Harga}</DataTable.Cell>
                        <DataTable.Cell style={{ flex: 2 }}>
                            <TouchableOpacity style={{borderWidth:1,
                                                    backgroundColor: "white",
                                                    borderRadius: 3,
                                                    padding: 5,
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    width: "100%"
                                                    }}
                            onPress={() => editUser(user.id, user.Nama, user.Qty)}>
                            <Text style={{
                                fontWeight: 600,
                                fontSize: 12,
                                color: "black",
                            }}> Edit </Text>
                            </TouchableOpacity>
                        </DataTable.Cell>
                        <DataTable.Cell style={{ flex: 1 }}>
                            <TouchableOpacity style={   {borderWidth:1,
                                                        backgroundColor: "white",
                                                        borderRadius: 3,
                                                        padding: 5,
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        width: "100%"
                                                        }}
                                onPress={() => deleteUser(user.id)}>
                                <Text style={{
                                    fontWeight: 600,
                                    fontSize: 12,
                                    color: "black",
                                }}> Hapus </Text>
                            </TouchableOpacity>
                        </DataTable.Cell>
                    </DataTable.Row>
                </DataTable>
                );
            })}

            
            <View style={{  
                borderTopColor: 'lightgray',
                borderTopWidth: 1,
                marginTop:"20%"   }}>
            <View style={{  flexDirection:"row"}}>
                <Text style={{
                flex:1,
                fontWeight: 700,
                fontSize: "95%",
                color: "black",
                margin: "3%",
                }}>Total</Text>

                <Text style={{
                flex:1,
                fontWeight: 500,
                fontSize: "95%",
                color: "black",
                margin: "3%",
                }}> Rp.  {Total} </Text>
            </View>

            <TouchableOpacity style={{ 
                backgroundColor: "#F24E1E",
                borderRadius: 3,
                margin:"3%",
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
                }}> Cetak </Text>
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
