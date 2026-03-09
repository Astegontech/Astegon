'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
    variant?: 'primary' | 'secondary' | 'outline';
    isLoading?: boolean;
    children?: React.ReactNode;
}

const styles = {
    baseStyles: 'relative inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-200 overflow-hidden',
    primary: 'bg-white text-black hover:bg-gray-100 disabled:bg-white/50',
    secondary: 'bg-white/10 text-white hover:bg-white/20 disabled:bg-white/5',
    outline: 'border border-white/20 text-white hover:bg-white/10 hover:border-white/40 disabled:opacity-50',
    glow: 'absolute inset-0 rounded-full bg-white/20 blur-md -z-10'
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = '', variant = 'primary', isLoading = false, children, disabled, ...props }, ref) => {
        const variantStyles = styles[variant] || styles.primary;

        return (
            <motion.button
                ref={ref}
                whileHover={disabled || isLoading ? {} : { scale: 1.05 }}
                whileTap={disabled || isLoading ? {} : { scale: 0.95 }}
                className={`${styles.baseStyles} ${variantStyles} ${disabled || isLoading ? 'cursor-not-allowed' : ''} ${className}`}
                disabled={disabled || isLoading}
                {...props}
            >
                {/* Subtle glow on hover for primary */}
                {variant === 'primary' && !disabled && !isLoading && (
                    <motion.div
                        className={styles.glow}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                    />
                )}

                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                    </>
                ) : (
                    children
                )}
            </motion.button>
        );
    }
);

Button.displayName = 'Button';
