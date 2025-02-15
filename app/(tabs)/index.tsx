'use client';

import { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  ScrollView,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Animated,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import generateImageCaption from '../../app/utils/gemini';
import { LinearGradient } from 'expo-linear-gradient';
import {
  useFonts,
  Outfit_400Regular,
  Outfit_700Bold,
} from '@expo-google-fonts/outfit';

export default function CaptionGenerator() {
  const [image, setImage] = useState<string | null>(null);
  const [captions, setCaptions] = useState<{ caption: string; style: string }[]>([]);
  const [loading, setLoading] = useState(false);

  let [fontsLoaded] = useFonts({
    Caveat_Regular: Outfit_400Regular,
    Caveat_Bold: Outfit_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10 }}>Loading Fonts...</Text>
      </View>
    );
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled && result.assets[0].base64) {
      setImage(result.assets[0].uri);
      setCaptions([]);
      generateCaption(result.assets[0].base64);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled && result.assets[0].base64) {
      setImage(result.assets[0].uri);
      setCaptions([]);
      generateCaption(result.assets[0].base64);
    }
  };

  const generateCaption = async (base64Image: string) => {
    setLoading(true);
    try {
      const responseText = await generateImageCaption(base64Image);

      // Clean the response string
      const cleanedResponse = responseText
        .replace(/```json/g, '') // Remove ```json
        .replace(/```/g, '') // Remove ```
        .trim(); // Remove leading/trailing whitespace

      console.log('Cleaned Response:', cleanedResponse);

      // Parse the cleaned JSON string
      const parsedResponse = JSON.parse(cleanedResponse);

      // Ensure the parsed response has the expected structure
      if (parsedResponse && Array.isArray(parsedResponse.captions)) {
        setCaptions(parsedResponse.captions);
      } else {
        console.error('Invalid response structure:', parsedResponse);
        setCaptions([]);
      }
    } catch (error) {
      console.error('Error generating caption:', error);
      setCaptions([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={[
          'rgba(218, 213, 235, 0.1)',
          'rgba(218, 213, 235, 0.1)',
          'rgba(218, 213, 235, 0.1)',
        ]}
        style={styles.gradient}
      >
        {!image ? (
          <View style={styles.uploadContainer}>
            <Text style={styles.title}>AI Image Caption Generator</Text>
            <Text style={styles.subtitle}>
              Take a photo or upload an image to generate an AI-powered caption
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={takePhoto}
                disabled={Platform.OS === 'web'}
              >
                <Ionicons name="camera" size={24} color="#392b6a" />
                <Text style={styles.buttonText}>Take Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Ionicons name="images" size={24} color="#392b6a" />
                <Text style={styles.buttonText}>Upload Image</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.resultContainer}>
              <Image source={{ uri: image }} style={styles.image} />
              <View style={styles.captionContainer}>
                {loading ? (
                  <ActivityIndicator size="large" color="rgba(57,43,106,0.9)" />
                ) : (
                  captions.map((item, index) => (
                    <View key={index} style={styles.captionBlock}>
                      <Text style={styles.captionStyle}>{item.style}</Text>
                      <Text style={styles.caption}>{item.caption}</Text>
                    </View>
                  ))
                )}
              </View>
              <TouchableOpacity
                style={styles.newImageButton}
                onPress={() => {
                  setImage(null);
                  setCaptions([]);
                }}
              >
                <Ionicons
                  name="logo-closed-captioning"
                  size={24}
                  color="#ffffff"
                />
                <Text style={styles.newImageButtonText}>
                  Generate New Caption
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  captionStyle: {
    fontSize: 14,
    color: '#392b6a',
    marginTop: 1,
    fontFamily: 'Caveat_Bold',
    textAlign: 'center',
    marginBottom: 2,
  },
  captionBlock: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'rgba(218, 213, 235, 0.9)',
    borderRadius: 3,
  },
  caption: {
    color: '#392b6a',
    fontSize: 16,
    lineHeight: 30,
    fontFamily: 'Caveat_Regular',
  },
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  uploadContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    color: '#392b6a',
    marginBottom: 20,
    fontFamily: 'Caveat_Bold',
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(57,43,106, 0.7)',
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'Caveat_Regular',
  },
  designedBy: {
    fontSize: 16,
    color: '#392b6a',
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Caveat_Bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  button: {
    backgroundColor: 'rgba(57,43,106, 0.2)',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    minWidth: 140,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  buttonText: {
    color: '#392b6a',
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Caveat_Bold',
  },
  resultContainer: {
    flex: 1,
    padding: 12,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  captionContainer: {
    borderRadius: 5,
  },
  newImageButton: {
    marginTop: 10,
    backgroundColor: 'rgba(57,43,106, 1)',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    minWidth: 140,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: 'rgba(57,43,106,1)',
  },
  newImageButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    fontFamily: 'Caveat_Bold',
  },
});