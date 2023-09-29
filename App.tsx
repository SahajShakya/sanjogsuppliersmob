import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from "react-native";
import { MD3LightTheme, PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { navigationRef } from "./src/RootNavigation";
import AuthNavigation from './src/Navigation/AuthNavigation';
import { AuthProvider } from './src/lib/Requests/AuthContext';


const theme = {
  ...MD3LightTheme, // or MD3DarkTheme
  roundness: 4,
  colors: {
    ...MD3LightTheme.colors,
    background: "#fff",
    primary: "#172882",
    secondary: "e",
    tertiary: "#a1b2c3",
  },
};


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
      <NavigationContainer ref={navigationRef}>
        <QueryClientProvider client={queryClient}>
          <AuthNavigation />
        </QueryClientProvider>
      </NavigationContainer>
      </AuthProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
