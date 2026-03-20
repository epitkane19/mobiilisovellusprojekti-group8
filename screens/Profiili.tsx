import React, { useEffect, useState } from 'react';
import {View, Text, Button, StyleSheet, Dimensions} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/navigation'
import { MyChart } from '../components/chart';
import { ProfiiliValikkoModal } from '../components/ProfiiliModal';
import { LuoProfiiliValikkoModal } from '../components/LuoProfiiliModal';
import * as SQLite from 'expo-sqlite';
import { Database } from '../Database/Database';

const { width, height } = Dimensions.get("window");


type Props = NativeStackScreenProps<RootStackParamList,'Profiili'>

export function Profiili({ route }: Props) {

  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  
    useEffect(() => {
      Database({db, setDb}) // useeffectilla ladataan db, eli tietokanta usetstate muuttujaan
    }, []);

  const [userId, setUserId] = useState(null) // conditional renderöintiä ja oikean profiilin asetusten tsekkausta varten
  const [modalVisible, setModalVisible] = useState(false);

  

  return (
    <View style={styles.container}>
          <LuoProfiiliValikkoModal
          modalVisible= {modalVisible}
          setModalVisible={setModalVisible}
          db={db}
          ></LuoProfiiliValikkoModal>
          <MyChart></MyChart>
    </View>
  );
}

const styles = StyleSheet.create({
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
chart: {
    flex: 1
  },
})