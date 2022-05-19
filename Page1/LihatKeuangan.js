import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import { DataTable } from 'react-native-paper';
import { db } from "../firebase.js";
import {
    collection,
    onSnapshot,
} from "firebase/firestore";
import { ScrollView } from "react-native-gesture-handler";

export default function MenuKeuangan({ navigation, route }) {
    let total = 0;
    const { time } = route.params;
    const usersCollectionRef2 = collection(db, time);
    const [users, setUsers] = useState([]);
    onSnapshot(usersCollectionRef2, (snapshot) =>
        setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    )

    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: "row",
                marginTop: "8%",
                borderBottomColor: 'lightgray',
                borderBottomWidth: 1
            }}>
                <TouchableOpacity style={{
                    flex: 1,
                    marginTop: "4.25%",
                    marginLeft: "5%"
                }}
                    onPress={() => navigation.navigate("MenuKeuangan")}>
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
                borderBottomColor: 'lightgray',
                borderBottomWidth: 1
            }}>

            </View>
            <DataTable>
                <DataTable.Header >
                    <DataTable.Title>Tanggal</DataTable.Title>
                    <DataTable.Title>ID</DataTable.Title>
                    <DataTable.Title>Total</DataTable.Title>
                </DataTable.Header>
            </DataTable>

            <ScrollView>
                {users.map((user) => {
                    if (user.Total != 0) {
                        total = total + user.Total;
                        return (
                            <DataTable>
                                <DataTable.Row>
                                    <DataTable.Cell>{user.Tanggal}</DataTable.Cell>
                                    <DataTable.Cell>{user.IdNota}</DataTable.Cell>
                                    <DataTable.Cell>{user.Total}</DataTable.Cell>
                                </DataTable.Row>
                            </DataTable>
                        );
                    }
                })}
            </ScrollView>


            <View style={{
                borderTopColor: 'lightgray',
                borderTopWidth: 1
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
                    }}> Rp.  {total} </Text>
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