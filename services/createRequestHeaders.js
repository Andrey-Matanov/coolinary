import firebaseApp from "../utils/firebaseConfig";

const createRequestHeaders = async () => {
    const user = firebaseApp.auth().currentUser;
    const token = user && (await user.getIdToken());
    const payloadHeader = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    return payloadHeader;
};

export default createRequestHeaders;
