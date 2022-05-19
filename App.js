import * as React from 'react';
import { StyleSheet } from 'react-native';
import {
  createDrawerNavigator,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Sidebar from './Page1/Sidebar';
import Login from './Page1/Login_Page'
import MenuProduk from './Page1/MenuProduk_Page';
import MenuKeuangan from './Page1/MenuKeuangan_Page'
import DaftarBarang from './Page1/DaftarBarang_Page'
import Notifikasi from './Page1/Notifikasi'
import Notifikasi2 from './Page1/Notifikasi2'
import LihatNota from './Page1/LihatNota';
import MenuProdukPegawai from './Page1/MenuProdukPegawai'
import DaftarBarangPegawai from './Page1/DaftarBarangPegawai'
import LihatKeuangan from './Page1/LihatKeuangan';

const RightDrawer = createDrawerNavigator();

function RightDrawerScreen() {
  return (
    <RightDrawer.Navigator
      useLegacyImplementation
      id="RightDrawer"
      drawerContent={(props) => <Sidebar {...props} />}
      screenOptions={{
        drawerPosition: 'left',
        headerShown: false,
      }}>
      <RightDrawer.Screen name="Login" component={Login} />
      <RightDrawer.Screen name="MenuProduk" component={MenuProduk} />
      <RightDrawer.Screen name="MenuKeuangan" component={MenuKeuangan} />
      <RightDrawer.Screen name="DaftarBarang" component={DaftarBarang} />
      <RightDrawer.Screen name="Notifikasi" component={Notifikasi} />
      <RightDrawer.Screen name="Notifikasi2" component={Notifikasi2} />
      <RightDrawer.Screen name="MenuProdukPegawai" component={MenuProdukPegawai} />
      <RightDrawer.Screen name="DaftarBarangPegawai" component={DaftarBarangPegawai} />
      <RightDrawer.Screen name="LihatNota" component={LihatNota} />
      <RightDrawer.Screen name="LihatKeuangan" component={LihatKeuangan} />
    </RightDrawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RightDrawerScreen />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F24E1E',
  },
});
