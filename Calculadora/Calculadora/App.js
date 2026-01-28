import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function Calculadora() {
  const [display, setDisplay] = useState("");

  const presionar = (valor) => {
    if (valor === "C") setDisplay("");
    else if (valor === "=") {
      try {
        setDisplay(eval(display).toString());
      } catch {
        setDisplay("Error");
      }
    } else {
      setDisplay(display + valor);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Calculadora Básica</Text>
      <Text style={styles.display}>{display || "0"}</Text>

      <View style={styles.fila}>
        <View style={styles.boton}><Button title="7" onPress={() => presionar("7")} /></View>
        <View style={styles.boton}><Button title="8" onPress={() => presionar("8")} /></View>
        <View style={styles.boton}><Button title="9" onPress={() => presionar("9")} /></View>
        <View style={styles.boton}><Button title="/" onPress={() => presionar("/")} /></View>
      </View>

      <View style={styles.fila}>
        <View style={styles.boton}><Button title="4" onPress={() => presionar("4")} /></View>
        <View style={styles.boton}><Button title="5" onPress={() => presionar("5")} /></View>
        <View style={styles.boton}><Button title="6" onPress={() => presionar("6")} /></View>
        <View style={styles.boton}><Button title="*" onPress={() => presionar("*")} /></View>
      </View>

      <View style={styles.fila}>
        <View style={styles.boton}><Button title="1" onPress={() => presionar("1")} /></View>
        <View style={styles.boton}><Button title="2" onPress={() => presionar("2")} /></View>
        <View style={styles.boton}><Button title="3" onPress={() => presionar("3")} /></View>
        <View style={styles.boton}><Button title="-" onPress={() => presionar("-")} /></View>
      </View>

      <View style={styles.fila}>
        <View style={styles.boton}><Button title="0" onPress={() => presionar("0")} /></View>
        <View style={styles.boton}><Button title="C" onPress={() => presionar("C")} /></View>
        <View style={styles.boton}><Button title="=" onPress={() => presionar("=")} /></View>
        <View style={styles.boton}><Button title="+" onPress={() => presionar("+")} /></View>
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
  },
  titulo: {
    fontSize: 26,
    marginBottom: 20,
    fontWeight: "bold",
  },
  display: {
    fontSize: 40,
    marginBottom: 20,
    backgroundColor: "#e0e0e0",
    padding: 15,
    borderRadius: 5,
    width: "80%",
    textAlign: "right",
  },
  fila: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginVertical: 8,
  },
  boton: {
    flex: 1,
    marginHorizontal: 5,
    height: 65,
    justifyContent: "center",
  },
});