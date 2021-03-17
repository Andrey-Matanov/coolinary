import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import {
    Card,
    CardHeader,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@material-ui/core";
import AddRecipeNutrition from "./AddRecipeNutrition";
import ReactHookArrayForm from "./ReactHookArrayForm";

const ReactHookForm = ({
    ingredients,
    categories,
    units,
    formInitialValues,
    submitButtonLabel,
    additionalInfo,
}) => {
    const dispatch = useDispatch();

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
                    (ingredientsItem) => ingredientsItem.id === ingredient.id
                );

                newRecipeNutrition.calories += +(
                    (ingredient.amount * ingredientValues.calorie) /
                    100
                ).toFixed(2);
                newRecipeNutrition.proteins += +(
                    (ingredient.amount * ingredientValues.product_protein) /
                    100
                ).toFixed(2);
                newRecipeNutrition.fat += +(
                    (ingredient.amount * ingredientValues.product_fat) /
                    100
                ).toFixed(2);
                newRecipeNutrition.carbs += +(
                    (ingredient.amount * ingredientValues.product_carb) /
                    100
                ).toFixed(2);
            });

            setRecipeNutrition(newRecipeNutrition);
        }
    }, [ingredients.length, formInitialValues.ingredients.length]);

    // const validationSchema = Yup.object().shape({
    //     name: Yup.string().required("Название не может быть пустым"),
    //     category_id: Yup.number().required(),
    //     time: Yup.number()
    //         .positive("Время приготовления не может быть меньше одной минуты")
    //         .required("Введите оценочное время приготовления рецепта"),
    //     difficulty: Yup.string().required(),
    //     ingredients: Yup.array()
    //         .of(
    //             Yup.object().shape({
    //                 id: Yup.number().required(),
    //                 amount: Yup.number()
    //                     .min(1, "Количество не может быть меньше 1")
    //                     .required("Введите количество"),
    //                 unit_id: Yup.number().required(),
    //             })
    //         )
    //         .min(1, "Добавьте как минимум один ингредиент"),
    //     description: Yup.string().required("Описание не может быть пустым"),
    //     steps: Yup.array()
    //         .of(
    //             Yup.object().shape({
    //                 name: Yup.string().required(
    //                     "Название должно состоять минимум из одного символа"
    //                 ),
    //                 description: Yup.string().required(
    //                     "Описание должно состоять минимум из одного символа"
    //                 ),
    //                 image: Yup.string(),
    //             })
    //         )
    //         .min(1, "Добавьте как минимум один шаг"),
    // });

    const defaultValues = {
        name: formInitialValues.name,
        time: formInitialValues.time,
        description: formInitialValues.description,
        test: [
            {
                _id: "604f6eda57dbbc3dc06591c7",
                amount: 10,
                id: "604a4b00a7b04705003e3dcf",
                unit_id: "604a4826a7b04705003a8247",
            },
        ],
    };

    const { reset, register, handleSubmit, getValues, errors, control } = useForm({
        mode: "onChange",
    });

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control,
        name: "test", // unique name for your Field Array
        // keyName: "id", default to "id", you can change the key name
    });

    const onSubmit = (data) => console.log(data);

    // const getNewIngredientId = () => {
    //     const usedIngredients = values.ingredients;
    //     console.log(ingredients);
    //     console.log(usedIngredients);

    //     if (usedIngredients.length === 0) {
    //         return ingredients[0]._id;
    //     } else {
    //         for (let i = 0; i < ingredients.length; i++) {
    //             const newIngredientId = ingredients[i]._id;
    //             const usedIngredient = usedIngredients.some(
    //                 (ingredient) => ingredient.id === newIngredientId
    //             );

    //             console.log("usedIngredient: ", usedIngredient);

    //             if (usedIngredient === false) {
    //                 return newIngredientId;
    //             }
    //         }
    //     }
    // };

    // onSubmit={(values) => {
    //     switch (additionalInfo.type) {
    //         case "edit": {
    //             dispatch(editRecipe(values, additionalInfo.recipeId));
    //             break;
    //         }
    //         case "add": {
    //             dispatch(addRecipe(values));
    //             break;
    //         }
    //     }

    //     dispatch(fetchUserRecipes(formInitialValues.authorId));
    //     Router.push(`/profile/${formInitialValues.authorId}`);
    // }}

    useEffect(() => {
        reset(defaultValues);
    }, [formInitialValues]);

    return (
        <>
            <DevTool control={control} />

            <form
                style={{ display: "flex", flexDirection: "column" }}
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextField
                    fullwidth="true"
                    inputRef={register({
                        required: { value: true, message: "Название не может быть пустым" },
                    })}
                    name="name"
                    label="Название рецепта"
                    error={Boolean(errors.name)}
                    helperText={errors.name?.message}
                />

                <FormControl>
                    <InputLabel htmlFor="category-label">Категория</InputLabel>
                    <Controller
                        control={control}
                        defaultValue={formInitialValues.category_id}
                        name="category_id"
                        as={
                            <Select labelId="category-label">
                                {categories.map((category) => (
                                    <MenuItem key={category._id} value={category._id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        }
                    />
                </FormControl>

                {/* <FormItem>
                    <AddRecipeImage setFieldValue={setFieldValue} />
                </FormItem> */}

                <TextField
                    fullwidth="true"
                    name="time"
                    type="number"
                    label="Ориентировочное время приготовления рецепта (в минутах)"
                    inputRef={register({
                        required: {
                            value: true,
                            message: "Введите оценочное время приготовления рецепта",
                        },
                        min: {
                            value: 1,
                            message: "Время приготовления не может быть меньше одной минуты",
                        },
                    })}
                    error={Boolean(errors.time)}
                    helperText={errors.time?.message}
                />

                <FormControl>
                    <InputLabel id="difficulty-label">Сложность приготовления</InputLabel>
                    <Controller
                        control={control}
                        defaultValue={formInitialValues.difficulty}
                        name="difficulty"
                        as={
                            <Select labelId="difficulty-label">
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
                        }
                    />
                </FormControl>

                {/* <Card variant="outlined" style={{ padding: "0 10px" }}>
                    <CardHeader title="Состав рецепта" style={{ textAlign: "center" }} />
                    {ingredients.length > 0 ? (
                        values.ingredients.map((ingredient, i) => {
                            console.log("ingredient: ", ingredient);
                            return (
                                <AddRecipeFormIngredient
                                    key={i}
                                    currentNumber={i}
                                    currentId={ingredient.id}
                                    currentName={
                                        ingredients.find((item) => item._id === ingredient.id).name
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
                            values.ingredients.length === ingredients.length ? "disabled" : ""
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
                            const calories = recipeNutrition.calories + ingredient.calories / 100;
                            const proteins = recipeNutrition.proteins + ingredient.protein / 100;
                            const fat = recipeNutrition.fat + ingredient.fat / 100;
                            const carbs = recipeNutrition.carbs + ingredient.carb / 100;

                            setFieldValue("ingredients", [
                                ...values.ingredients,
                                {
                                    id: newId,
                                    amount: 1,
                                    unit_id: 1,
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
                </Card> */}

                <AddRecipeNutrition
                    calories={recipeNutrition.calories}
                    proteins={recipeNutrition.proteins}
                    fat={recipeNutrition.fat}
                    carbs={recipeNutrition.carbs}
                />

                <TextField
                    fullwidth="true"
                    name="description"
                    multiline={true}
                    label="Описание рецепта"
                    inputRef={register({
                        required: { value: true, message: "Описание не может быть пустым" },
                    })}
                    error={Boolean(errors.description)}
                    helperText={errors.description?.message}
                />

                {/* <Card
                            variant="outlined"
                            style={{ padding: "0 10px", marginBottom: "10px" }}
                        >
                            <CardHeader title="Ход приготовления" style={{ textAlign: "center" }} />
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

                            {errors.steps && touched.steps && typeof errors.steps === "string" ? (
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
                        </Card> */}

                <ReactHookArrayForm fields={fields} register={register} />

                <button
                    type="button"
                    onClick={() => {
                        console.log("values: ", getValues());
                        console.log("errors: ", errors);
                    }}
                >
                    Show Values
                </button>

                <button type="submit">{submitButtonLabel}</button>
                <input type="submit" />
            </form>
        </>
    );
};

export default ReactHookForm;
