import React, {Suspense} from 'react';
import Mailer from "@/components/Mailer.tsx";


const Main = () => {
    return (
        <div className={'container mx-auto p-4 my-3 bg-cyan-50/50'}>
            {/*<h2>React,TS , Tailwind, Vite</h2>*/}
<Mailer></Mailer>

        </div>
    );
};

export default Main;
