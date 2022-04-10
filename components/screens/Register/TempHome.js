import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
// import { auth } from '../../../firebase';
import { useNavigation } from '../../../node_modules/@react-navigation/core';

const TempHome = () => {
    const navigation = useNavigation();

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace("Register")
            })
            .catch(error => alert(error.message))
    }

    return (
        <View>
            <Text>Email: {auth.currentUser.email}</Text>
            <TouchableOpacity
                onPress={handleSignOut}
            >
                <Text>Sign Out</Text>
            </TouchableOpacity>
        </View>
    )
}

export default TempHome

const styles = StyleSheet.create({})
