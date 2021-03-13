import React from "react";
import Link from "next/link";

const Error404 = () => {
    return (
        <>
            <h1>Такой страницы не существует!</h1>
            <Link href="/">Назад на главную</Link>
        </>
    );
};

export default Error404;
