import ErrorPage from '../components/ErrorPage';
const UnkownPage = () => {
    let messages = [
        "Oh no! It seems there is a 500 Internal Server Error. Please try again later!",
        "Oh no! The server encountered an unexpected condition.",
        "Oh no! The server is having some trouble. Please try again later.",
        "Oh no! The server is currently down. Please try again later."
    ];

    return <ErrorPage code={500} message={messages[Math.floor(Math.random()*messages.length)] || "Internal Server Error."} />
}

export default UnkownPage;
