import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { RootStackParamList } from '../types/navigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { OhjelmaModal } from '../components/OhjelmaModal'


type Props = NativeStackScreenProps<RootStackParamList, 'Sali'>


export function Sali({ route }: Props) {
      const [modalVisible, setModalVisible] = useState(false);
    
    return (
        <View style={styles.kontti}>
            <TouchableOpacity style={styles.päivärivi}>
            <Text style={styles.päivä}>Ma</Text>
            <Text style={styles.päiväbox}>Kovaa treeniä</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.päivärivi}>
            <Text style={styles.päivä}>Ti</Text>
            <Text style={styles.päiväbox}>Kovaa treeniä</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.päivärivi}>
            <Text style={styles.päivä}>Ke</Text>
            <Text style={styles.päiväbox}>Kovaa treeniä</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.päivärivi}>
            <Text style={styles.päivä}>To</Text>
            <Text style={styles.päiväbox}>Kovaa treeniä</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.päivärivi}>
            <Text style={styles.päivä}>Pe</Text>
            <Text style={styles.päiväbox}>Kovaa treeniä</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.päivärivi}>
            <Text style={styles.päivä}>La</Text>
            <Text style={styles.päiväbox}>Kovaa treeniä</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.päivärivi}>
            <Text style={styles.päivä}>Su</Text>
            <Text style={styles.päiväbox}>Kovaa treeniä</Text>
            </TouchableOpacity>
            

            
                <OhjelmaModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    db={null}                          
                      ></OhjelmaModal>  
                
            

        </View>
    )
}

const styles = StyleSheet.create({
    kontti: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#c3c0c0ff',
        
    },
    päiväbox:{
        backgroundColor: '#f6f6f6ff',
        margin: 2,
        padding: 5,
        height:60,
        width: 250,
        borderRadius: 4,
        
    },
    päivärivi:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:300,
        
    },
    päivä:{
        fontSize: 30
        
    },
    uusiTreeni:{
        backgroundColor:'#0c0c0c22',
        width: 130,
        margin: 15,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        

    }
})