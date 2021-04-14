import React, { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersList } from "../redux/slices/userListSlice";

const Authors = () => {
    const dispatch = useDispatch();
    const rating = useSelector((state) => state.usersList);

    useEffect(() => {
        if (rating?.length === 0) {
            dispatch(fetchUsersList());
        }
    }, []);

    return (
        <>
            <h1>Рейтинг авторов</h1>
            <div className="rating">
                {rating?.map(({ _id, name, userRecipes, rating }, i) => {
                    console.log(_id, name, userRecipes, rating);
                    return (
                        <div
                            key={i}
                            style={{
                                padding: "10px",
                                backgroundColor: "lightgray",
                                marginBottom: "10px",
                            }}
                        >
                            <p>№{i + 1}.</p>
                            <Link style={{ color: "blue" }} href={`/profile/${_id}`}>
                                <a>{name}</a>
                            </Link>
                            <p>Количество рецептов пользователя: {userRecipes.length}</p>
                            <p>Средний рейтинг всех рецептов: {rating.average}</p>
                            <p>Общая оценка всех рецептов: {rating.total}</p>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Authors;
