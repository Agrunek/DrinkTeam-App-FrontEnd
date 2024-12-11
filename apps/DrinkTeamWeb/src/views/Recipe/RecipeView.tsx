import type { MD3Colors } from 'react-native-paper/lib/typescript/types';

import React, { useState, useContext } from 'react';
import { Image, StyleSheet, View, ScrollView } from 'react-native';
import { useTheme, Button, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useExtra } from '../../middleware/queries';
import { mapTimeToText } from '../../utils/time';
import NotificationContext from '../../context/NotificationContext';

interface ItemDataAPI {
  recipe_id: number;
  name: string;
  image_url: string;
  preparation_time: number;
  creation_time: string;
  last_modified: string;
  description: string;
  alcohol_content: number;
  average_rating: number;
  number_of_reviews: number;
  difficulty: number;
  category: {
    category_id: number;
    name: string;
    description: string;
  };
  user: {
    user_id: number;
    username: string;
    email: string;
    date_of_birth: string;
    creation_date: string;
  };
}

interface ItemExtraAPI {
  ingredients: {
    ingredient: {
      ingredient_id: number;
      name: string;
      type: string;
    };
    quantity: number;
    unit: string;
  }[];
  steps: {
    step: {
      name: string;
      description: string;
      step_number: number;
      duration: number;
    };
  }[];
}

interface ItemData {
  id: string;
  name: string;
  description: string;
  rating: number;
  votes: number;
  difficulty: string;
  duration: number;
  image: string;
  ingredients: {
    name: string;
    quantity: number;
    unit: string;
  }[];
  steps: {
    name: string;
    description: string;
    duration: number;
  }[];
  currentStep: number;
}

