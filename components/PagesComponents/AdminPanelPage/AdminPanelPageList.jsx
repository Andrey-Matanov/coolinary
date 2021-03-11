import React, { useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import styled from "styled-components";

const types = {
    users: {},
};

const ButtonContainer = styled.div`
    border: 1px solid black;
    padding: 10px;
    display: flex;
    justify-content: space-between;
`;

const AdminPanelPageList = ({
    type,
    list,
    clearList = () => {
        console.log("clear list");
    },
}) => {
    useEffect(() => {
        return () => {
            clearList();
        };
    }, []);

    const Row = ({ index, style }) => (
        <ButtonContainer style={style}>
            <p>{list[index].name}</p>
            <button>Удалить</button>
        </ButtonContainer>
    );

    return (
        <List height={150} itemCount={list.length} itemSize={50} width={300}>
            {Row}
        </List>
    );
};

export default AdminPanelPageList;
