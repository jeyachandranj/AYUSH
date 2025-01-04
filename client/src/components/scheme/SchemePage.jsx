import React from 'react';
import { useParams } from 'react-router-dom';
import data from "./data";
const SchemePage = () => {
    const { id } = useParams();
    let schemes=data[id];
    console.log(schemes);
    const contentStyle = {
        flex: 1,
        padding: '20px',
        background: 'rgba(255, 255, 255, 0.9)', // Slightly opaque background for content
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    };

    const headerStyle = {
        color: '#007b5e',
        marginBottom: '20px',
        fontSize: '2em'
    };

    const paragraphStyle = {
        fontSize: '1.5em',
        lineHeight: '1.6',
    };

    const footerStyle = {
        padding: '10px',
        background: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
        borderTop: '1px solid #ddd',
    };

    return (
        <div style={{
            fontFamily: 'Arial, sans-serif',
            background: 'linear-gradient(135deg, #a2c2e7, #e0f7fa)', // Calming gradient background
            color: '#333',
            padding: 0,
            margin: 0,
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        }}>
            <div style={contentStyle}>
                <div style={headerStyle} className='fw-bold pt-3 pb-3'>
                    <h1>{schemes.title}</h1>
                </div>
                <div>
                    <p style={paragraphStyle} className='pt-3 pb-3'>Financial assistance to startups for proof of concept, prototype development, product trials, market entry, and commercialization.</p>
                </div>
                {
                    schemes.scheme.map(item=>(
                        <section>
                            <h3 className='fw-bold pt-3 pb-3'>{item.act}</h3>
                            <p className='pt-3 pb-3'>{item.description}</p>
                        </section>
                    ))
                }
                </div>
            <footer style={footerStyle}>
                <p>&copy; 2024 Government of India. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default SchemePage;
