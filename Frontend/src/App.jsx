import { AppShell } from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Dashboard from "./components/SignComp/Dashboard";
import AutherenticationPage from "./pages/AutherenticationPage";
import HomePage from "./pages/HomePage";

export default function App() {
    return (
        <AppShell
            padding="md"
            navbar={<NavBar></NavBar>}
            styles={(theme) => ({
                main: {
                    padding: 0,
                    backgroundColor:
                        theme.colorScheme === "dark"
                            ? theme.colors.dark[8]
                            : theme.colors.gray[0],
                },
            })}
        >
            <Routes>
                <Route path="/" element={<HomePage></HomePage>}></Route>
                <Route
                    path="/auth/signin"
                    element={<AutherenticationPage />}
                ></Route>
                <Route path="/dashboard" element={<Dashboard />}></Route>
            </Routes>
        </AppShell>
    );
}
