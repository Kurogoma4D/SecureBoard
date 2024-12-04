import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
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

  const [savedLength, setSavedLength] = useState(3);
  const [savedItems, setSavedItems] = useState<SavedItem[]>([
    { path: "example" },
    { path: "example2" },
    { path: "example3" },
  ]);

  const renderItem = (item: SavedItem) => (
    <Card
      key={item.path}
      style={{
        flex: 1,
        backgroundColor: theme.colors.surfaceVariant,
        elevation: 0,
        borderColor: theme.colors.onSurfaceVariant,
        borderWidth: 1,
        margin: 8,
      }}
    >
      <Card.Content>
        <Text>{item.path}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Secure Board" />
        <Appbar.Action icon="note-text-outline" onPress={() => {}} />
      </Appbar.Header>
      <View style={styles(theme).container}>
        <View style={styles(theme).list}>
          {savedItems.map((item) => renderItem(item))}
        </View>
      </View>
    </>
  );
}

const styles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      padding: 8,
      flex: 1,
      justifyContent: "center",
      backgroundColor: theme.colors.surface,
    },
    list: {
      display: "flex",
      alignContent: "stretch",
      flexDirection: "row",
    },
    row: {
      justifyContent: "flex-start",
    },
    text: {
      color: theme.colors.onSurface,
      backgroundColor: theme.colors.scrim,
    },
  });
