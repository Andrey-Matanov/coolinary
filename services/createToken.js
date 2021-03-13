import firebaseApp from "../utils/firebaseConfig";

const createToken = async () => {
    const user = firebaseApp.auth().currentUser;
    const token = user && (await user.getIdToken());

    return token;
};

export default createToken;
