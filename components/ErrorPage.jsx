import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

const ErrorPage = ({ code, message }) => {
    const [clicked, setClicked] = useState(false);
    const router = useRouter();
    
    return <>
        <Head>
            <title>{code} | Server Inspector</title>
        </Head>

        <div className="max-w-7xl text-center py-20 mx-auto px-5">
        <div className="flex w-full justify-center mb-8">
            <Image src="/img/error.gif" width={250} height={250} />
        </div>
            <h1 className="text-4xl font-extrabold text-white mb-4">{code}</h1>
            <p className="text-xl font-thin text-white text-opacity-75 mb-8">{message}</p>
            <button
                className="w-42 shadow-lg mt-2 shadow-amber-600/20 rounded-xl py-2 font-medium px-7 text-zinc-900 bg-amber-400 hover:bg-opacity-50 transition duration-200"
                onClick={() => {
                    setClicked(true);
                    router.push('/');
                }}
            >
                {clicked ? <i className="fad fa-spinner-third fa-spin text-white" /> : <><i className='fa fa-home mr-2' />Go Home</>}
            </button>
        </div>
    </>
}

export default ErrorPage;