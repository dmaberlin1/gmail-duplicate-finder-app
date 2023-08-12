import React, {useState} from 'react';
import {cn} from "@/utils/utils.tsx";
type ButtonProps=React.ButtonHTMLAttributes<HTMLButtonElement>;
const Button = ({className,...props}:ButtonProps) => {
    const [fill, setFill] = useState(false);
    return (
        <button className={cn('bg-emerald-300 py-2 px-4',className,{'bg-emerald-500':fill})}
                {...props}>
        </button>
    );
};

export default Button;
