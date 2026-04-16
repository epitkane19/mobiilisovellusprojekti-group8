import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, Dimensions, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { TreeniListaModalProps, TreeniModalProps } from '../types/ModalProps';
import { horizontalScale } from '../mathFunctions/FonttiSkaalaaja';
import { LiikeModal } from './LiikeModal';
import LiikeCard from './LiikeCard';
import { Exercise, Training } from '../types/database';
import { loadGymData, loadTrainData } from '../Database/Database';
import { TreeniModal } from './TreeniModal';
import TreeniCard from './TreeniCard';

const { width, height } = Dimensions.get("window");

export function TreeniListaModal({ modalVisibleTreeniLista, setModalVisibleTreeniLista, db }: TreeniListaModalProps) {
    const [modalVisibleTreeni, setModalVisibleTreeni] = useState(false);
    const [gymTrainList, setGymTrainList] = useState<Training[]>([])
    const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);
    const [modalTraining, setModalTraining] = useState(false);

    const numerotest = 1

    useEffect(() => {
        loadTrainData(setGymTrainList, db)
    }, [])

    return (
        <View>
            <Pressable

                onPress={() => setModalVisibleTreeniLista(true)}>
                <Text style={styles.modalNappi}>Treenit</Text>
            </Pressable>

            <Modal
                animationType="slide"
                visible={modalVisibleTreeniLista}>

                <View style={styles.ohjelmaModal}>

                    <Text style={styles.otsikko}>Treenit</Text>

                    <FlatList
                        data={gymTrainList}
                        keyExtractor={(item) => item.TrainDataID.toString()}
                        renderItem={({ item }) =>
                            <TreeniCard
                                item={item}
                                TrainDataID={item.TrainDataID}
                                OnPress={() => {
                                    setSelectedTraining(item);
                                    setModalTraining(true);
                                }}
                            />
                        }
                        style=""
                    />
                    <Modal
                        animationType="slide"
                        visible={modalTraining}
                    >
                        <View style={styles.ohjelmaModal}>
                            <Text>Train Name: {selectedTraining?.TrainName}</Text>
                            
                            {selectedTraining?.Exec1 && (<Text>{selectedTraining.Exec1}</Text>)}
                            {selectedTraining?.Exec2 && (<Text>{selectedTraining.Exec2}</Text>)}
                            {selectedTraining?.Exec3 && (<Text>{selectedTraining.Exec3}</Text>)}
                            {selectedTraining?.Exec4 && (<Text>{selectedTraining.Exec4}</Text>)}
                            {selectedTraining?.Exec5 && (<Text>{selectedTraining.Exec5}</Text>)}
                            {selectedTraining?.Exec6 && (<Text>{selectedTraining.Exec6}</Text>)}
                            {selectedTraining?.Exec7 && (<Text>{selectedTraining.Exec7}</Text>)}
                            {selectedTraining?.Exec8 && (<Text>{selectedTraining.Exec8}</Text>)}
                            {selectedTraining?.Exec9 && (<Text>{selectedTraining.Exec9}</Text>)}
                            {selectedTraining?.Exec10 && (<Text>{selectedTraining.Exec10}</Text>)}

                        </View>
                        <Pressable
                            onPress={() => { setModalTraining(false) }}>
                            <Text style={styles.modalNapit}>Sulje</Text>
                        </Pressable>

                    </Modal>

                    <View style={styles.modalNappiRivi}>

                        <Pressable
                            onPress={() => setModalVisibleTreeniLista(false)}>
                            <Text style={styles.modalNappi}>Sulje</Text>
                        </Pressable>

                        <TreeniModal
                            modalVisibleTreeni={modalVisibleTreeni}
                            setModalVisibleTreeni={setModalVisibleTreeni}
                            db={db}
                        ></TreeniModal>
                    </View>

                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    modalNappi: {
        backgroundColor: '#fc8bd2ff',
        padding: 5,
        margin: 10,
        width: 100,
        height: 40,
        borderRadius: 5,
        fontSize: 15,
        textAlign: 'center',
        verticalAlign: 'middle'
    },
    modalNappiRivi: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        margin: 5,
    },
    modalNapit: {
        backgroundColor: '#fc8bd2ff',
        padding: 5,
        margin: 5,
        width: 100,
        height: 40,
        borderRadius: 5,
        fontSize: 15,
        textAlign: 'center',
        verticalAlign: 'middle'
    },
    otsikko: {
        textAlign: 'center',
        fontSize: 25,
        padding: 10
    },
    ohjelmaModal: {
        backgroundColor: '#9F6BFB',
        flex: 1
    }
});