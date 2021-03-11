import React from "react";
import Link from "next/link";
import BasicLayout from "../components/Layouts/BasicLayout";

const Error404 = () => {
    return (
        <BasicLayout>
            <h1>Такой страницы не существует!</h1>
            <Link href="/">Назад на главную</Link>
        </BasicLayout>
    );
};

export default Error404;
