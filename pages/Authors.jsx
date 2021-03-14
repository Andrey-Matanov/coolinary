import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { fetchRating } from "../redux/actions/ratingActions.js";

const Authors = () => {
    const dispatch = useDispatch();
    const rating = useSelector((state) => state.rating);

    useEffect(() => {
        dispatch(fetchRating());
    }, []);

    return (
        <>
            <h1>Рейтинг авторов</h1>
            <div className="rating">
                {rating.map(({ id, name, count, avg, summ }, i) => (
                    <div
                        key={i}
                        style={{
                            padding: "10px",
                            backgroundColor: "lightgray",
                            marginBottom: "10px",
                        }}
                    >
                        <p>№{i + 1}.</p>
                        <Link style={{ color: "blue" }} href={`/profile/${id}`}>
                            <a>{name}</a>
                        </Link>
                        <p>Количество рецептов пользователя: {count}</p>
                        <p>Средний рейтинг всех рецептов: {avg}</p>
                        <p>Общая оценка всех рецептов: {summ}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Authors;
