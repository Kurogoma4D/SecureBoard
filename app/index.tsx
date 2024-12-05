import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet } from "react-native";
import {
  Appbar,
  Card,
  MD3Theme,
  Snackbar,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import uuid from "react-native-uuid";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { MMKV } from "react-native-mmkv";

type SavedItem = {
  path: string;
};

const storage = new MMKV();

const STORAGE_KEY = "savedItems";

export default function Index() {
  const theme = useTheme();

  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const displayItems = useMemo(
    () =>
      savedItems.length % 2 === 0 ? savedItems : [...savedItems, { path: "" }],
    [savedItems]
  );

  const styles = useMemo(() => themedStyles(theme), [theme]);

  useEffect(() => {
    (async () => {
      await initializeFolder();

      const storedItems = storage.getString(STORAGE_KEY);
      if (storedItems) {
        setSavedItems(JSON.parse(storedItems));
      }
    })();
  }, []);

  const renderItem = (item: SavedItem) => (
    <Card
      key={item.path}
      style={{ ...styles.card, opacity: item.path !== "" ? 1 : 0 }}
    >
      {item.path !== "" && (
        <Image
          source={{ uri: item.path }}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 10,
          }}
        />
      )}
    </Card>
  );

  const pickAndSave = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setSnackBarMessage("Image saving...");
      const baseUri = result.assets[0].uri;
      const extension = baseUri.split(".").pop();

      const key = uuid.v4();
      const newUri = `${PHOTOS_FOLDER}/${key}.${extension}`;
      await FileSystem.copyAsync({ from: baseUri, to: newUri });

      const newItem = { path: newUri };
      const items = [...savedItems, newItem];
      setSavedItems((_) => items);
      setSnackBarMessage("Image saved!");
      storage.set(STORAGE_KEY, JSON.stringify(items));
    }
  };

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
          <TouchableRipple onPress={pickAndSave}>
            <Card.Content style={styles.addCardContent}>
              <MaterialIcons
                name="add"
                size={24}
                color="white"
                style={styles.addIcon}
              />
            </Card.Content>
          </TouchableRipple>
        </Card>
      </ScrollView>
      <Snackbar
        visible={snackBarMessage !== ""}
        onDismiss={() => setSnackBarMessage("")}
      >
        {snackBarMessage}
      </Snackbar>
    </>
  );
}

export const PHOTOS_FOLDER = `${FileSystem.documentDirectory || ""}photos`;

async function initializeFolder() {
  const info = await FileSystem.getInfoAsync(PHOTOS_FOLDER);

  if (info.exists) {
    return Promise.resolve();
  }

  return await FileSystem.makeDirectoryAsync(PHOTOS_FOLDER, {
    intermediates: true,
  });
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
      backgroundColor: theme.colors.surface,
      elevation: 0,
      borderColor: theme.colors.onSurfaceVariant,
      borderWidth: 1,
      margin: 8,
      marginBottom: 40,
    },
    addCardContent: {
      paddingVertical: 16,
      minWidth: "100%",
      alignItems: "center",
    },
    addIcon: {
      aspectRatio: 1,
    },
  });
