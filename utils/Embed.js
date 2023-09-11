import React from 'react';

function EmbedButtons({ buttons }) {
    return (
        <div className="mt-4 grid md:grid-cols-4 grid-cols-2 gap-2">
            {buttons.map((button, index) => (
                <a
                    key={index}
                    href={button.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center items-center bg-discord-hover text-white py-2 px-2 rounded hover:bg-opacity-80 transition space-x-2"
                >
                    <span>{button.label}</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="16"
                        height="16"
                        viewBox="0 0 48 48"
                    >
                        <path
                            fill="#ffffff"
                            d="M 40.960938 4.9804688 A 2.0002 2.0002 0 0 0 40.740234 5 L 28 5 A 2.0002 2.0002 0 1 0 28 9 L 36.171875 9 L 22.585938 22.585938 A 2.0002 2.0002 0 1 0 25.414062 25.414062 L 39 11.828125 L 39 20 A 2.0002 2.0002 0 1 0 43 20 L 43 7.2460938 A 2.0002 2.0002 0 0 0 40.960938 4.9804688 z M 12.5 8 C 8.3826878 8 5 11.382688 5 15.5 L 5 35.5 C 5 39.617312 8.3826878 43 12.5 43 L 32.5 43 C 36.617312 43 40 39.617312 40 35.5 L 40 26 A 2.0002 2.0002 0 1 0 36 26 L 36 35.5 C 36 37.446688 34.446688 39 32.5 39 L 12.5 39 C 10.553312 39 9 37.446688 9 35.5 L 9 15.5 C 9 13.553312 10.553312 12 12.5 12 L 22 12 A 2.0002 2.0002 0 1 0 22 8 L 12.5 8 z"
                        ></path>
                    </svg>
                </a>
            ))}
        </div>
    );
}

function Embed({
    title,
    description,
    fields = [],
    footer,
    thumbnail,
    color,
    buttons = null,
}) {
    return (
        <div
            className={`bg-discord-middle text-white rounded p-4 mt-5 ${color}`}
            style={{ maxWidth: '600px' }}
        >
            <div className="flex flex-col md:flex-row">
                <div className="flex-grow">
                    {title && (
                        <div className="font-bold md:text-md text-sm mb-2">
                            {title}
                        </div>
                    )}
                    {description && (
                        <div className="mb-3 text-xs whitespace-pre-line">
                            {description}
                        </div>
                    )}
                    <div className="space-y-2">
                        {fields.map((field, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-1 md:grid-cols-2 gap-3"
                            >
                                <div className="font-semibold text-xs">
                                    {field.name}
                                </div>
                                <div className="text-xs">{field.value}</div>
                            </div>
                        ))}
                    </div>
                    {footer && (
                        <div className="mt-4 text-discord-light md:text-sm text-xs">
                            {footer}
                        </div>
                    )}
                </div>
                {
                    /* TODO: fix thumbnail style and size
                    {thumbnail && (
                        <img
                            src={thumbnail}
                            alt="Thumbnail"
                            width={12}
                            height={12}
                            className="w-12 h-12 rounded-md mr-1 mt-4 md:mt-0"
                        />
                    )}
                    */
                }
            </div>
            {buttons && <EmbedButtons buttons={buttons} />}
        </div>
    );
}

export { EmbedButtons, Embed };
