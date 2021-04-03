import { wrapper } from "../redux/store";
import Head from "next/head";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { green, lightGreen } from "@material-ui/core/colors";
import { AuthProvider } from "../providers/Authentication";
import BasicLayout from "../components/Layouts/BasicLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: green[500],
        },
        secondary: {
            main: lightGreen[500],
        },
        error: {
            main: "#f44336",
        },
    },
});

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                />
                <title>Coolinary Website</title>
            </Head>
            <ThemeProvider theme={theme}>
                <AuthProvider>
                    <BasicLayout>
                        <Component {...pageProps} />
                        <ToastContainer
                            pauseOnHover={false}
                            position={toast.POSITION.BOTTOM_RIGHT}
                        />
                    </BasicLayout>
                </AuthProvider>
            </ThemeProvider>
        </>
    );
}

export default wrapper.withRedux(MyApp);
