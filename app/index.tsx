import { MaterialIcons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
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

  const [savedItems, setSavedItems] = useState<SavedItem[]>([
    { path: "example" },
    { path: "example2" },
    { path: "example3" },
    { path: "example4" },
    { path: "example4" },
    { path: "example4" },
    { path: "example4" },
  ]);
  const [isScrolled, setIsScrolled] = useState(false);

  const displayItems = useMemo(
    () =>
      savedItems.length % 2 === 0 ? savedItems : [...savedItems, { path: "" }],
    [savedItems]
  );

  const styles = useMemo(() => themedStyles(theme), [theme]);

  const renderItem = (item: SavedItem) => (
    <Card
      key={item.path}
      style={{ ...styles.card, opacity: item.path !== "" ? 1 : 0 }}
    >
      {item.path !== "" && (
        <Card.Content>
          <Text>{item.path}</Text>
        </Card.Content>
      )}
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
      <ScrollView
        style={styles.container}
        onScroll={(e) =>
          e.nativeEvent.contentOffset.y > 0
            ? setIsScrolled(true)
            : setIsScrolled(false)
        }
      >
        <FlatList
          data={displayItems}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item) => item.path}
          numColumns={2}
          columnWrapperStyle={styles.row}
          scrollEnabled={false}
        />
        <Card style={styles.addCard}>
          <Card.Content style={styles.addIcon}>
            <MaterialIcons name="add" size={24} color="white" />
          </Card.Content>
        </Card>
      </ScrollView>
    </>
  );
}

const themedStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      padding: 8,
      backgroundColor: theme.colors.surface,
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
    addCard: {
      flex: 1,
      flexDirection: "row",
      paddingVertical: 8,
      backgroundColor: theme.colors.surface,
      elevation: 0,
      borderColor: theme.colors.onSurfaceVariant,
      borderWidth: 1,
      margin: 8,
      marginBottom: 40,
    },
    addIcon: {
      justifyContent: "center",
    },
  });
