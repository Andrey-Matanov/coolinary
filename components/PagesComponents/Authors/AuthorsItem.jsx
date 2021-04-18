import React from "react";
import Link from "next/link";
import { Link as LinkMUI } from "@material-ui/core";
import { Box, Paper, Typography, Grid, ListItemAvatar, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    link: {
        cursor: "pointer",
        textDecoration: "none",
    },
}));

const AuthorItem = ({ position, id, name, avatar, recipesCount, rating }) => {
    const classes = useStyles();

    return (
        <Box my={0} ml={"auto"} mr={"auto"} width="100%">
            <Paper elevation={3} square={true}>
                <Box p={4}>
                    <Grid container direction="row" alignItems="center" spacing={2}>
                        <Grid item>
                            <Typography variant="h6">№{position}</Typography>
                        </Grid>
                        <Grid item>
                            <ListItemAvatar>
                                <Avatar alt={`Avatar ${name}`} src={avatar} />
                            </ListItemAvatar>
                        </Grid>
                        <Grid item>
                            <Link href={`/profile/${id}`}>
                                <LinkMUI className={classes.link}>{name}</LinkMUI>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2">
                                Количество рецептов пользователя: {recipesCount}
                            </Typography>
                            <Typography variant="body2">
                                Средний рейтинг всех рецептов: {rating.average}
                            </Typography>
                            <Typography variant="body2">
                                Общая оценка всех рецептов: {rating.total}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Box>
    );
};

export default AuthorItem;
