import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";
import { MD3DarkTheme, PaperProvider } from "react-native-paper";

function App() {
  const context = require.context("../app");
  const { theme } = useMaterial3Theme();

  return (
    <PaperProvider theme={{ ...MD3DarkTheme, colors: theme.dark }}>
      <ExpoRoot context={context} />
    </PaperProvider>
  );
}

registerRootComponent(App);
