import { Text, View } from "react-native";
import { Appbar, useTheme } from "react-native-paper";

export default function Index() {
  const theme = useTheme();
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Secure Board" />
        <Appbar.Action icon="note-text-outline" onPress={() => {}} />
      </Appbar.Header>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.surface,
        }}
      >
        <Text
          style={{
            color: theme.colors.onSurface,
          }}
        >
          Edit app/index.tsx to edit this screen.
        </Text>
      </View>
    </>
  );
}
