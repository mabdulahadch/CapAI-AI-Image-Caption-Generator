// import { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   ActivityIndicator,
//   Platform,
//   ScrollView,
// } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { MaterialIcons } from '@expo/vector-icons';
// import generateImageCaption from '../../app/utils/gemini';

// export default function CaptionGenerator() {
//   const [image, setImage] = useState<string | null>(null);
//   const [caption, setCaption] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const pickImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//       base64: true,
//     });

//     if (!result.canceled && result.assets[0].base64) {
//       setImage(result.assets[0].uri);
//       setCaption(null);
//       generateCaption(result.assets[0].base64);
//     }
//   };

//   const takePhoto = async () => {
//     const { status } = await ImagePicker.requestCameraPermissionsAsync();
//     if (status !== 'granted') {
//       alert('Sorry, we need camera permissions to make this work!');
//       return;
//     }

//     const result = await ImagePicker.launchCameraAsync({
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//       base64: true,
//     });

//     if (!result.canceled && result.assets[0].base64) {
//       setImage(result.assets[0].uri);
//       setCaption(null);
//       generateCaption(result.assets[0].base64);
//     }
//   };

//   const generateCaption = async (base64Image: string) => {
//     setLoading(true);
//     try {
//       const captionText = await generateImageCaption(base64Image);
//       setCaption(captionText);
//     } catch (error) {
//       console.error('Error generating caption:', error);
//       setCaption('Error generating caption. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {!image ? (
//         <View style={styles.uploadContainer}>
//           <Text style={styles.title}>AI Image Caption Generator</Text>
//           <Text style={styles.subtitle}>
//             Take a photo or upload an image to generate an AI-powered caption
//           </Text>
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity
//               style={styles.button}
//               onPress={takePhoto}
//               disabled={Platform.OS === 'web'}
//             >
//               <MaterialIcons name="camera-alt" size={24} color="#2196f3" />
//               <Text style={styles.buttonText}>Take Photo</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.button} onPress={pickImage}>
//               <MaterialIcons name="photo-library" size={24} color="#2196f3" />
//               <Text style={styles.buttonText}>Upload Image</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       ) : (

//           <View style={styles.resultContainer}>
//             <Image source={{ uri: image }} style={styles.image} />
//             <ScrollView contentContainerStyle={styles.scrollContainer}>
//             <View style={styles.captionContainer}>
//               {loading ? (
//                 <ActivityIndicator size="large" color="#2196f3" />
//               ) : (
//                 <>
//                   <Text style={styles.captionTitle}>Generated Caption:</Text>
//                   <Text style={styles.caption}>{caption}</Text>
//                 </>
//               )}
//             </View>
//             </ScrollView>

//             <TouchableOpacity
//               style={styles.newImageButton}
//               onPress={() => {
//                 setImage(null);
//                 setCaption(null);
//               }}
//             >
//               <Text style={styles.newImageButtonText}>
//                 Generate New Caption
//               </Text>
//             </TouchableOpacity>
//           </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   scrollContainer: {
//     flexGrow: 0,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//   },
//   uploadContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#2196f3',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#64b5f6',
//     textAlign: 'center',
//     marginBottom: 30,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     gap: 20,
//   },
//   button: {
//     backgroundColor: '#e3f2fd',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     minWidth: 120,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     gap: 10,
//     borderWidth: 1,
//     borderColor: '#bbdefb',
//   },
//   buttonText: {
//     color: '#2196f3',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   resultContainer: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//   },
//   image: {
//     width: '100%',
//     height: '50%',
//     resizeMode: 'contain',
//   },
//   captionContainer: {
//     backgroundColor: '#ffffff',
//     padding: 20,
//     margin: 16,
//     borderRadius: 12,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   captionTitle: {
//     color: '#2196f3',
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   caption: {
//     color: '#333',
//     fontSize: 16,
//     lineHeight: 24,
//   },
//   newImageButton: {
//     margin: 16,
//     backgroundColor: '#2196f3',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   newImageButtonText: {
//     color: '#ffffff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

'use client';

import { useState } from 'react';
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
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import generateImageCaption from '../../app/utils/gemini';
import { LinearGradient } from 'expo-linear-gradient';

export default function CaptionGenerator() {
  const [image, setImage] = useState<string | null>(null);
  const [caption, setCaption] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
      setCaption(null);
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
      setCaption(null);
      generateCaption(result.assets[0].base64);
    }
  };

  const generateCaption = async (base64Image: string) => {
    setLoading(true);
    try {
      const captionText = await generateImageCaption(base64Image);
      setCaption(captionText);
    } catch (error) {
      console.error('Error generating caption:', error);
      setCaption('Error generating caption. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#ffffff', '#ffffff', '#ffffff']}
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
                  <ActivityIndicator size="large" color="#392b6a" />
                ) : (
                  <>
                    <Text style={styles.captionTitle}>Generated Caption:</Text>
                    <Text style={styles.caption}>{caption}</Text>
                  </>
                )}
              </View>
              <TouchableOpacity
                style={styles.newImageButton}
                onPress={() => {
                  setImage(null);
                  setCaption(null);
                }}
              >
                <Ionicons name="logo-closed-captioning" size={26} color="#392b6a" />
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#392b6a',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(57,43,106, 0.6)',
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  button: {
    backgroundColor: 'rgba(57,43,106, 0.2)',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    minWidth: 140,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  buttonText: {
    color: '#392b6a',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 12,
    marginBottom: 16,
    borderColor: 'rgba(57,43,106,0.4)',
    borderWidth: 1, // Set border width
    shadowColor: '#000', // Shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  captionContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)', // Slightly increased opacity for better contrast
    padding: 20,
    borderRadius: 12, // Slightly increased for smoother corners
    borderWidth: 1, // Added a light border
    borderColor: 'rgba(57,43,106,0.4)', // Light gray border for subtle separation
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  captionTitle: {
    color: '#392b6a',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  caption: {
    color: '#333',
    fontSize: 16,
    lineHeight: 24,
  },

  newImageButton: {
    marginTop: 16,
    backgroundColor: 'rgba(57,43,106, 0.2)',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 140,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    borderColor: 'rgba(57,43,106,0.4)',
    borderWidth: 1,
    shadowColor: "#000",

  },
  

  newImageButtonText: {
    color: '#392b6a',
    fontSize: 16,
    fontWeight: '600',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
