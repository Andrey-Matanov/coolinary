import React, { useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window";
import {
    Button,
    Card,
    CardContent,
    makeStyles,
    fade,
    TextField,
    Typography,
} from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(3),
            width: "auto",
        },
    },
    searchIcon: {
        left: "-25px",
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
}));

const AddRecipeFormIngredient = ({
    currentNumber,
    currentId,
    currentName,
    currentAmount,
    unitId,
    ingredients,
    units,
    usedIngredients,
    recipeNutrition,
    setRecipeNutrition,
    errors,
    touched,
    setFieldValue,
    handleBlur,
}) => {
    const classes = useStyles();

    const [searchedIngredientsArray, setSearchedIngredientsArray] = useState([]);
    const [searchedIngredient, setSearchedIngredient] = useState("");
    const [lastNumberAmount, setLastNumberAmount] = useState(null);

    useEffect(() => {
        console.log(currentName, " rerender");
    });

    useEffect(() => {
        setLastNumberAmount(currentAmount);
    }, []);

    useEffect(() => {
        setSearchedIngredientsArray(ingredients);
    }, [ingredients]);

    useEffect(() => {
        const regex = new RegExp(`[а-яА-Я]*${searchedIngredient.toLowerCase()}[а-яА-Я]*`);

        setSearchedIngredientsArray(
            ingredients.filter((ingredient) => regex.test(ingredient.name.toLowerCase()))
        );
    }, [searchedIngredient]);

    const Ingredient = ({ index, style }) => {
        const isCurrent = searchedIngredientsArray[index]._id === currentId;
        const isDisabled =
            usedIngredients.some(
                (ingredient) => ingredient.id === searchedIngredientsArray[index]._id
            ) && searchedIngredientsArray[index]._id !== currentId;

        return (
            <button
                disabled={isDisabled}
                onClick={() => {
                    const oldIngredient = ingredients.find(
                        (ingredient) => ingredient._id === currentId
                    );
                    const newIngredient = ingredients.find(
                        (ingredient) => ingredient._id === searchedIngredientsArray[index]._id
                    );
                    const calories = Number(
                        (
                            recipeNutrition.calories +
                            (currentAmount * (newIngredient.calories - oldIngredient.calories)) /
                                100
                        ).toFixed(2)
                    );
                    const proteins = Number(
                        (
                            recipeNutrition.proteins +
                            (currentAmount * (newIngredient.protein - oldIngredient.protein)) / 100
                        ).toFixed(2)
                    );
                    const fat = Number(
                        (
                            recipeNutrition.fat +
                            (currentAmount * (newIngredient.fat - oldIngredient.fat)) / 100
                        ).toFixed(2)
                    );
                    const carbs = Number(
                        (
                            recipeNutrition.carbs +
                            (currentAmount * (newIngredient.carb - oldIngredient.carb)) / 100
                        ).toFixed(2)
                    );

                    setRecipeNutrition({
                        calories: calories,
                        proteins: proteins,
                        fat: fat,
                        carbs: carbs,
                    });

                    setFieldValue(
                        `ingredients[${currentNumber}].id`,
                        searchedIngredientsArray[index]._id
                    );
                }}
                type="button"
                style={{
                    ...style,
                    color: isCurrent ? "green" : isDisabled ? "lightray" : "black",
                }}
            >
                {searchedIngredientsArray[index].name}
            </button>
        );
    };

    return (
        <Card variant="outlined" style={{ marginBottom: "10px" }}>
            <CardContent>
                <Typography variant="body1" color="primary" style={{ marginBottom: "10px" }}>
                    Выбранный ингредиент: {currentName}
                </Typography>

                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon color="primary" />
                    </div>
                    <InputBase
                        placeholder="Поиск ингредиента"
                        value={searchedIngredient}
                        onChange={(e) => setSearchedIngredient(e.target.value)}
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ "aria-label": "search" }}
                    />
                </div>

                <div>
                    <List
                        height={150}
                        itemCount={searchedIngredientsArray.length}
                        itemSize={35}
                        width={300}
                    >
                        {Ingredient}
                    </List>
                </div>
                <div>
                    <TextField
                        fullwidth="true"
                        type="number"
                        id={`ingredients[${currentNumber}].amount`}
                        name={`ingredients[${currentNumber}].amount`}
                        label={`Количество(${units.find((unit) => unit._id === unitId).name[3]})`}
                        value={currentAmount}
                        onChange={(e) => {
                            const value = e.target.value;

                            if (!isNaN(value) && value >= 0) {
                                const ingredient = ingredients.find(
                                    (ingredient) => ingredient._id === currentId
                                );
                                const calories = Number(
                                    (
                                        recipeNutrition.calories +
                                        ((e.target.value - lastNumberAmount) *
                                            ingredient.calories) /
                                            100
                                    ).toFixed(2)
                                );
                                const proteins = Number(
                                    (
                                        recipeNutrition.proteins +
                                        ((e.target.value - lastNumberAmount) * ingredient.protein) /
                                            100
                                    ).toFixed(2)
                                );
                                const fat = Number(
                                    (
                                        recipeNutrition.fat +
                                        ((e.target.value - lastNumberAmount) * ingredient.fat) / 100
                                    ).toFixed(2)
                                );
                                const carbs = Number(
                                    (
                                        recipeNutrition.carbs +
                                        ((e.target.value - lastNumberAmount) * ingredient.carb) /
                                            100
                                    ).toFixed(2)
                                );

                                setLastNumberAmount(Number(e.target.value));

                                setRecipeNutrition({
                                    calories: calories,
                                    proteins: proteins,
                                    fat: fat,
                                    carbs: carbs,
                                });
                            }

                            setFieldValue(`ingredients[${currentNumber}].amount`, value);
                        }}
                        onBlur={handleBlur}
                        error={
                            typeof touched === "object" &&
                            touched[currentNumber]?.amount &&
                            typeof errors === "object" &&
                            Boolean(errors[currentNumber]?.amount)
                        }
                        helperText={
                            typeof touched === "object" &&
                            touched[currentNumber]?.amount &&
                            errors?.[currentNumber]?.amount
                        }
                    />
                </div>
                <Button
                    color="primary"
                    variant="contained"
                    type="button"
                    onClick={() => {
                        const ingredient = ingredients.find(
                            (ingredient) => ingredient._id === currentId
                        );
                        const calories = Number(
                            (
                                recipeNutrition.calories -
                                (currentAmount * ingredient.calories) / 100
                            ).toFixed(2)
                        );
                        const proteins = Number(
                            (
                                recipeNutrition.proteins -
                                (currentAmount * ingredient.protein) / 100
                            ).toFixed(2)
                        );
                        const fat = Number(
                            (recipeNutrition.fat - (currentAmount * ingredient.fat) / 100).toFixed(
                                2
                            )
                        );
                        const carbs = Number(
                            (
                                recipeNutrition.carbs -
                                (currentAmount * ingredient.carb) / 100
                            ).toFixed(2)
                        );

                        setRecipeNutrition({
                            calories: calories,
                            proteins: proteins,
                            fat: fat,
                            carbs: carbs,
                        });

                        setFieldValue(
                            "ingredients",
                            [...usedIngredients].filter((ingredient) => ingredient.id !== currentId)
                        );
                    }}
                >
                    Удалить текущий ингрендиент
                </Button>
            </CardContent>
        </Card>
    );
};

export default AddRecipeFormIngredient;
