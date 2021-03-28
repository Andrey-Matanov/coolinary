import { wrapper } from "../redux/store";
import Head from "next/head";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { green, lightGreen } from "@material-ui/core/colors";
import { AuthProvider } from "../providers/Authentication";
import BasicLayout from "../components/Layouts/BasicLayout";
import "../styles/globals.css";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: green[500],
        },
        secondary: {
            main: lightGreen[500],
        },
    },
});

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Coolinary Website</title>
            </Head>
            <ThemeProvider theme={theme}>
                <AuthProvider>
                    <BasicLayout>
                        <Component {...pageProps} />
                    </BasicLayout>
                </AuthProvider>
            </ThemeProvider>
        </>
    );
}

export default wrapper.withRedux(MyApp);
