import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../redux/slices/profileSlice/thunks";
import { Container, Grid, Box, Typography } from "@material-ui/core";
import RequestError from "../../components/Common/RequestError.jsx";
import { useRouter } from "next/router";
import LoadingDataComponent from "../../components/Common/LoadingDataComponent";
import ProfilePageUserCollections from "../../components/PagesComponents/ProfilePage/ProfilePageUserCollections";
import ProfilePageUserRecipes from "../../components/PagesComponents/ProfilePage/ProfilePageUserRecipes";
import ProfilePagePersonalInfo from "../../components/PagesComponents/ProfilePage/ProfilePagePersonalInfo";

const Profile = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const {
        profileUserId,
        userName,
        userEmail,
        userRecipes,
        userCollections,
        status,
    } = useSelector((state) => state.profile);
    const { userId } = useSelector((state) => state.authorization);

    useEffect(() => {
        if (id !== null && id !== undefined && profileUserId !== id) dispatch(fetchUserData(id));
    }, [id]);

    switch (status) {
        case "failed": {
            <RequestError retryFunction={() => fetchUserData(id)} />;
            return;
        }
        case "ok": {
            return (
                <>
                    <Container maxWidth="lg">
                        <Grid container>
                            <Grid item xs={12}>
                                <Box pt={3} pb={1}>
                                    <Typography variant="h1">Профиль</Typography>
                                </Box>
                            </Grid>
                            <ProfilePagePersonalInfo
                                id={id}
                                userId={userId}
                                userName={userName}
                                userEmail={userEmail}
                                router={router}
                                dispatch={dispatch}
                            />
                            <ProfilePageUserRecipes
                                userRecipes={userRecipes}
                                id={id}
                                userId={userId}
                                dispatch={dispatch}
                            />
                            <ProfilePageUserCollections
                                userCollections={userCollections}
                                profileUserId={profileUserId}
                                currentUserId={userId}
                                dispatch={dispatch}
                            />
                        </Grid>
                    </Container>
                </>
            );
        }
        case "loading": {
            return <LoadingDataComponent />;
        }
        default: {
            return null;
        }
    }
};

export default Profile;
