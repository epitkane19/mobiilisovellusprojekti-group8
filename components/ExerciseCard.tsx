import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Exercise } from '../types/database';
import { deleteExercise } from '../Database/Database';

interface execProps {
    exercise: Exercise
    toggleSelect?: (id: string) => void;
    selected?: boolean;
    onDelete?: (id: number) => void;



}

export default function ExerciseCard({ exercise, toggleSelect, selected, onDelete}: execProps) {
    return (
        <TouchableOpacity
            onPress={() => toggleSelect?.(exercise.GymDataID)}
            style={[
                styles.card,
                selected && styles.selectedLiike]}
        >
            <View>
                <View style={styles.titleRow}>
                    <Text style={styles.title}>{exercise.Exercise_Type}</Text>

                 <Pressable
                        onPress={() => onDelete?.(exercise.GymDataID)}>
                    <Text style={styles.modalNappi}>Poista</Text>
                    </Pressable>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Paino:</Text>
                    <Text style={styles.value}>{exercise.Weight_Kg} kg</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Setit:</Text>
                    <Text style={styles.value}>{exercise.Set_Amount}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Toistot:</Text>
                    <Text style={styles.value}>{exercise.Repetitions}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Tauko:</Text>
                    <Text style={styles.value}>{exercise.Rest_Time_Minutes} min</Text>
                </View>
            </View>
        </TouchableOpacity>

    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        padding: 16,
        marginVertical: 8,
        margin:10,
        borderRadius: 12,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 2,
    },
    titleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 2,
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    label: {
        color: "#666",
    },
    value: {
        fontWeight: "600",
    },

    selectedLiike: {
        backgroundColor: '#fc8bd2ff',
    },
    modalNappi: {
        backgroundColor: '#9c9b9cff',

        width: 60,
        height: 40,
        borderRadius: 50,
        fontSize: 15,
        textAlign: 'center',
        verticalAlign: 'middle'
    },
});