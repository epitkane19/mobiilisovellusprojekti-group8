import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import { laskeAvgNopeus, laskeLenkinKalorit, laskeJuoksujenAvgMatka, laskeKoordinaatitKilometreiksi } from '../mathFunctions/functions';
import { Database } from '../Database/Database';
import { UserData } from '../types/database';
import * as SQLite from 'expo-sqlite';

interface coordlist 
{
    "lat": number
    "lng": number
}

export function Koti() {

  const dummyarr =
[
{"lat": 65.0608024, "lng": 25.4661418}, 
{"lat": 49.2125578, "lng": 16.62662018}
]

const dummyarr2 =
[
{"lat": 65.007350, "lng": 25.470208}, 
{"lat": 65.015101, "lng": 25.466268}
]

  const[TempResult, setTempResult] = useState(0) //hävitä myöhemmin tämä, testiä varten
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  const [userData, setUserData] = useState<UserData[]>([])

  useEffect(() => {
            Database({db, setDb, setUserData}) // useeffectilla ladataan db, eli tietokanta usetstate muuttujaan
          }, []);
  

  return (
    <View style={style.container}>
      <Button
      onPress={() => setTempResult(laskeKoordinaatitKilometreiksi(dummyarr2))}
      title="laskettu matka"
      color="#841584"
      ></Button>
      <Button
      onPress={() => setTempResult(laskeLenkinKalorit(70, 60, 3.5))}
      title="kalorit testi (70kg 60min 3.5mps)"
      color="#841584"
      ></Button>
      <Button
      onPress={() => setTempResult(laskeJuoksujenAvgMatka([7.54, 5, 12.54, 8.6]))}
      title="avg matka testi [7.54km, 5km, 12.54km, 8.6km]"
      color="#841584"
      ></Button>
      <Text>{TempResult}</Text>
    </View>
  );
}

const style = StyleSheet.create({
container: 
{
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#fff',
},
text: 
{
  fontSize: 24,
  fontWeight: 'bold',
},
})