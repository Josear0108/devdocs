import React from 'react';

/**
 * Zona del logo QR
 * @returns
 */
export const Logo = () => {
    return (
        <section className="logo">
            <div className="logo__container">
                <figure className="logo__figure">
                    <img 
                        src="/src/assets/LogoQR.svg" 
                        alt="QR Generator Logo" 
                        className="logo__image" 
                    />
                </figure>
            </div>
        </section>
    );
};

export default Logo;
