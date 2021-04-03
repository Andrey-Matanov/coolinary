const admin = require("firebase-admin/app");

const serviceAccount = {
    type: "service_account",
    project_id: process.env.projectId,
    private_key_id: process.env.private_key_id,
    private_key: process.env.private_key,
    client_email: process.env.client_email,
    client_id: process.env.client_id,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: process.client_x509_cert_url,
};

const config = {
    credential: admin.credential.cert(serviceAccount),
};

const adminFirebaseApp =
    admin.apps?.length > 0 ? admin.apps[0] : admin.initializeApp(config, "admin");

export default adminFirebaseApp;
