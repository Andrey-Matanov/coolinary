export const ADD_ARTICLE = "@@articles/ADD_ARTICLE";

export const addArticle = (article) => ({
    type: ADD_ARTICLE,
    payload: {
        article,
    },
});
