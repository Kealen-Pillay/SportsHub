import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'


const RegisterScreen = () => {
    return (
        <KeyboardAvoidingView style={styles.container}>
            <View>
                <TextInput style={styles.text}
                    placeholder="Username"
                />

                <TextInput style={styles.text}
                    placeholder="Email"
                />

                <TextInput style={styles.text}
                    placeholder="Password"
                />

                <TextInput style={styles.text}
                    placeholder="Confirm Password"
                />

            </View>

            <View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Create Account</Text>
                </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>
    );
}

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E1E1E',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    text: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 10,
        width: "90%",
        height: 50,
        paddingHorizontal: 10,
        margin: 15,
    },

    logo: {

        width: 100,
        height: 100,
        position: "absolute",
        top: 70,
    },
    button: {
        backgroundColor: "#3F3D41",
        width: "90%",
        borderWidth: 2,
        borderColor: "#E82A96",
        borderRadius: 10,
        height: 50,
        justifyContent: "center",
        alignContent: 'center',
        margin: 20,
    },
    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 25,
    },
})