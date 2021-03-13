import { wrapper } from "../redux/store";
import Head from "next/head";
import { AuthProvider } from "../components/Common/Authentication";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { green, lightGreen } from "@material-ui/core/colors";

import "../styles/globals.css";
import BasicLayout from "../components/Layouts/BasicLayout";

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
            <AuthProvider>
                <ThemeProvider theme={theme}>
                    <BasicLayout>
                        <Component {...pageProps} />
                    </BasicLayout>
                </ThemeProvider>
            </AuthProvider>
        </>
    );
}

export default wrapper.withRedux(MyApp);
