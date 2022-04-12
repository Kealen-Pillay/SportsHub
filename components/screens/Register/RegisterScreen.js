import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Image } from 'react-native'
import { auth } from '../../../firebase';
import { useNavigation } from '../../../node_modules/@react-navigation/core';



const RegisterScreen = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confpassword, setConfpassword] = useState('')

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("Home")
            }
        })
        return unsubscribe;
    }, [])


    const handleSignUp = () => {
        //username
        if(username.length < 3)
        {
            alert("Username must be at least 3 characters")
        }
        // email
        else if(email.length==0)
        {
            
            alert("Please enter an email")
        }
        else if(!(email.match(/\w+@[A-Za-z_]+\.[A-Za-z]{2,6}/)))
        {
            alert("email is bad ");
        }
        //password checks
        else if(password.length < 6)
        {
            alert("Password must be at least 6 characters");
        }
        else if(password != confpassword)
        {
            
            alert("Passwords do not match! Please try again.");
        }
        else{
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log(user.email);
            })
            .catch(error => alert(error.message))
        }
    }


    return (
        <KeyboardAvoidingView style={styles.container}>
            <View>
                <Image style={styles.logo} source={require("../../../assets/SportsHubV4.png")} />

                <TextInput
                    style={styles.text}
                    placeholder="Username"
                    value={username}
                    onChangeText={text => setUsername(text)}
                />

                <TextInput
                    style={styles.text}
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    keyboardType='email-address'
                />

                <TextInput
                    style={styles.text}
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                />

                <TextInput
                    style={styles.text}
                    placeholder="Confirm Password"
                    value={confpassword}
                    onChangeText={text => setConfpassword(text)}
                    secureTextEntry
                />

            </View>

            <View>
                <TouchableOpacity
                    testID='registerButton'
                    style={styles.button}
                    onPress={handleSignUp}>
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
        backgroundColor: "#1E1E1E",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 10,

        width: 300,
        height: 50,
        paddingHorizontal: 10,
        margin: 15,
    },

    logo: {

        top: -60,
        left: 120,
        width: 100,
        height: 100,

    },
    button: {
        backgroundColor: "#3F3D41",
        width: "90%",
        borderWidth: 2,
        borderColor: "#E82A96",
        borderRadius: 12,

        height: 50,
        justifyContent: "center",
        alignContent: "center",
        margin: 20,
    },
    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 25,
        alignContent: "center",
        justifyContent: "center",
    },


})