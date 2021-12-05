import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import Picker from 'react-native-picker-select';
import Header from './Header';
import logo from './Assets/user_group_new.png';

function Form() {
    const ufs = [
        { label: 'RS', value: '1' },
        { label: 'SC', value: '2' },
        { label: 'PR', value: '3' },//coloque os outros estados aqui...
    ];

    const placeholder = { label: 'Selecione o estado', value: null, color: 'black' };

    return (
        <>
            <Header title="Cadastro" />
            <View style={styles.container}>
                <Image source={logo} style={styles.topImage} />
                <Text style={styles.title}>Preencha o formulário abaixo:</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder="Digite o nome" />
                <TextInput style={styles.input} placeholder="Digite a idade" keyboardType={'numeric'} />
                <Picker placeholder={placeholder} onValueChange={() => {}} style={pickerSelectStyles} items={ufs} />
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    inputContainer: {
        margin: 20,
        alignItems: 'stretch',
    },
    topImage: {
        margin: 20,
    },
    title: {
        fontSize: 20,
    },
    input: {
        marginTop: 10,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 24,
        fontSize: 16,
        alignItems: 'stretch',
    },
    button: {
        marginTop: 10,
        height: 60,
        backgroundColor: 'green',
        borderRadius: 10,
        paddingHorizontal: 24,
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        marginTop: 10,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 24,
        fontSize: 16,
        alignItems: 'stretch',
    },
    inputAndroid: {
        marginTop: 10,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 24,
        fontSize: 16,
        alignItems: 'stretch',
    },
});

export default Form;