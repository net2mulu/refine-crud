import { 
    Refine,
    GitHubBanner, 
    WelcomePage,
    Authenticated, 
} from '@refinedev/core';
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

    import { AuthPage,ErrorComponent
,notificationProvider
,RefineThemes
,ThemedLayoutV2} from '@refinedev/mantine';

import { MantineProvider, Global, ColorSchemeProvider, ColorScheme } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { useLocalStorage } from "@mantine/hooks";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import routerBindings, { NavigateToResource, CatchAllNavigate, UnsavedChangesNotifier, DocumentTitleHandler } from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { Header } from "./components/header";





function App() {
    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
                key: "mantine-color-scheme",
                defaultValue: "light",
                getInitialValueInEffect: true,
            });

    const toggleColorScheme = (value?: ColorScheme) =>
                setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
    
    return (
        <BrowserRouter>
        <GitHubBanner />
        <RefineKbarProvider>
            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
{/* You can change the theme colors here. example: theme={{ ...RefineThemes.Magenta, colorScheme:colorScheme }} */}
<MantineProvider theme={{ ...RefineThemes.Blue, colorScheme:colorScheme }} withNormalizeCSS withGlobalStyles>
<Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />
<NotificationsProvider position="top-right">
            <DevtoolsProvider>
                <Refine notificationProvider={notificationProvider}
routerProvider={routerBindings}
dataProvider={dataProvider("https://api.fake-rest.refine.dev")} 
                    options={{
                        syncWithLocation: true,
                        warnWhenUnsavedChanges: true,
                            projectId: "WTbyY4-W38V4X-x1SSeq",
                         
                    }}
                >


                        <Routes>
                            <Route index element={<WelcomePage />} />
                        </Routes>
                    <RefineKbar />
                    <UnsavedChangesNotifier />
                    <DocumentTitleHandler />
                </Refine>
                <DevtoolsPanel />
            </DevtoolsProvider>
            </NotificationsProvider>

</MantineProvider>

</ColorSchemeProvider>
        </RefineKbarProvider>
        </BrowserRouter>
      );
};

export default App;
