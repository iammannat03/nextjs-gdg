'use server';

import { User } from "@/models/user.model";
import { connect } from "@/db";

export async function loginUser({ email, password }) {
    await connect();

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
    };
}

export async function registerUser({ name, email, password }) {
    await connect();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("User already exists");
    }

    // Create new user
    const user = await User.create({
        name,
        email,
        password,
    });

    return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
    };
}