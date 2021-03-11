import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import styled from "styled-components";
import { addArticle } from "../../actions/articlesActions";
// import { updateUserArticlesIds } from "../../actions/usersActions";

const AddArticleForm = styled.form`
    width: 500px;
`;

const FormItem = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;

    &:last-child {
        margin-bottom: 0;
    }
`;

const FormInput = styled.input`
    flex-basis: 100%;
`;

const FormTextarea = styled.textarea`
    flex-basis: 100%;
    min-height: 500px;
`;

const AddArticleFormik = ({ id }) => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            name: "",
            text: "",
        },
        onSubmit: ({ name, text }) => {
            const newArticleId = "" + id;
            const newArticle = {
                id: newArticleId,
                name,
                text,
            };

            dispatch(updateUserArticlesIds(newArticleId));
            dispatch(addArticle(newArticle));
        },
    });

    return (
        <AddArticleForm onSubmit={formik.handleSubmit}>
            <FormItem>
                <label htmlFor="name">Название</label>
                <FormInput
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    name="name"
                    type="text"
                    id="name"
                />
            </FormItem>
            <FormItem>
                <label htmlFor="text">Текст статьи</label>
                <FormTextarea
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    name="text"
                    id="text"
                />
            </FormItem>
            <FormItem>
                <button type="submit">Добавить рецепт</button>
            </FormItem>
        </AddArticleForm>
    );
};

export default AddArticleFormik;
