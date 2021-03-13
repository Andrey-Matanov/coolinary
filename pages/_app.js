import { wrapper } from "../redux/store";
import Head from "next/head";
import { AuthProvider } from "../components/Common/Authentication";
import "../styles/globals.css";
import BasicLayout from "../components/Layouts/BasicLayout";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Coolinary Website</title>
            </Head>
            <AuthProvider>
                <BasicLayout>
                    <Component {...pageProps} />
                </BasicLayout>
            </AuthProvider>
        </>
    );
}

export default wrapper.withRedux(MyApp);
