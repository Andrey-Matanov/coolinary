import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const AllArticles = ({ articles, users }) => {
    return (
        // <div>
        //     <h1>Все статьи</h1>
        //     {articles.map((article) => {
        //         return (
        //             <div key={article.id}>
        //                 <h3>
        //                     {article.id}. {article.name}
        //                 </h3>
        //                 <p>{article.text}</p>
        //                 <p>
        //                     Автор -{" "}
        //                     <Link
        //                         style={{ color: "blue" }}
        //                         to={`/profile/${article.authorId + 1}`}
        //                     >
        //                         {
        //                             users.find(
        //                                 (user) =>
        //                                     user.id === article.authorId + 1
        //                             ).name
        //                         }
        //                     </Link>
        //                 </p>
        //             </div>
        //         );
        //     })}
        // </div>
        <h1>Статьи временно недоступны</h1>
    );
};

const mapStateToProps = (state) => ({
    // articles: state.articles,
    // users: state.users,
});

export default connect(mapStateToProps)(AllArticles);
