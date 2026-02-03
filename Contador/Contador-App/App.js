import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Contador() {
  const [contador, setContador] = useState(0);

  const incrementar = () => setContador(contador + 1);
  const decrementar = () => setContador(contador - 1);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Contador en React Native</Text>
      <Text style={styles.numero}>{contador}</Text>
      <View style={styles.botones}>
        <TouchableOpacity style={styles.boton} onPress={incrementar}>
          <Text style={styles.textoBoton}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.boton, styles.botonSecundario]} onPress={decrementar}>
          <Text style={styles.textoBoton}>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5", 
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  numero: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#ff6b81", 
    marginBottom: 30,
  },
  botones: {
    flexDirection: "row",
    width: "60%",
    justifyContent: "space-around",
  },
  boton: {
    backgroundColor: "#6c5ce7", 
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 4,
    elevation: 5,
  },
  botonSecundario: {
    backgroundColor: "#ff7675", 
  },
  textoBoton: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
});