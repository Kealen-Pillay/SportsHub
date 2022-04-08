import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { auth } from '../../../firebase';

const TempHome = () => {
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

const styles = StyleSheet.create({})
