import adminFirebaseApp from "../utils/adminFirebaseConfig";

const decodeIDToken = (handler) => async (req, res) => {
    const header = req.headers?.authorization;

    if (header) {
        if (header !== "Bearer null" && req.headers?.authorization?.startsWith("Bearer ")) {
            const idToken = req.headers.authorization.split("Bearer ")[1];

            try {
                const decodedToken = await adminFirebaseApp.auth().verifyIdToken(idToken);
                console.log("decodedToken: ", decodedToken);
                req["currentUser"] = decodedToken;

                return handler(req, res);
            } catch (err) {
                res.status(400).send("Wrong Token");
            }
        }
    } else {
        res.status(403).send("Access is restricted for unauthorized users");
    }
};

export default decodeIDToken;
