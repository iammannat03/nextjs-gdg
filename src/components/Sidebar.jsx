import React from "react";
import Link from "next/link";

const Sidebar = () => {
    return (
        <div className="w-64 h-screen mr-8 bg-white text-black p-5 lg:block hidden">
            <h2 className="text-2xl font-bold mb-6">Main Menu</h2>
            <nav>
                <ul className="space-y-4">
                    <li className="hover:bg-black hover:text-white p-4 rounded-xl">
                        test
                    </li>
                    <li className="hover:bg-black hover:text-white p-4 rounded-xl">
                        lorem
                    </li>
                    <li className="hover:bg-black hover:text-white p-4 rounded-xl">
                        ipsum
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
