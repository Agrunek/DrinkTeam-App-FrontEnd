import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, PermissionsAndroid } from 'react-native';
import { TextInput, Button, useTheme, Text } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker'; 
import { useNavigation } from '@react-navigation/native';



const AddRecipeView = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [steps, setSteps] = useState(['']);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const addStep = () => setSteps([...steps, '']);
  const removeStep = () => steps.length > 1 && setSteps(steps.slice(0, -1));
  const updateStep = (index, text) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = text;
    setSteps(updatedSteps);
  };

  console.log('launchImageLibrary:', launchImageLibrary);
  
  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 1,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('Image Picker Error: ', response.errorMessage);
        } else {
          const asset = response.assets ? response.assets[0] : null;
          if (asset && asset.uri) {
            setImage(asset.uri);
          } else {
            console.log('No image selected or invalid response');
          }
        }
      }
    );
  };
  
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 20,
    },
    headerButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    button: {
      width: '48%',
    },
    input: {
      marginBottom: 15,
      backgroundColor: colors.onSecondaryContainer,
    },
    stepsContainer: {
      marginTop: 20,
    },
    stepRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    stepInput: {
      flex: 1,
      marginRight: 10,
    },
    addRemoveButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.headerButtons}>
            <Button
              mode="contained"
              onPress={() => console.log('Remove Recipe')}
              buttonColor="red"
              style={styles.button}
            >
              REMOVE
            </Button>
            <Button
              mode="contained"
              onPress={() => console.log('Save Recipe')}
              buttonColor="green"
              style={styles.button}
            >
              SAVE
            </Button>
          </View>

          <TextInput
            label="Title"
            mode="outlined"
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            textColor={colors.primary}
            placeholder="Add Title"
          />

          <TextInput
            label="Description"
            mode="outlined"
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            textColor={colors.primary}
            placeholder="Add Description"
            multiline
          />

          <TouchableOpacity
            style={styles.input}
            onPress={pickImage}
          >
            <Text style={{ textAlign: 'center', color: colors.onBackground }}>
              {image ? `Selected Image: ${image}` : 'Add image by clicking here'}
            </Text>
          </TouchableOpacity>

          <View style={styles.stepsContainer}>
            <Text style={{ fontSize: 18, marginBottom: 10, color: colors.primary }}>
              Steps
            </Text>

            {steps.map((step, index) => (
              <View key={index} style={styles.stepRow}>
                <TextInput
                  label={`Step ${index + 1}`}
                  mode="outlined"
                  style={styles.stepInput}
                  value={step}
                  onChangeText={(text) => updateStep(index, text)}
                />
              </View>
            ))}

            <View style={styles.addRemoveButtons}>
              <Button
                mode="contained"
                buttonColor="green"
                onPress={addStep}
              >
                ADD STEP
              </Button>

              <Button
                mode="contained"
                buttonColor="red"
                onPress={removeStep}
              >
                REMOVE STEP
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddRecipeView;
