import type { MD3Colors } from 'react-native-paper/lib/typescript/types';

import React from 'react';
import {
  Image,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useTheme, Text, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSearch } from '../../middleware/queries';
import { useNavigation } from '@react-navigation/native';
import { mapTimeToText } from '../../utils/time';

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

interface ItemData {
  id: number;
  name: string;
  rating: number;
  difficulty: string;
  duration: number;
  image: string;
}

const SearchView = () => {
  const { colors } = useTheme();
  const { data, isLoading } = useSearch<ItemDataAPI[]>();
  const navigation = useNavigation();

  const style = styles(colors);

  const translateData = (raw: ItemDataAPI[]) => {
    if (!raw) return [];

    return raw.map((api) => ({
      id: api.recipe_id,
      name: api.name,
      rating: Math.floor(api.average_rating || 0),
      difficulty: {
        1: 'Banalne',
        2: 'Łatwe',
        3: 'Średnie',
        4: 'Trudne',
        5: 'Ekstremalne',
      }[api.difficulty],
      duration: api.preparation_time || 0,
      image: api.image_url,
    }));
  };

  const Item = ({
    id,
    name,
    rating,
    difficulty,
    duration,
    image,
  }: ItemData) => {
    return (
      <TouchableOpacity
        style={style.listItemContainer}
        onPress={() => {
          console.log(data?.find((item) => item.recipe_id === id));
          navigation.navigate(
            'Recipe',
            data?.find((item) => item.recipe_id === id)
          );
        }}
      >
        <View style={style.listItemImage}>
          <Image style={{ height: '100%' }} source={{ uri: image }} />
        </View>
        <View style={style.listItemDescription}>
          <Text style={style.listItemName}>{name}</Text>
          <View style={style.listItemRating}>
            {[...Array(rating).keys()].map((id) => (
              <Icon key={id} name="star" size={25} color="gold" />
            ))}
          </View>
          <Text style={style.listItemDifficulty}>{difficulty}</Text>
          <Text style={style.listItemDuration}>
            Czas trwania: {mapTimeToText(duration)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={style.container}>
      <View style={style.header}>
        <Text style={style.headerText}>Szukaj</Text>
        <TextInput
          mode="outlined"
          left={<TextInput.Icon icon="magnify" color="#FFFFFF" />}
          outlineStyle={style.headerSearchOutline}
          style={style.headerSearch}
          textColor={colors.onBackground}
          placeholder="Search"
          placeholderTextColor="#9586A8"
        />
      </View>
      {isLoading ? (
        <Text style={style.headerText}>LOADING...</Text>
      ) : (
        <FlatList
          style={style.listContainer}
          data={translateData(data)}
          renderItem={({ item }) => <Item {...item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
      <TouchableOpacity
        style={style.addButton}
        onPress={() => navigation.navigate('addRecipe')}
      >
        <Text style={style.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = (colors: MD3Colors) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      marginHorizontal: 20,
      marginTop: 40,
      marginBottom: 30,
      gap: 20,
    },
    headerText: {
      fontSize: 30,
      color: colors.onBackground,
    },
    headerSearch: {
      backgroundColor: '#23232C',
      fontSize: 14,
      height: 50,
    },
    headerSearchOutline: {
      borderRadius: 99999,
      borderColor: '#9586A8',
    },
    listContainer: {
      padding: 20,
      paddingTop: 0,
    },
    listItemContainer: {
      borderWidth: 2,
      borderColor: '#9586A8',
      borderRadius: 20,
      backgroundColor: '#23232C',
      flexDirection: 'row',
      overflow: 'hidden',
      marginVertical: 10,
    },
    listItemImage: {
      flex: 2,
      overflow: 'hidden',
    },
    listItemDescription: {
      flex: 3,
      paddingHorizontal: 10,
      paddingVertical: 10,
      gap: 5,
    },
    listItemName: {
      color: '#9586A8',
      fontSize: 16,
    },
    listItemRating: {
      flexDirection: 'row',
      gap: 10,
      marginVertical: 5,
    },
    listItemDifficulty: {
      color: '#0BCE83',
    },
    listItemDuration: {
      color: '#FFFFFF',
      fontSize: 12,
    },
    addButton: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
    },
    addButtonText: {
      color: '#FFFFFF',
      fontSize: 24,
      fontWeight: 'bold',
    },
  });
};

export default SearchView;
