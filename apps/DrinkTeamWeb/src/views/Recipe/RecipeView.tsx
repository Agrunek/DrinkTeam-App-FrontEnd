import type { MD3Colors } from 'react-native-paper/lib/typescript/types';

import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useTheme, Button, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ItemData {
  name: string;
  description: string;
  rating: number;
  votes: number;
  difficulty: string;
  duration: string;
  ingredients: string[];
  steps: string[];
  currentStep: number;
}

const DATA: ItemData = {
  name: 'Nalewka z jabłka',
  description:
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas, a!',
  rating: 5,
  votes: 26,
  difficulty: 'Łatwe',
  duration: '2 miesiące',
  ingredients: [
    'First ingredient',
    'Second ingredient',
    'Third ingredient',
    'Fourth ingredient',
    'Fifth ingredient',
  ],
  steps: [
    'First step. Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, quaerat nemo. Quisquam, nulla quo laboriosam saepe voluptate natus illum amet molestias autem odio excepturi nihil tempore similique earum beatae aut commodi debitis omnis maxime sint expedita! At eveniet nesciunt, eligendi exercitationem harum autem perspiciatis iusto, ea, fugiat quas aut repellendus.',
    'Second step.',
    'Third step.',
    'Fourth step.',
    'Fifth step.',
  ],
  currentStep: 2,
};

const RecipeView = () => {
  const { colors } = useTheme();
  const [inProgress, setInProgress] = useState(false);
  const [currentStep, setCurrentStep] = useState(DATA.currentStep);

  const style = styles(colors);

  return (
    <View style={style.container}>
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
                  {DATA.name}
                </Text>
                <Text
                  style={style.inProgressDescription}
                  adjustsFontSizeToFit={true}
                  numberOfLines={2}
                >
                  {DATA.description}
                </Text>
              </View>
              {DATA.steps.map((description, index) => (
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
                      {description}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
            <View style={style.options}>
              <Button
                style={style.backButton}
                labelStyle={style.backButtonText}
                onPress={() => setInProgress(false)}
              >
                BACK
              </Button>
              <Button
                style={style.startButton}
                labelStyle={style.startButtonText}
                onPress={() => setCurrentStep((prev) => prev + 1)}
              >
                NEXT STEP
              </Button>
            </View>
          </>
        ) : (
          <>
            <ScrollView>
              <View style={style.header}>
                <Text style={style.headerTitle}>{DATA.name}</Text>
                <View style={style.headerRating}>
                  {[...Array(DATA.rating).keys()].map((id) => (
                    <Icon key={id} name="star" size={25} color="gold" />
                  ))}
                  <Text style={style.headerVotes}>({DATA.votes})</Text>
                </View>
                <Text style={style.headerDifficulty}>{DATA.difficulty}</Text>
                <Text style={style.headerDuration}>
                  Czas trwania: {DATA.duration}
                </Text>
              </View>
              <View style={style.ingredients}>
                <Text style={style.ingredientsTitle}>Potrzebne składniki</Text>
                <View style={style.ingredientsContent}>
                  {DATA.ingredients.map((ingredient, index) => (
                    <Text style={style.ingredientsContentText} key={index}>
                      {'\u2022'} {ingredient}
                    </Text>
                  ))}
                </View>
              </View>
              <View style={style.steps}>
                <Text style={style.stepsTitle}>Kroki</Text>
                <View style={style.stepsContent}>
                  {DATA.steps.map((step, index) => (
                    <Text style={style.stepsContentText} key={index}>
                      {index + 1}. {step}
                    </Text>
                  ))}
                </View>
              </View>
            </ScrollView>
            <View style={style.options}>
              <Button style={style.followButton}>{'<3'}</Button>
              <Button
                style={style.startButton}
                labelStyle={style.startButtonText}
                onPress={() => setInProgress(true)}
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
      backgroundColor: 'white',
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
