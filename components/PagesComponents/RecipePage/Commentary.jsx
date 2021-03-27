import React, { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/Cancel";
import { deleteCommentary, editCommentary } from "../../../redux/actions/recipesListActions";

const Commentary = ({ currentUserId, commentaryId, authorId, authorName, content }) => {
    const dispatch = useDispatch();
    const [isCommentaryEditing, setIsCommentaryEditing] = useState(false);
    const [newContent, setNewContent] = useState(content);
    const [error, setError] = useState(null);

    const errors = {
        empty: "Комментарий не может быть пустым",
        equal: "Новый комментарий должен отличаться от старого. Попробуйте еще раз",
    };

    return isCommentaryEditing ? (
        <Grid container>
            <Grid item xs={12}>
                <Box py={1}>
                    <Typography>Редактирование комментария</Typography>
                </Box>
            </Grid>

            <Grid item xs={12}>
                <Box py={1}>
                    <TextField
                        multiline
                        rowsMax={3}
                        color="primary"
                        variant="filled"
                        value={newContent}
                        onChange={(e) => {
                            const newContent = e.target.value;

                            if (newContent?.length == 0) {
                                setError(errors.empty);
                            } else if (newContent === content) {
                                setError(errors.equal);
                            } else {
                                setError(null);
                            }

                            setNewContent(newContent);
                        }}
                        error={Boolean(error)}
                        helperText={error !== null && error}
                    />
                </Box>
            </Grid>

            <Grid item xs={12}>
                <Box py={1}>
                    <ButtonGroup
                        variant="contained"
                        color="primary"
                        aria-label="contained primary button group"
                    >
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<EditIcon />}
                            onClick={() => {
                                if (error !== errors.equal && newContent === content) {
                                    setError(errors.equal);
                                } else if (error === null) {
                                    dispatch(editCommentary(commentaryId, newContent));
                                    setIsCommentaryEditing(false);
                                }
                            }}
                        >
                            Сохранить
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<CancelIcon />}
                            onClick={() => {
                                setIsCommentaryEditing(false);
                                setError(null);
                            }}
                        >
                            Отмена
                        </Button>
                    </ButtonGroup>
                </Box>
            </Grid>
        </Grid>
    ) : (
        <Grid container>
            <Grid item xs={12}>
                <Box py={1}>
                    <Link href={`/profile/${authorId}`}>
                        <a>
                            <Typography variant="body1">{authorName}</Typography>
                        </a>
                    </Link>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box py={1}>
                    <Typography variant="body2">{content}</Typography>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box py={1}>
                    {currentUserId === authorId ? (
                        <ButtonGroup
                            variant="contained"
                            color="primary"
                            aria-label="contained primary button group"
                        >
                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<EditIcon />}
                                onClick={() => {
                                    setIsCommentaryEditing(true);
                                }}
                            >
                                Редактировать
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<DeleteIcon />}
                                onClick={() => {
                                    dispatch(deleteCommentary(commentaryId));
                                }}
                            >
                                Удалить
                            </Button>
                        </ButtonGroup>
                    ) : null}
                </Box>
            </Grid>
        </Grid>
    );
};

export default Commentary;
