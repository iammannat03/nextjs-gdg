import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Define the schema
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true, // Removes leading/trailing whitespace
            minlength: [2, "Name must be at least 2 characters long"],
            maxlength: [50, "Name cannot exceed 50 characters"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true, // Ensures no duplicate emails
            lowercase: true, // Converts email to lowercase
            trim: true, // Removes leading/trailing whitespace
            validate: {
                validator: function (value) {
                    // Regex for email validation
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                },
                message: "Please provide a valid email address",
            },
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters long"],
            select: false, // Prevents password from being returned in queries by default
        },
        role: {
            type: String,
            enum: ["user", "admin"], // Restricts roles to predefined values
            default: "user", // Default role is "user"
        },
        isActive: {
            type: Boolean,
            default: true, // Indicates if the user account is active
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
    }
);

// Middleware: Hash password before saving
userSchema.pre("save", async function (next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10); // Generate a salt
        this.password = await bcrypt.hash(this.password, salt); // Hash the password
        next();
    } catch (error) {
        next(error);
    }
});

// Method: Compare password during login
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Create the model
export const User = mongoose.model("User", userSchema);

module.exports = User;