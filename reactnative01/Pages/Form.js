import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import Picker from 'react-native-picker-select';
import Header from './Header';
import logo from './Assets/user_group_new.png';
import axios from 'axios';

function Form() {

    const [ufs, setEstados] = useState([]);

    useEffect(() => {
        axios.get('http://192.168.0.108:3030/estados')
            .then(response => {
                setEstados(response.data.map(estado => ({ label: estado.uf, key: estado.uf, value: estado.uf })));
            });
    }, []);

    const placeholder = { label: 'Selecione o estado', value: null, color: 'black' };

    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState(0);
    const [estado, setEstado] = useState('');

    function handleNameChange(name) { setNome(name); }
    function handleAgeChange(idade) { setIdade(parseInt(idade)); }
    function handleStateChange(state) { setEstado(state); }

    function handleButtonPress() {
        axios.post('http://192.168.0.108:3031/cadastro', { nome, idade, estado })
            .then(response => {
                alert(response.data.dados.length + ' cadastros!');
            })
    }

    return (
        <>
            <Header title="Cadastro" />
            <View style={styles.container}>
                <Image source={logo} style={styles.topImage} />
                <Text style={styles.title}>Preencha o formulário abaixo:</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder="Digite o nome" onChangeText={handleNameChange} />
                <TextInput style={styles.input} placeholder="Digite a idade" keyboardType={'numeric'} onChangeText={handleAgeChange} />
                <Picker placeholder={placeholder} onValueChange={handleStateChange} style={pickerSelectStyles} items={ufs} />
                <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
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