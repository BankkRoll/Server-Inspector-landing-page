import ErrorPage from '../components/ErrorPage';

const UnkownPage = () => {
    let messages = [
        "500: The server decided to take a coffee break.",
        "500: Our server is having a case of the Mondays.",
        "500: The server is experiencing an identity crisis.",
        "500: The server is currently meditating on the problem.",
        "500: The server got rugged, be back soon.",
        "500: The server must have gotten tangled in some webs."
    ];

    return <ErrorPage message={messages[Math.floor(Math.random()*messages.length)] || "500: Internal Server Error."} />
}

export default UnkownPage;
