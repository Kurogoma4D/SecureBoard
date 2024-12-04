import { useState } from "react";
import { FlatList, StyleSheet, Text, View, ScrollView } from "react-native";
import {
  Appbar,
  Card,
  MD3Theme,
  ThemeBase,
  useTheme,
} from "react-native-paper";

type SavedItem = {
  path: string;
};

export default function Index() {
  const theme = useTheme();

  const [savedLength, setSavedLength] = useState(7);
  const [savedItems, setSavedItems] = useState<SavedItem[]>([
    { path: "example" },
    { path: "example2" },
    { path: "example3" },
    { path: "example4" },
    { path: "example5" },
    { path: "example6" },
    { path: "example7" },
  ]);
  const [isScrolled, setIsScrolled] = useState(false);

  const renderItem = (item: SavedItem) => (
    <Card key={item.path} style={styles(theme).card}>
      <Card.Content>
        <Text>{item.path}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <>
      <Appbar.Header
        style={{
          backgroundColor: isScrolled
            ? theme.colors.surfaceVariant
            : theme.colors.surface,
        }}
      >
        <Appbar.Content title="Secure Board" />
        <Appbar.Action icon="note-text-outline" onPress={() => {}} />
      </Appbar.Header>
      <FlatList
        style={styles(theme).container}
        data={savedItems}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={(item) => item.path}
        numColumns={2}
        columnWrapperStyle={styles(theme).row}
        onScroll={(e) =>
          e.nativeEvent.contentOffset.y > 0
            ? setIsScrolled(true)
            : setIsScrolled(false)
        }
      />
    </>
  );
}

const styles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      padding: 8,
      backgroundColor: theme.colors.surface,
    },
    list: {
      display: "flex",
      alignContent: "stretch",
      flexDirection: "row",
    },
    row: {
      justifyContent: "space-between",
    },
    card: {
      flex: 1,
      aspectRatio: 1,
      backgroundColor: theme.colors.scrim,
      elevation: 0,
      borderColor: theme.colors.onSurfaceVariant,
      borderWidth: 1,
      margin: 8,
    },
  });
