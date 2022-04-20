import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View, TouchableOpacity, TextInput } from 'react-native';
import { db } from "../firebase.js";
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc, onSnapshot,
} from "firebase/firestore";

export default function Notifikasi({ navigation }) {
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

            <View>
                <TouchableOpacity style={{
                    flex: 1,
                    marginTop: "4.25%",
                    marginLeft: "5%"
                }}
                    onPress={() => navigation.navigate("MenuProdukPegawai")}
                >
                    <Image
                        source={require('../assets/back.png')}
                        style={{
                            height: 13,
                            width: 18,
                            marginBottom: "5%"
                        }}>
                    </Image>
                </TouchableOpacity>
            </View>



            <View style={{
                backgroundColor: "#F24E1E",
                flexDirection: "colum"
            }}>



                {users.map((user) => {
                    if (user.Stock <= user.Batas) {
                        return (
                            <View style={{
                                marginTop: "8%",
                                marginBottom: "8%",
                                marginLeft: "8%",
                                marginRight: "8%",
                                backgroundColor: "white",
                                borderRadius: 5,
                                padding: 10
                            }}>
                                <Text style={{
                                    fontWeight: 600,
                                    fontSize: 12,
                                    color: "black"
                                }}>
                                    - Stok Produk {user.Nama} Habis, Stok Ulang Sekarang
                                </Text>

                            </View>
                        );
                    }
                })}

                <View style={{
                    marginTop: "5%",
                    marginLeft: "55%",
                    marginBottom: "8%",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <TouchableOpacity style={{
                        backgroundColor: "white",
                        borderRadius: 3,
                        padding: 6,
                        justifyContent: "center",
                        alignItems: "center",
                        width: "65%"
                    }}
                        onPress={() => navigation.navigate("MenuProdukPegawai")}
                    >
                        <Text style={{
                            fontWeight: 700,
                            fontSize: 12,
                            color: "#F24E1E"
                        }}> Selesai </Text>
                    </TouchableOpacity>
                </View>

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