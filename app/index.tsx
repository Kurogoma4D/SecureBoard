import { Text, View } from "react-native";
import { useTheme } from "react-native-paper";

export default function Index() {
  const theme = useTheme();
  return (
    <>
      {/* AppBarを追加する */}
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
