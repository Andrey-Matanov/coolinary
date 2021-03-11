import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BasicLayout from "../components/Layouts/BasicLayout";
import { fetchCategories2 } from "../redux/reducers/rootReducer";

const index = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories2);

    useEffect(() => {
        dispatch(fetchCategories2());
    }, []);

    useEffect(() => {
        console.log(categories);
    }, [categories]);

    return (
        <BasicLayout>
            <h1>Главная страница</h1>
        </BasicLayout>
    );
};

export default index;
