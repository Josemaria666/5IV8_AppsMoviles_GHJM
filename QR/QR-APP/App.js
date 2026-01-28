import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  TextInput,
} from 'react-native';
import { auth } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [user, setUser] = useState(null);

  const handleScan = ({ data }) => {
    setScannedData(data);
    setScanning(false);
  };

  const registrar = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setMensaje('Usuario creado');
        setUser(auth.currentUser);
      })
      .catch((e) => setMensaje(e.message));
  };

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setMensaje('Usuario logueado');
        setUser(auth.currentUser);
      })
      .catch((e) => setMensaje(e.message));
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        setScannedData(null);
        setMensaje('');
        setEmail('');
        setPassword('');
        setScanning(false);
      })
      .catch((e) => setMensaje(e.message));
  };

  const copyToClipboard = () => {
    if (scannedData) {
      Clipboard.setString(scannedData);
    }
  }

  const goToLink = async () => {
    if (!scannedData) return;
    try {
      const url = scannedData;
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        alert('No se puede abrir este enlace');
      }
    } catch (e) {
      alert('Error al abrir el enlace');
    }
  };

  return (
    <View style={styles.container}>
      {!user ? (
        <>
          <Text style={styles.title}>Iniciar sesión</Text>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#999"
            onChangeText={setEmail}
            value={email}
            style={styles.TextInput}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
            onChangeText={setPassword}
            value={password}
            style={styles.TextInput}
          />

          <TouchableOpacity onPress={registrar} style={styles.Button}>
            <Text style={{ color: 'white' }}>Registrar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={login} style={styles.Button}>
            <Text style={{ color: 'white' }}>Login</Text>
          </TouchableOpacity>

          <Text style={styles.message}>{mensaje}</Text>
        </>
      ) : scannedData ? (
        <>
          <Text style={styles.title}>Resultado del Escaneo</Text>
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>{scannedData}</Text>
          </View>
          <TouchableOpacity style={styles.buttonPrimary} onPress={goToLink}>
            <Text style={styles.buttonText}>Abrir enlace</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonPrimary} onPress={copyToClipboard}>
            <Text style={styles.buttonText}>Copiar enlace</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonPrimary} onPress={() => { setScannedData(null); setScanning(true); }}>
            <Text style={styles.buttonText}>Escanear de nuevo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonPrimary, { marginTop: 6 }]} onPress={logout}>
            <Text style={styles.buttonText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.title}>Escanear Código QR</Text>
          {!permission ? (
            <View />
          ) : !permission.granted ? (
            <View style={styles.center}>
              <Text style={styles.infoText}>Necesitas permitir acceso a la cámara</Text>
              <TouchableOpacity style={styles.buttonPrimary} onPress={requestPermission}>
                <Text style={styles.buttonText}>Dar permiso</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.buttonPrimary, { marginTop: 6 }]} onPress={logout}>
                <Text style={styles.buttonText}>Cerrar sesión</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <CameraView
                style={styles.camera}
                onBarcodeScanned={scanning ? handleScan : undefined}
                barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
              />
              <Text style={styles.infoText}>Apunta hacia un código QR</Text>

              {!scanning && (
                <TouchableOpacity
                  style={[styles.Button, { alignSelf: 'center', marginTop: 12 }]}
                  onPress={() => { setScannedData(null); setScanning(true); }}
                >
                  <Text style={{ color: 'white' }}>Escanear</Text>
                </TouchableOpacity>
              )}

              {scanning && (
                <TouchableOpacity style={[styles.buttonPrimary, { marginTop: 6 }]} onPress={() => setScanning(false)}>
                  <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity style={[styles.buttonPrimary, { marginTop: 6 }]} onPress={logout}>
                <Text style={styles.buttonText}>Cerrar sesión</Text>
              </TouchableOpacity>
            </>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    padding: 24,
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#212121',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#F5F5F5',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoText: {
    color: '#bbbbbb',
    textAlign: 'center',
    marginTop: 15,
    fontSize: 16,
  },
  camera: {
    height: 350,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#000',
  },
  resultBox: {
    padding: 20,
    backgroundColor: '#333',
    borderRadius: 12,
    borderColor: '#555',
    borderWidth: 1,
    marginBottom: 15,
  },
  resultText: {
    color: '#fff',
    fontSize: 17,
    textAlign: 'center',
  },
  buttonPrimary: {
    backgroundColor: '#505050',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
  },
  TextInput: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  Button: {
    backgroundColor: '#505050',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  message: {
    color: '#ff6666',
    textAlign: 'center',
    marginTop: 10,
  },
});