import ErrorPage from '../components/ErrorPage';
const UnknownPage = () => {
    let messages = [
        "Looks like you've taken a wrong turn in cyberspace.",
        "This page seems to be hiding. Let's respect its privacy.",
        "Oh no! The page you're looking for has gone on vacation.",
        "This page is playing hide and seek. Unfortunately, it's winning.",
        "Seems like this page has mastered the art of invisibility.",
        "Error 404. The page is out to lunch."
    ];

    return <ErrorPage code={404} message={messages[Math.floor(Math.random()*messages.length)] || "Page not found."} />
}

export default UnknownPage;
