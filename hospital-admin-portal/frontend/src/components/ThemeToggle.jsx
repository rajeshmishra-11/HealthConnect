import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("hospital_theme");
        if (savedTheme === "dark") {
            setIsDark(true);
            document.documentElement.classList.add("dark");
        }
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("hospital_theme", "light");
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("hospital_theme", "dark");
        }
        setIsDark(!isDark);
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-secondary text-foreground transition-colors duration-200"
            aria-label="Toggle Theme"
        >
            {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-700" />}
        </button>
    );
};

export default ThemeToggle;