const RecipeView = ({ route }) => {
  const { scheduleNotification, cancelNotification } =
    useContext(NotificationContext);
  const { colors } = useTheme();
  const [inProgress, setInProgress] = useState(false);
  const data = route.params as ItemDataAPI;
  const { data: extra } = useExtra<ItemExtraAPI>(data?.recipe_id || -1);

  const style = styles(colors);

  const recipe = {
    id: data?.recipe_id.toString() || '-1',
    name: data?.name || 'Loading...',
    description: data?.description || 'Loading...',
    rating: Math.floor(data?.average_rating || 0),
    votes: data?.number_of_reviews,
    difficulty: {
      1: 'Banalne',
      2: 'Łatwe',
      3: 'Średnie',
      4: 'Trudne',
      5: 'Ekstremalne',
    }[data?.difficulty || 0],
    image: data?.image_url,
    ingredients:
      extra?.ingredients?.map((item) => ({
        name: item.ingredient.name,
        quantity: item.quantity,
        unit: item.unit,
      })) || [],
    steps:
      extra?.steps?.map((item) => ({
        name: item.step.name,
        description: item.step.description,
        duration: item.step.duration,
      })) || [],
    duration: data?.preparation_time,
    currentStep: 0,
  } as ItemData;

  const [currentStep, setCurrentStep] = useState(recipe.currentStep);

  return (
    <View style={style.container}>
      <View style={style.backgroundImage}>
        <Image style={{ height: '100%' }} source={{ uri: recipe.image }} />
      </View>
      <View style={style.body}>
        {inProgress ? (
          <>
            <ScrollView style={style.inProgressContent}>
              <View style={style.inProgressHeader}>
                <Text
                  style={style.inProgressName}
                  adjustsFontSizeToFit={true}
                  numberOfLines={1}
                >
                  {recipe.name}
                </Text>
                <Text
                  style={style.inProgressDescription}
                  adjustsFontSizeToFit={true}
                  numberOfLines={2}
                >
                  {recipe.description}
                </Text>
              </View>
              {recipe.steps?.map((step, index) => (
                <View
                  key={index}
                  style={{
                    ...style.inProgressContentItem,
                    backgroundColor:
                      index === currentStep ? '#23232C' : 'transparent',
                  }}
                >
                  <View style={style.inProgressContentItemIndex}>
                    <Text
                      style={style.inProgressContentItemIndexText}
                      adjustsFontSizeToFit={true}
                      numberOfLines={1}
                    >
                      {index + 1}
                    </Text>
                  </View>
                  <View style={style.inProgressContentItemDescription}>
                    <Text style={style.inProgressContentItemDescriptionText}>
                      {step.description}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
            <View style={style.options}>
              <Button
                style={style.backButton}
                labelStyle={style.backButtonText}
                onPress={() => {
                  if (currentStep === 0) {
                    cancelNotification(recipe.id);
                    setInProgress(false);
                  } else {
                    setCurrentStep((prev) => {
                      const newStep = prev - 1;
                      scheduleNotification(
                        recipe.id,
                        recipe.steps[newStep]?.duration || 10,
                        'Here comes a next step...',
                        recipe.steps[newStep + 1]?.name || 'We are done!'
                      );
                      return newStep;
                    });
                  }
                }}
              >
                BACK
              </Button>
              <Button
                style={style.startButton}
                labelStyle={style.startButtonText}
                onPress={() => {
                  setCurrentStep((prev) => {
                    const newStep = prev + 1;
                    scheduleNotification(
                      recipe.id,
                      recipe.steps[newStep]?.duration || 10,
                      'Here comes a next step...',
                      recipe.steps[newStep + 1]?.name || 'We are done!'
                    );
                    return newStep;
                  });
                }}
              >
                NEXT STEP
              </Button>
            </View>
          </>
        ) : (
          <>
            <ScrollView>
              <View style={style.header}>
                <Text style={style.headerTitle}>{recipe.name}</Text>
                <View style={style.headerRating}>
                  {[...Array(recipe.rating).keys()]?.map((id) => (
                    <Icon key={id} name="star" size={25} color="gold" />
                  ))}
                  <Text style={style.headerVotes}>({recipe.votes})</Text>
                </View>
                <Text style={style.headerDifficulty}>{recipe.difficulty}</Text>
                <Text style={style.headerDuration}>
                  Czas trwania: {mapTimeToText(recipe.duration)}
                </Text>
              </View>
              <View style={style.ingredients}>
                <Text style={style.ingredientsTitle}>Potrzebne składniki</Text>
                <View style={style.ingredientsContent}>
                  {recipe.ingredients?.map((ingredient, index) => (
                    <Text style={style.ingredientsContentText} key={index}>
                      {'\u2022'}{' '}
                      {`${ingredient.name} ${ingredient.quantity} ${ingredient.unit}`}
                    </Text>
                  ))}
                </View>
              </View>
              <View style={style.steps}>
                <Text style={style.stepsTitle}>Kroki</Text>
                <View style={style.stepsContent}>
                  {recipe.steps?.map((step, index) => (
                    <Text style={style.stepsContentText} key={index}>
                      {index + 1}. {step.name}
                    </Text>
                  ))}
                </View>
              </View>
            </ScrollView>
            <View style={style.options}>
              <Button style={style.followButton}>
                <Icon name="cards-heart" size={20} />
              </Button>
              <Button
                style={style.startButton}
                labelStyle={style.startButtonText}
                onPress={() => {
                  scheduleNotification(
                    recipe.id,
                    recipe.steps[currentStep]?.duration || 10,
                    'Here comes a next step...',
                    recipe.steps[currentStep]?.name ||
                      'No description provided...'
                  );
                  setInProgress(true);
                }}
              >
                START
              </Button>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = (colors: MD3Colors) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
    },
    backgroundImage: {
      position: 'absolute',
      height: 300,
      width: '100%',
    },
    body: {
      flex: 1,
      backgroundColor: colors.background,
      marginTop: 250,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      gap: 25,
      paddingVertical: 50,
    },
    header: {
      marginHorizontal: 20,
    },
    headerTitle: {
      color: '#FFFFFF',
      fontSize: 30,
      fontWeight: 'bold',
    },
    headerRating: {
      flexDirection: 'row',
      gap: 10,
      marginTop: 10,
    },
    headerVotes: {
      color: '#9586A8',
    },
    headerDifficulty: {
      fontSize: 24,
      color: '#0BCE83',
      marginVertical: 5,
    },
    headerDuration: {
      color: '#FFFFFF',
      fontSize: 18,
    },
    ingredients: {
      marginHorizontal: 20,
      flex: 1,
      marginVertical: 15,
    },
    ingredientsTitle: {
      color: '#FFFFFF',
      fontSize: 24,
      marginVertical: 10,
      fontWeight: 'bold',
    },
    ingredientsContent: {
      flex: 1,
      paddingLeft: 20,
      gap: 5,
    },
    ingredientsContentText: {
      color: '#FFFFFF',
      fontSize: 18,
    },
    steps: {
      marginHorizontal: 20,
      flex: 1,
    },
    stepsTitle: {
      color: '#FFFFFF',
      fontSize: 24,
      marginVertical: 10,
      fontWeight: 'bold',
    },
    stepsContent: {
      flex: 1,
      paddingLeft: 20,
      gap: 5,
    },
    stepsContentText: {
      color: '#FFFFFF',
      fontSize: 18,
    },
    inProgressHeader: {
      gap: 10,
      marginHorizontal: 20,
      marginBottom: 20,
    },
    inProgressContent: {},
    inProgressName: {
      color: '#FFABB6',
      textAlign: 'center',
      fontSize: 30,
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    inProgressDescription: {
      color: '#9586A8',
      textAlign: 'center',
      fontSize: 24,
    },
    inProgressContentItem: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingVertical: 10,
      gap: 20,
    },
    inProgressContentItemIndex: {
      width: 40,
      height: 40,
      padding: 3,
      borderWidth: 2,
      borderRadius: 99999,
      borderColor: '#9586A8',
      alignSelf: 'center',
    },
    inProgressContentItemIndexText: {
      color: '#9586A8',
      fontSize: 99999,
      textAlign: 'center',
    },
    inProgressContentItemDescription: {
      flex: 1,
    },
    inProgressContentItemDescriptionText: {
      color: '#9586A8',
      fontSize: 16,
    },
    options: {
      marginHorizontal: 20,
      flexDirection: 'row',
      height: 60,
      gap: 20,
    },
    followButton: {
      backgroundColor: '#23232C',
      borderWidth: 2,
      borderColor: '#9586A8',
      borderRadius: 10,
      width: 80,
      justifyContent: 'center',
    },
    backButton: {
      backgroundColor: '#C21518',
      borderRadius: 10,
      width: 80,
      justifyContent: 'center',
    },
    backButtonText: {
      fontSize: 16,
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
    startButton: {
      flex: 1,
      backgroundColor: '#0BCE83',
      borderRadius: 10,
      justifyContent: 'center',
    },
    startButtonText: {
      fontSize: 16,
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
  });
};

export default RecipeView;
