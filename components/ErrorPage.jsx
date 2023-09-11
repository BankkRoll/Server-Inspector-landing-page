import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTheme } from 'next-themes';

const ErrorPage = ({ message }) => {
    const [clicked, setClicked] = useState(false);
    const router = useRouter();
    const { theme, setTheme } = useTheme();

    const themeColorMap = {
        blue: 'rgba(96, 165, 250)',
        violet: 'rgba(139, 92, 246)',
        emerald: 'rgba(5, 150, 105)',
        rose: 'rgba(248, 113, 113)',
        amber: 'rgba(245, 158, 11)',
        red: 'rgba(220, 38, 38)',
        yellow: 'rgba(251, 191, 36)',
        cyan: 'rgba(6, 182, 212)',
    };

    const PongGame = () => {
        const canvasRef = useRef(null);

        useEffect(() => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            const balls = [
                {
                    x: canvas.width / 2,
                    y: canvas.height / 2,
                    dx: 2,
                    dy: 2,
                    radius: 10,
                    color: themeColorMap[theme] || 'rgba(245, 158, 11)',
                },
                {
                    x: canvas.width / 3,
                    y: canvas.height / 3,
                    dx: 1,
                    dy: 1,
                    radius: 10,
                    color: themeColorMap[theme] || 'rgba(245, 158, 11)',
                },
                {
                    x: canvas.width / 4,
                    y: canvas.height / 4,
                    dx: 3,
                    dy: 3,
                    radius: 10,
                    color: themeColorMap[theme] || 'rgba(245, 158, 11)',
                },
            ];

            // Game loop
            function draw() {
                // Clear the canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                balls.forEach((ball) => {
                    ctx.beginPath();
                    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
                    ctx.fillStyle = ball.color;
                    ctx.fill();
                    ctx.closePath();
                    ball.x += ball.dx;
                    ball.y += ball.dy;
                    if (
                        ball.x + ball.dx > canvas.width - ball.radius ||
                        ball.x + ball.dx < ball.radius
                    ) {
                        ball.dx = -ball.dx;
                    }
                    if (
                        ball.y + ball.dy > canvas.height - ball.radius ||
                        ball.y + ball.dy < ball.radius
                    ) {
                        ball.dy = -ball.dy;
                    }
                });
            }
            setInterval(draw, 10);
        }, [theme]);

        return <canvas ref={canvasRef} width={300} height={400} />;
    };

    return (
        <>
            <Head>
                <title>Oops! | Server Inspector</title>
            </Head>

            <div className="max-w-7xl text-center py-20 mx-auto px-5">
                <div className="flex w-full justify-center mb-8">
                    <PongGame />
                </div>
                <h1 className="text-4xl font-extrabold text-white mb-4">
                    Oops!
                </h1>
                <p className="text-xl font-thin text-white text-opacity-75 mb-8">
                    {message}
                </p>
                <button
                    className="w-42 shadow-lg mt-2 shadow-amber-600/20 rounded-xl py-2 font-medium px-7 text-zinc-900 bg-amber-400 hover:bg-opacity-50 transition duration-200"
                    onClick={() => {
                        setClicked(true);
                        router.push('/');
                    }}
                >
                    {clicked ? (
                        <i className="fad fa-spinner-third fa-spin text-white" />
                    ) : (
                        <>
                            <i className="fa fa-home mr-2" />
                            Go Home
                        </>
                    )}
                </button>
            </div>
        </>
    );
};

export default ErrorPage;
