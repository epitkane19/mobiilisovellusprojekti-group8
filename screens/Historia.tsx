import React, { useEffect, useRef, useCallback, useState } from 'react';
import { View, StyleSheet, Text, Pressable, Modal } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import { leafletHtml } from '../components/leaflet';
import { leafletHtmlStat } from '../components/leaflet_statcard';
import { laskeAvgNopeus, LaskeMatkaKoordinaateista, laskeLenkinKalorit } from '../mathFunctions/functions'
import { UserData, UserWeight } from '../types/database';
import { loadUserData, AddNewJog } from '../Database/Database';
import { useSQLiteContext } from 'expo-sqlite';
import { JogHistory } from '../components/JogHistory';

interface coordInterface {
    coords: { lat: number; lng: number; };
    time: number;
}

export function Historia() {

    const db = useSQLiteContext(); //ladataan database konstekstista

    const [userData, setUserData] = useState<UserData[]>([])
    const [UserWeight, setUserWeight] = useState<UserWeight[]>([])

    const statWebviewRef = useRef<WebView | null>(null);
    const [coordList, setCoordList] = useState<coordInterface[]>([]);

    const [showStats, setShowStats] = useState(false);
        
    useEffect(() => {
        loadUserData(db, setUserData, setUserWeight) //(uus versio) useeffectilla ladataan db:stä tiedot mitä halutaan
        //purgeDb(db)
    }, []);

    const handleMessage = useCallback(async (event: any) => {
            const data = event.nativeEvent.data;
    
            setTimeout(() => {
                statWebviewRef.current?.postMessage(JSON.stringify({
                    type: "draw-polyline",
                    coords: coordList.map(c => c.coords)
                }));
            }, 300)
    
        }, [coordList]);

    return (
        <View style={styles.container}>
            <Pressable onPress={() => setShowStats(true) }>
                <View style={styles.numberContainer}>
                    <Text style={styles.teksti}>
                        Testi
                    </Text>
                </View>
            </Pressable>
            <Modal
                visible={showStats}
                transparent={true}
                animationType="slide"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.statcard}>
                        <Text style={styles.statcardTitle}>Juoksun tiedot</Text>
                
                        <View style={{ height: 200, marginBottom: 20 }}>
                            <WebView
                                ref={statWebviewRef}
                                originWhitelist={['*']}
                                source={{ html: leafletHtmlStat }}
                                onMessage={handleMessage}
                                style={{ flex: 1 }}
                            />
                        </View>
                
                        <Text style={styles.statCardText}>Matka:  km</Text>
                        <Text style={styles.statCardText}>Keskinopeus alusta:  km/h</Text>
                        <Text style={styles.statCardText}>Aika: </Text>
                        <Text style={styles.statCardText}>Kaloreita kulutettu: </Text>

                        <Pressable
                            onPress={() => setShowStats(false)}
                            style={styles.statcardButton}
                        >
                            <Text style={styles.statcardButtonText}>Sulje</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    numberContainer: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        backgroundColor: '#fff',
    },
    numberContainerBottom: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        backgroundColor: '#fff',
    },
    teksti: {
        fontSize: 30
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statcard: {
        width: '90%',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 15,
        elevation: 5,
    },
    statcardTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    statcardButton: {
        marginTop: 20,
        backgroundColor: '#ffffff',
        borderColor: '#000000',
        borderWidth: 2,
        borderRadius: 20,
        width: "48%",
        alignItems: "center",
        justifyContent: "center",
    },
    statCardText: {
        fontSize: 20
    },
    statcardButtonText: {
        fontSize: 30,
    }
});
