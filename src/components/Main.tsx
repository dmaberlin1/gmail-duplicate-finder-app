import React, {Suspense} from 'react';
const Mailer = React.lazy(() => import("@/components/Mailer.tsx"));

const Main = () => {
    return (
        <div className={'container mx-auto p-4'}>
            <h2>React,TS , Tailwind, Vite</h2>
<Mailer></Mailer>
        {/*    <Suspense fallback={<h1 className={'bg-emerald-200 text-xl text-emerald-900 text-center p-4'}>Loading...</h1>}>*/}
        {/*    <Mailer/>*/}
        {/*</Suspense>*/}
        </div>
    );
};

export default Main;
