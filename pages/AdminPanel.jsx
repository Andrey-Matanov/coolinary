import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients } from "../actions/ingredientsAction";
import { fetchRecipes } from "../actions/recipesListActions";
import { fetchUnits } from "../actions/unitsActions";
import { clearUsers, fetchUsers } from "../actions/usersActions";
import { fetchCategories } from "../actions/categoriesActions";
import AdminPanelPageList from "../components/PagesComponents/AdminPanelPage/AdminPanelPageList";

const AdminPanel = () => {
    const dispatch = useDispatch();
    const [activeComponent, setActiveComponent] = useState("users");

    useEffect(() => {
        switch (activeComponent) {
            case "users": {
                dispatch(fetchUsers());
                break;
            }
            case "recipes": {
                dispatch(fetchRecipes(1000000, 0));
                break;
            }
            case "ingredients": {
                dispatch(fetchIngredients());
                break;
            }
            case "units": {
                dispatch(fetchUnits());
                break;
            }
            case "categories": {
                dispatch(fetchCategories());
                break;
            }
        }
    }, [activeComponent]);

    return (
        <div style={{ padding: "20px" }}>
            <h1 style={{ marginBottom: "20px" }}>Меню администратора</h1>
            <div>
                <div style={{ display: "flex", marginBottom: "20px" }}>
                    <p>Выбрать список:</p>
                    <div>
                        <button onClick={() => setActiveComponent("users")}>
                            Пользователи
                        </button>
                        <button onClick={() => setActiveComponent("recipes")}>
                            Рецепты
                        </button>
                        <button
                            onClick={() => setActiveComponent("ingredients")}
                        >
                            Ингредиенты
                        </button>
                        <button onClick={() => setActiveComponent("units")}>
                            Единицы измерения
                        </button>
                        <button
                            onClick={() => setActiveComponent("categories")}
                        >
                            Категории
                        </button>
                    </div>
                </div>
            </div>
            {activeComponent === "users" && (
                <AdminPanelPageList
                    type={activeComponent}
                    list={useSelector((state) => state.usersState.users)}
                    clearList={() => dispatch(clearUsers())}
                />
            )}
            {activeComponent === "recipes" && (
                <AdminPanelPageList
                    type={activeComponent}
                    list={useSelector((state) => state.recipesObject.recipes)}
                />
            )}
            {activeComponent === "ingredients" && (
                <AdminPanelPageList
                    type={activeComponent}
                    list={useSelector((state) => state.ingredients)}
                />
            )}
            {activeComponent === "units" && (
                <AdminPanelPageList
                    type={activeComponent}
                    list={useSelector((state) => state.units)}
                />
            )}
            {activeComponent === "categories" && (
                <AdminPanelPageList
                    type={activeComponent}
                    list={useSelector((state) => state.categories)}
                />
            )}
        </div>
    );
};

export default AdminPanel;
