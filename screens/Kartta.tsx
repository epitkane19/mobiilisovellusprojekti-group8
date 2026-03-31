import React, { useEffect, useRef, useCallback, useState } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import { leafletHtml } from '../components/leaflet';
import { laskeAvgNopeus, LaskeMatkaKoordinaateista } from '../mathFunctions/functions'

interface coordInterface {
    lat: number;
    lng: number;
}

export function Kartta() {
    const webviewRef = useRef<WebView | null>(null);
    const trackingRef = useRef<NodeJS.Timeout | null>(null);
    const [coordList, setCoordList] = useState<Array<coordInterface>>([]);
    const [trackedJog, setTrackedJog] = useState<Array<coordInterface>>([]);
    const [distance, setDistance] = useState<number>(0);
    const [fromStartAvgSpd, setFromStartAvgSpd] = useState<number>(0);
    const [avgSpd, setAvgSpd] = useState<number>(0);
    const [spdText, setSpdText] = useState(false);
    const [timeList, setTimeList] = useState<number[]>([]);

    useEffect(() => {
        (async () => {
            await Location.requestForegroundPermissionsAsync();
        })();
    }, []);

    useEffect(() => {
        if(coordList.length < 2 ) {
            return;
        } 

        console.log("koordinaatit:", coordList)

        setDistance(LaskeMatkaKoordinaateista(coordList))

        const coordLength = coordList.length;

        const t0 = timeList[coordLength - 2];
        const t1 = timeList[coordLength - 1];
        const x0 = LaskeMatkaKoordinaateista(coordList.slice(0, coordLength - 1));
        const x1 = distance;

        setAvgSpd(laskeAvgNopeus(t0, t1, x0, x1));

        setFromStartAvgSpd(laskeAvgNopeus(0, t1, 0, x1))

    }, [coordList]);

    useEffect(() => {
        if(trackedJog.length < 2 ) {
            return;
        }

        console.log("viime juoksu:", trackedJog);

    }, [trackedJog]);

    const sendLocationToWebView = useCallback(async () => {
        try {
            const position = await Location.getCurrentPositionAsync({
            });
            const coords = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };

            setCoordList(prev => [...prev, coords]);
            setTimeList(prev => [...prev, Date.now() / 1000]);

            webviewRef.current?.postMessage(JSON.stringify(coords));

        } catch (e) {
            console.log('location error:', e);
        }
    }, []);

    const handleMessage = useCallback(async (event: any) => {
        const data = event.nativeEvent.data;

        if (data === 'request-location') {
            await sendLocationToWebView();
        }

        if (data === 'start-tracking') {
            if (trackingRef.current) return;

            trackingRef.current = setInterval(() => {
                sendLocationToWebView();
            }, 3000);
        }

        if (data === 'stop-tracking') {
            if (trackingRef.current) {
                clearInterval(trackingRef.current);
                trackingRef.current = null;
            }
            setTrackedJog(coordList);
            setCoordList([]);
        }
    }, [sendLocationToWebView, coordList]);

    return (
        <View style={styles.container}>
            <Pressable onPress={() => setSpdText(prev => !prev ) }>
                <View style={styles.numberContainer}>
                    <Text style={styles.teksti}>
                        {spdText ? `Keskinopeus alusta: ${fromStartAvgSpd}` : `Keskinopeus: ${avgSpd}`}
                    </Text>
                </View>
            </Pressable>
            <View style={styles.numberContainerBottom}>
                <Text style={styles.teksti}>Matka: {distance}</Text>
            </View>
            <WebView
                ref={webviewRef}
                originWhitelist={['*']}
                source={{ html: leafletHtml }}
                onMessage={handleMessage}
                style={{ flex: 1 }}
            />
        </View>
    );
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
    }
});
