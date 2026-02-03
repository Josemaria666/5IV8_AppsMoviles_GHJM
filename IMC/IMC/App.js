import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [peso, setPeso] = useState(0);
  const [altura, setAltura] = useState(0);
  function calcularIMC(peso, altura) {
    if (altura <= 0) {
      return 'Altura inválida';
    }
    if (peso <= 0) {
      return 'Peso inválido';
    }
    const imc = peso / (altura * altura);
    const imcRedondeado = imc.toFixed(1);
    //Retornamos el valor del IMC redondeado a un decimal con la cadena de caracteres correspondiente con un switch
    //La manera en la que se refleja en un texto
    switch (true) {
      case imc < 18.5:
        return `IMC: ${imcRedondeado} - Bajo peso`;
      case imc >= 18.5 && imc < 24.9:
        return `IMC: ${imcRedondeado} - Peso normal`;
      case imc >= 25 && imc < 29.9:
        return `IMC: ${imcRedondeado} - Sobrepeso`;
      case imc >= 30:
        return `IMC: ${imcRedondeado} - Obesidad`;
      default:
        return 'Error al calcular el IMC';
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Calculadora de IMC</Text>
      <Image source={require('./img/imc.jpg')} style={styles.image} />
      <TextInput
        style={styles.input}
        placeholder="Peso (kg)"
        keyboardType="numeric"
        onChangeText={(text) => setPeso(parseFloat(text))}
      />
      <TextInput
        style={styles.input}
        placeholder="Altura (m)"
        keyboardType="numeric"
        onChangeText={(text) => setAltura(parseFloat(text))}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          const resultado = calcularIMC(peso, altura);
          Alert.alert('Resultado', resultado);
        }}
      >
        <Text style={styles.buttonText}>Calcular IMC</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  image: {
    width: '90%',
    height: undefined,
    aspectRatio: 3,
    resizeMode: 'contain',
    marginBottom: 20,
    borderRadius: 10,
  },
});