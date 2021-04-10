import React, { useState, useEffect } from "react";
import Head from "next/head";
import Router from "next/router";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { addRecipe, editRecipe } from "../../../redux/slices/recipesListSlice.js";
import AddRecipeFormStep from "./AddRecipeFormStep";
import AddRecipeFormIngredient from "./AddRecipeFormIngredient";
import AddImageField from "./AddImageField";
import {
    Button,
    Card,
    CardHeader,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@material-ui/core";
import AddRecipeNutrition from "./AddRecipeNutrition";

const Error = styled.div`
    color: red;
`;

const FormItem = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;

    &:last-child {
        margin-bottom: 0;
    }
`;

const AddRecipeFormik = ({
    ingredients,
    categories,
    units,
    formInitialValues,
    authorId,
    submitButtonLabel,
    additionalInfo,
}) => {
    const dispatch = useDispatch();
    console.log("formInitialValues: ", formInitialValues);

    const [recipeNutrition, setRecipeNutrition] = useState({
        calories: 0,
        proteins: 0,
        fat: 0,
        carbs: 0,
    });

    useEffect(() => {
        if (formInitialValues.ingredients.length > 0 && ingredients.length > 0) {
            const newRecipeNutrition = {
                calories: 0,
                proteins: 0,
                fat: 0,
                carbs: 0,
            };

            formInitialValues.ingredients.forEach((ingredient) => {
                const ingredientValues = ingredients.find(
                    (ingredientsItem) => ingredientsItem.id === ingredient._id
                );

                newRecipeNutrition.calories += +(
                    (ingredient.amount * ingredientValues.calories) /
                    100
                ).toFixed(2);
                newRecipeNutrition.proteins += +(
                    (ingredient.amount * ingredientValues.protein) /
                    100
                ).toFixed(2);
                newRecipeNutrition.fat += +(
                    (ingredient.amount * ingredientValues.fat) /
                    100
                ).toFixed(2);
                newRecipeNutrition.carbs += +(
                    (ingredient.amount * ingredientValues.carb) /
                    100
                ).toFixed(2);
            });

            setRecipeNutrition(newRecipeNutrition);
        }
    }, [ingredients, formInitialValues]);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Название не может быть пустым"),
        categoryId: Yup.string().required("Выберите категорию"),
        time: Yup.number()
            .positive("Время приготовления не может быть меньше одной минуты")
            .required("Введите оценочное время приготовления рецепта"),
        difficulty: Yup.string().required(),
        ingredients: Yup.array()
            .of(
                Yup.object().shape({
                    id: Yup.string().required(),
                    amount: Yup.number()
                        .min(1, "Количество не может быть меньше 1")
                        .required("Введите количество"),
                    unit_id: Yup.string().required(),
                })
            )
            .min(1, "Добавьте как минимум один ингредиент"),
        description: Yup.string().required("Описание не может быть пустым"),
        steps: Yup.array()
            .of(
                Yup.object().shape({
                    name: Yup.string().required(
                        "Название должно состоять минимум из одного символа"
                    ),
                    description: Yup.string().required(
                        "Описание должно состоять минимум из одного символа"
                    ),
                    image: Yup.string(),
                })
            )
            .min(1, "Добавьте как минимум один шаг"),
    });

    return (
        <>
            <Head>
                <script
                    src="https://widget.cloudinary.com/v2.0/global/all.js"
                    type="text/javascript"
                ></script>
            </Head>
            <Formik
                initialValues={{ ...formInitialValues }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log("submit");
                    const recipe = { ...values };
                    console.log(recipe);

                    switch (additionalInfo.type) {
                        case "edit": {
                            dispatch(editRecipe({recipe, authorId, recipeId: additionalInfo.recipeId}));
                            break;
                        }
                        case "add": {
                            dispatch(addRecipe({recipe, authorId}));
                            break;
                        }
                    }

                    Router.push(`/profile/${authorId}`);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                }) => {
                    useEffect(() => {
                        if (categories.length > 0) {
                            setFieldValue("categoryId", categories[0]._id);
                        }
                    }, [categories]);

                    const getNewIngredientId = () => {
                        const usedIngredients = values.ingredients;
                        console.log(ingredients);
                        console.log(usedIngredients);

                        if (usedIngredients.length === 0) {
                            return ingredients[0]._id;
                        } else {
                            for (let i = 0; i < ingredients.length; i++) {
                                const newIngredientId = ingredients[i]._id;
                                const usedIngredient = usedIngredients.some(
                                    (ingredient) => ingredient.id === newIngredientId
                                );

                                console.log("usedIngredient: ", usedIngredient);

                                if (usedIngredient === false) {
                                    return newIngredientId;
                                }
                            }
                        }
                    };

                    return (
                        <Form style={{ display: "flex", flexDirection: "column" }}>
                            <TextField
                                fullwidth="true"
                                id="name"
                                name="name"
                                label="Название рецепта"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.name && Boolean(errors.name)}
                                helperText={touched.name && errors.name}
                            />

                            <FormControl>
                                <InputLabel id="category-label">Категория</InputLabel>
                                <Select
                                    labelId="category-label"
                                    id="category"
                                    value={values.categoryId}
                                    name="categoryId"
                                    onChange={(e) => setFieldValue(`categoryId`, e.target.value)}
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category._id} value={category._id}>
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <Error>{errors.categoryId}</Error>
                            </FormControl>

                            <FormItem>
                                <AddImageField
                                    image={values.image}
                                    fieldName={"image"}
                                    setFieldValue={setFieldValue}
                                />
                            </FormItem>

                            <TextField
                                fullwidth="true"
                                id="time"
                                name="time"
                                type="number"
                                label="Ориентировочное время приготовления рецепта (в минутах)"
                                value={values.time}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.time && Boolean(errors.time)}
                                helperText={touched.time && errors.time}
                            />

                            <FormControl>
                                <InputLabel id="difficulty-label">
                                    Сложность приготовления
                                </InputLabel>
                                <Select
                                    labelId="difficulty-label"
                                    id="difficulty"
                                    value={values.difficulty}
                                    name="difficulty"
                                    onChange={(e) => setFieldValue(`difficulty`, +e.target.value)}
                                >
                                    <MenuItem value="1">1</MenuItem>
                                    <MenuItem value="2">2</MenuItem>
                                    <MenuItem value="3">3</MenuItem>
                                    <MenuItem value="4">4</MenuItem>
                                    <MenuItem value="5">5</MenuItem>
                                    <MenuItem value="6">6</MenuItem>
                                    <MenuItem value="7">7</MenuItem>
                                    <MenuItem value="8">8</MenuItem>
                                    <MenuItem value="9">9</MenuItem>
                                    <MenuItem value="10">10</MenuItem>
                                </Select>
                            </FormControl>

                            <Card variant="outlined" style={{ padding: "0 10px" }}>
                                <CardHeader
                                    title="Состав рецепта"
                                    style={{ textAlign: "center" }}
                                />
                                {ingredients.length > 0 ? (
                                    values.ingredients.map((ingredient, i) => {
                                        console.log("ingredient: ", ingredient);
                                        return (
                                            <AddRecipeFormIngredient
                                                key={i}
                                                currentNumber={i}
                                                currentId={ingredient.id}
                                                currentName={
                                                    ingredients.find(
                                                        (item) => item._id === ingredient.id
                                                    ).name
                                                }
                                                currentAmount={ingredient.amount}
                                                ingredients={ingredients}
                                                units={units}
                                                errors={errors.ingredients}
                                                touched={touched.ingredients}
                                                usedIngredients={values.ingredients}
                                                unitId={ingredient.unit_id}
                                                handleBlur={handleBlur}
                                                setFieldValue={setFieldValue}
                                                recipeNutrition={recipeNutrition}
                                                setRecipeNutrition={setRecipeNutrition}
                                            />
                                        );
                                    })
                                ) : (
                                    <p>Ингредиенты загружаются...</p>
                                )}
                                {errors.ingredients &&
                                touched.ingredients &&
                                typeof errors.ingredients === "string" ? (
                                    <Error>{errors.ingredients}</Error>
                                ) : null}
                                <Button
                                    disabled={
                                        values.ingredients.length === ingredients.length
                                            ? "disabled"
                                            : ""
                                    }
                                    color="primary"
                                    variant="contained"
                                    fullWidth={true}
                                    onClick={() => {
                                        const newId = getNewIngredientId();
                                        console.log(newId);
                                        const ingredient = ingredients.find(
                                            (ingredient) => ingredient._id === newId
                                        );
                                        const calories =
                                            recipeNutrition.calories + ingredient.calories / 100;
                                        const proteins =
                                            recipeNutrition.proteins + ingredient.protein / 100;
                                        const fat = recipeNutrition.fat + ingredient.fat / 100;
                                        const carbs = recipeNutrition.carbs + ingredient.carb / 100;

                                        setFieldValue("ingredients", [
                                            ...values.ingredients,
                                            {
                                                id: newId,
                                                amount: 1,
                                                unit_id: "604a4826a7b04705003a8247",
                                            },
                                        ]);

                                        setRecipeNutrition({
                                            calories: Number(calories.toFixed(2)),
                                            proteins: Number(proteins.toFixed(2)),
                                            fat: Number(fat.toFixed(2)),
                                            carbs: Number(carbs.toFixed(2)),
                                        });
                                    }}
                                    type="button"
                                >
                                    Добавить новый ингредиент
                                </Button>
                            </Card>

                            <AddRecipeNutrition
                                calories={recipeNutrition.calories}
                                proteins={recipeNutrition.proteins}
                                fat={recipeNutrition.fat}
                                carbs={recipeNutrition.carbs}
                            />

                            <TextField
                                fullwidth="true"
                                id="description"
                                multiline={true}
                                name="description"
                                label="Описание рецепта"
                                value={values.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.description && Boolean(errors.description)}
                                helperText={touched.description && errors.description}
                            />

                            <Card
                                variant="outlined"
                                style={{ padding: "0 10px", marginBottom: "10px" }}
                            >
                                <CardHeader
                                    title="Ход приготовления"
                                    style={{ textAlign: "center" }}
                                />
                                {values.steps.map((step, i) => (
                                    <AddRecipeFormStep
                                        key={i}
                                        index={i}
                                        name={step.name}
                                        description={step.description}
                                        image={step.image}
                                        errors={errors.steps}
                                        touched={touched.steps}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        setFieldValue={setFieldValue}
                                        removeCurrentStep={() => {
                                            setFieldValue(
                                                "steps",
                                                [...values.steps].filter((step, j) => j !== i)
                                            );
                                        }}
                                    />
                                ))}

                                {errors.steps &&
                                touched.steps &&
                                typeof errors.steps === "string" ? (
                                    <Error>{errors.steps}</Error>
                                ) : null}
                                <Button
                                    color="primary"
                                    variant="contained"
                                    fullWidth={true}
                                    onClick={() =>
                                        setFieldValue("steps", [
                                            ...values.steps,
                                            {
                                                name: "",
                                                description: "",
                                                image: "",
                                            },
                                        ])
                                    }
                                    type="button"
                                >
                                    Добавить новый шаг
                                </Button>
                            </Card>

                            <Button
                                color="primary"
                                variant="contained"
                                onClick={() => {
                                    console.log("values: ", { ...values, authorId: authorId });
                                    console.log("errors: ", errors);
                                }}
                                type="button"
                            >
                                Show Values
                            </Button>

                            <Button
                                color="primary"
                                variant="contained"
                                onClick={() => {
                                    setFieldValue("name", "name");
                                    setFieldValue("image", "https://via.placeholder.com/150x150");
                                    setFieldValue("description", "description");
                                    setFieldValue("ingredients", [
                                        {
                                            amount: 10,
                                            id: "604a4b00a7b04705003e3dcf",
                                            unit_id: "604a4826a7b04705003a8247",
                                        },
                                    ]);
                                    setFieldValue("steps", [
                                        {
                                            image:
                                                "https://imgholder.ru/600x300/8493a8/adb9ca&text=IMAGE+HOLDER&font=kelson",
                                            name: "Step1",
                                            description: "test",
                                        },
                                    ]);
                                    setFieldValue("time", 20);
                                }}
                                type="button"
                            >
                                Fill Values
                            </Button>

                            <Button
                                color="primary"
                                variant="contained"
                                onClick={handleSubmit}
                                type="submit"
                            >
                                {submitButtonLabel}
                            </Button>
                        </Form>
                    );
                }}
            </Formik>
        </>
    );
};

export default AddRecipeFormik;
