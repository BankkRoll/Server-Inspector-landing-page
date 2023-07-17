import ErrorPage from '../components/ErrorPage';

const UnknownPage = () => {
    let messages = [
        "404: The webpage decided to go on an adventure.",
        "404: Looks like this webpage got lost in hyperspace.",
        "404: This webpage is playing hide and seek.",
        "404: We've looked everywhere, even under the rug. This webpage is definitely not here.",
        "404: The webpage took a wrong turn at the last byte.",
        "404: This webpage fell into the Internet blackhole."
    ];

    return <ErrorPage message={messages[Math.floor(Math.random()*messages.length)] || "404: Page not found."} />
}

export default UnknownPage;

