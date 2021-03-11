import React from 'react';
import { connect } from 'react-redux';
import AddArticleForm from '../components/Forms/AddArticleForm';

const AddArticle = ({ articlesLength }) => {
    return (
        <div>
            <h1>Добавить статью</h1>
            <AddArticleForm id={articlesLength + 1} />
        </div>
    );
};

const mapStateToProps = (state) => ({
    articlesLength: state.articles.length,
});

export default connect(mapStateToProps)(AddArticle);
