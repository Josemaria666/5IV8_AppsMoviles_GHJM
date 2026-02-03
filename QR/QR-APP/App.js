import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Sharing from 'expo-sharing';
import { useRef, useState } from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [scanned, setScanned] = useState(false); // Estado para controlar el escaneo

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.infoText}>Necesitas permitir acceso a la cámara</Text>
        <TouchableOpacity style={styles.buttonPrimary} onPress={requestPermission}>
          <Text style={styles.buttonText}>Dar permiso</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Función que se activa al detectar un QR
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    Alert.alert(
      "Código detectado",
      `Tipo: ${type}\nContenido: ${data}`,
      [{ text: "OK", onPress: () => setScanned(false) }]
    );
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      const result = await cameraRef.current.takePictureAsync();
      setPhoto(result.uri);
    }
  };

  const sharePhoto = async () => {
    if (photo) {
      await Sharing.shareAsync(photo);
    }
  };

  const handleLogin = () => {
    alert(`Usuario: ${username}\nContraseña: ${password}`);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Cámara y Lector QR</Text>

        {photo ? (
          <>
            <Image source={{ uri: photo }} style={styles.photo} />
            <TouchableOpacity style={styles.buttonSecondary} onPress={() => setPhoto(null)}>
              <Text style={styles.buttonText}>Tomar otra</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonPrimary} onPress={sharePhoto}>
              <Text style={styles.buttonText}>Compartir foto</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <CameraView 
              ref={cameraRef} 
              style={styles.camera}
              /* Configuración para QR */
              barcodeScannerSettings={{
                barcodeTypes: ["qr"],
              }}
              onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            />
            <TouchableOpacity style={styles.buttonPrimary} onPress={takePhoto}>
              <Text style={styles.buttonText}>Tomar foto</Text>
            </TouchableOpacity>
          </>
        )}

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Usuario"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.buttonPrimary} onPress={handleLogin}>
          <Text style={styles.buttonText}>Aceptar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ... (Mismos estilos que tenías)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#212121' },
  scroll: { flexGrow: 1, padding: 24, justifyContent: 'center' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#212121' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#F5F5F5', marginBottom: 20, textAlign: 'center' },
  infoText: { fontSize: 16, color: '#bbbbbb', marginBottom: 16, textAlign: 'center' },
  camera: { height: 300, borderRadius: 18, overflow: 'hidden', marginBottom: 18 },
  photo: { height: 300, borderRadius: 18, marginBottom: 18 },
  inputWrapper: { marginVertical: 8 },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 10, fontSize: 16 },
  buttonPrimary: { backgroundColor: '#505050', padding: 15, borderRadius: 10, marginVertical: 5 },
  buttonSecondary: { backgroundColor: '#7f7f7f', padding: 15, borderRadius: 10, marginVertical: 5 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});