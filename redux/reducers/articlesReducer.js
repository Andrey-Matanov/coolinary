import { ADD_ARTICLE } from "../actions/articlesActions.js";

const articlesList = [
    {
        id: "1",
        name: "Польза авокадо",
        authorId: 2,
        text:
            "Авокадо широко используется в кулинарии при готовке холодных закусок. Является неотъемлемой частью вегетарианской кухни и лидером среди продуктов против старения. Мягкий и сочный авокадо сейчас ценят во всем мире за его полезные свойства, он способствует похуданию и расщепляет избыток холестерина в крови. Этот экзотический плод улучшает память и уменьшает риск сердечно-сосудистых заболеваний. В Мексике его используют в качестве афродизиака, считают, что авокадо обладают возбуждающим эффектом, но это далеко не все достоинства этого плода.",
        rating: 16,
        commentaries: [
            {
                id: 1,
                authorId: 3,
                text: "Полезно!",
            },
        ],
    },
];

export const articlesListReducer = (articles = articlesList, action) => {
    switch (action.type) {
        case ADD_ARTICLE: {
            return [
                ...articles,
                {
                    id: "" + (articles.length + 1),
                    ...action.payload.article,
                    authorId: 0,
                    rating: 0,
                    commentaries: [],
                },
            ];
        }
        default: {
            return articles;
        }
    }
};
