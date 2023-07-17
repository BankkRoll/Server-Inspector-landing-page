import React from 'react';
import { useTheme } from 'next-themes';
import toast, { Toaster } from 'react-hot-toast';

const Toasts = () => {
    const { theme } = useTheme();

    const colorMap = {
        'blue': 'bg-blue-500/50 border-blue-700 border-[4px]',
        'violet': 'bg-violet-500/50 border-violet-700 border-[4px]',
        'emerald': 'bg-emerald-500/50 border-emerald-700 border-[4px]',
        'rose': 'bg-rose-500/50 border-rose-700 border-[4px]',
        'amber': 'bg-amber-500/50 border-amber-700 border-[4px]',
        'red': 'bg-red-500/50 border-red-700 border-[4px]',
        'yellow': 'bg-yellow-500/50 border-yellow-700 border-[4px]',
        'cyan': 'bg-cyan-500/50 border-cyan-700 border-[4px]',
        // Add default color if the theme is not in the map
        default: 'bg-gray-500/50 border-gray-700 border-[4px]',
    };

    const colorClass = colorMap[theme] || colorMap.default;

    return (
        <Toaster
            toastOptions={{
                style: {
                    borderRadius: '10px',
                    background: '',
                    color: '#fff',
                    border: '',
                },
                className: `${colorClass}`,
                position: 'bottom-right',
            }}
        />
    );
};

export default Toasts;
