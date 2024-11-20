import type { MD3Colors } from 'react-native-paper/lib/typescript/types';

import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useTheme, Text, TextInput, Icon as PaperIcon} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


interface ItemData {
  id: number;
  name: string;
  rating: number;
  difficulty: string;
  duration: string;
}

const DATA: ItemData[] = [
  {
    id: 1,
    name: 'Nalewka z jabłka',
    rating: 5,
    difficulty: 'Łatwe',
    duration: '2 miesiące',
  },
  {
    id: 2,
    name: 'Nalewka z babka',
    rating: 5,
    difficulty: 'Łatwe',
    duration: '2 miesiące',
  },
  {
    id: 3,
    name: 'Nalewka z dziadka',
    rating: 5,
    difficulty: 'Łatwe',
    duration: '2 miesiące',
  },
  {
    id: 4,
    name: 'Nalewka z kawka',
    rating: 5,
    difficulty: 'Łatwe',
    duration: '2 miesiące',
  },
  {
    id: 5,
    name: 'Nalewka z klatka',
    rating: 5,
    difficulty: 'Łatwe',
    duration: '2 miesiące',
  },
];

const SearchView = () => {
  const { colors } = useTheme();

  const style = styles(colors);

  const Item = ({ name, rating, difficulty, duration }: ItemData) => {
    return (
      <View style={style.listItemContainer}>
        <View style={style.listItemImage}></View>
        <View style={style.listItemDescription}>
          <Text style={style.listItemName}>{name}</Text>
          <View style={style.listItemRating}>
            {[...Array(rating).keys()].map((id) => (
                 <Icon key={id} name="star" size={25} color="gold" />
            ))}
          </View>
          <Text style={style.listItemDifficulty}>{difficulty}</Text>
          <Text style={style.listItemDuration}>Czas trwania: {duration}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={style.container}>
      <View style={style.header}>
        <Text style={style.headerText}>Szukaj</Text>
        <TextInput
          mode="outlined"
          left={<PaperIcon source="magnify" size={14} />}
          outlineStyle={style.headerSearchOutline}
          style={style.headerSearch}
          textColor={colors.onBackground}
          placeholder="Search"
          placeholderTextColor="#9586A8"
        />
      </View>
      <FlatList
        style={style.listContainer}
        data={DATA}
        renderItem={({ item }) => <Item {...item} />}
        keyExtractor={(item) => item.id.toString()}
      ></FlatList>
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
      paddingHorizontal: 10,
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
      backgroundColor: 'white',
      flex: 2,
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
  });
};

export default SearchView;
