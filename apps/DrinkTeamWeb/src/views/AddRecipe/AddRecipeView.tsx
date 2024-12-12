import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, useTheme, Text } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker'; 
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const AddRecipeView = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [steps, setSteps] = useState([{ name: '', description: '', duration: '' }]);
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '', unit: '' }]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [alcoholContent, setAlcoholContent] = useState('');
  const userId = 1; // Assuming the user ID is known

  const addStep = () => setSteps([...steps, { name: '', description: '', duration: '' }]);
  const removeStep = () => steps.length > 1 && setSteps(steps.slice(0, -1));
  const addIngredient = () => setIngredients([...ingredients, { name: '', quantity: '', unit: '' }]);
  const removeIngredient = () => ingredients.length > 1 && setIngredients(ingredients.slice(0, -1));
  const updateStep = (index, key, text) => {
    const updatedSteps = [...steps];
    updatedSteps[index][key] = text;
    setSteps(updatedSteps);
  };
  const updateIngredient = (index, key, text) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][key] = text;
    setIngredients(updatedIngredients);
  };

  const pickImage = () => {
    launchImageLibrary(
      { mediaType: 'photo', selectionLimit: 1 },
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

  const saveRecipe = async () => {
    try {
      const recipeData = {
        name: title,
        description,
        alcohol_content: parseFloat(alcoholContent) || 0,
        difficulty: parseInt(difficulty, 10) || 1,
        category_id: parseInt(categoryId, 10),
        user_id: userId,
      };

      // const recipeResponse = await axios.post('https://your-backend-url/recipe/add', recipeData);
      // const recipeId = recipeResponse.data.recipe_id; 

      // if (!recipeId) throw new Error('Failed to get recipe ID from response.');
      const recipeId = 0
      const recipeExtraData = {
        recipe_id: 0,
        ingredients: ingredients.map((ingredient, index) => ({
          recipe_id: 0,
          ingredient_id: index + 1,
          name: ingredient.name,
          quantity: parseFloat(ingredient.quantity) || 0,
          unit: ingredient.unit || '',
        })),
        steps: steps.map((step, index) => ({
          name: step.name || `Step ${index + 1}`,
          description: step.description || '',
          step_number: index + 1,
          duration: parseInt(step.duration, 10) || 0,
        })),
      };
      
      console.log(recipeData)
      console.log(recipeExtraData)
      // await axios.post('https://your-backend-url/recipe/recipe_extra/add', recipeExtraData);
      alert('Recipe, ingredients, and steps saved successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error saving recipe:', error);
      alert('Failed to save recipe. Please try again.');
    }
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
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    inputSmall: {
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
              onPress={saveRecipe}
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
            textColor={colors.primary}
            value={title}
            onChangeText={setTitle}
            placeholder="Add Title"
          />

          <TextInput
            label="Description"
            mode="outlined"
            style={styles.input}
            textColor={colors.primary}
            value={description}
            onChangeText={setDescription}
            placeholder="Add Description"
            multiline
          />

          <TextInput
            label="Alcohol Content"
            mode="outlined"
            style={styles.input}
            textColor={colors.primary}
            value={alcoholContent}
            onChangeText={setAlcoholContent}
            placeholder="Alcohol Content (%)"
            keyboardType="numeric"
          />

          <TextInput
            label="Difficulty"
            mode="outlined"
            style={styles.input}
            textColor={colors.primary}
            value={difficulty}
            onChangeText={setDifficulty}
            placeholder="Difficulty (1-5)"
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.input} onPress={pickImage}>
            <Text>{image ? `Selected Image: ${image}` : 'Add image by clicking here'}</Text>
          </TouchableOpacity>

          <Text style={{ fontSize: 18, marginBottom: 10 }}>Ingredients</Text>
          {ingredients.map((ingredient, index) => (
            <View key={index} style={styles.rowContainer}>
              <TextInput
                label="Name"
                style={styles.inputSmall}
                value={ingredient.name}
                onChangeText={(text) => updateIngredient(index, 'name', text)}
              />
              <TextInput
                label="Quantity"
                style={styles.inputSmall}
                value={ingredient.quantity}
                onChangeText={(text) => updateIngredient(index, 'quantity', text)}
                keyboardType="numeric"
              />
              <TextInput
                label="Unit"
                style={styles.inputSmall}
                value={ingredient.unit}
                onChangeText={(text) => updateIngredient(index, 'unit', text)}
              />
            </View>
          ))}
          <View style={styles.addRemoveButtons}>
            <Button onPress={addIngredient} mode="contained">Add Ingredient</Button>
            <Button onPress={removeIngredient} mode="contained" buttonColor="red">Remove Ingredient</Button>
          </View>

          <Text style={{ fontSize: 18, marginBottom: 10 }}>Steps</Text>
          {steps.map((step, index) => (
            <View key={index} style={styles.rowContainer}>
              <TextInput
                label="Name"
                style={styles.inputSmall}
                value={step.name}
                onChangeText={(text) => updateStep(index, 'name', text)}
              />
              <TextInput
                label="Description"
                style={styles.inputSmall}
                value={step.description}
                onChangeText={(text) => updateStep(index, 'description', text)}
              />
              <TextInput
                label="Duration"
                style={styles.inputSmall}
                value={step.duration}
                onChangeText={(text) => updateStep(index, 'duration', text)}
                keyboardType="numeric"
              />
            </View>
          ))}
          <View style={styles.addRemoveButtons}>
            <Button onPress={addStep} mode="contained">Add Step</Button>
            <Button onPress={removeStep} mode="contained" buttonColor="red">Remove Step</Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddRecipeView;
