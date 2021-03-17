import React from "react";
import AddRecipeFormIngredient from "./AddRecipeFormIngredient";

const ReactHookArrayForm = ({ fields, register }) => {
    return (
        <>
            {/* {fields.map((ingredient, index) => (
                <input
                    key={ingredient._id} // important to include key with field's id
                    name={`test[${index}].value`}
                    ref={register()} // register() when there is no validation rules
                    defaultValue={ingredient} // make sure to include defaultValue
                />

                <AddRecipeFormIngredient
                key={ingredient._id}
                                    currentNumber={index}
                                    currentId={ingredient._id}
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
            ))} */}
        </>
    );
};

export default ReactHookArrayForm;
