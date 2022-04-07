import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'


const RegisterScreen = () => {
    return (
        <KeyboardAvoidingView>
            <View>
                <TextInput
                    placeholder="Username"
                />

                <TextInput
                    placeholder="Email"
                />

                <TextInput
                    placeholder="Password"
                />

                <TextInput
                    placeholder="Confirm Password"
                />

            </View>

            <View>
                <TouchableOpacity>
                    <Text>Create Account</Text>
                </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>
    );
}

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'grey',
    },

    logo: {

        width: 100,
        height: 100,
        position: "absolute",
        top: 70,
    }
})