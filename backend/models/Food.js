const { Schema, model } = require("mongoose"); // database handling

// Create a new schema for a Food
const FoodSchema = new Schema({
    userIds: {
        type: Schema.Types.ObjectId, // specifically links each food to a user
        ref: "User", // so we can reference user model
        required: [true, "Foods must belong to at least one user."],
    },
    name: {
        type: String,
        required: [true, "Foods must have a name."],
        maxLength: [100, "Food name cannot exceed 100 characters."], // we can set this to whatever or just remove the limit
        trim: true,
    },
    calories: {
        type: Number,
        required: [true, "Calories must be specified."],
        min: [0, "Calories cannot be negative."],
    },
    macros: { // could just not make it children of the macros group but it feel like it might be neater to keep it this way, still thinking about it
        protein: {
            type: Number,
            default: 0,
            min: [0, "Protein cannot be negative."],
        },
        carbs: {
            type: Number,
            default: 0,
            min: [0, "Carbs cannot be negative."],
        },
        fat: {
            type: Number,
            default: 0,
            min: [0, "Fat cannot be negative."],
        },
    },
    description: {
        type: String,
        maxLength: [500, "Description cannot exceed 500 characters."],
        trim: true,
    },
    date: { // date was added, we might(?) not want this tbh, maybe replace with expiration or smthn? would just be extra work tho
        type: Date,
        default: Date.now, // autoset to current date
    },
    mealType: { // we prob arent getting this specific either but just in case
        type: String,
        enum: ["BREAKFAST", "LUNCH", "DINNER", "SNACK"],
        required: [true, "Meal type is required."],
    },
});

// Create a new model for Food and export it
module.exports = model("Food", FoodSchema);