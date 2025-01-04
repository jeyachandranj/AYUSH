import React from 'react';
import CommonTemplate from './CommonTemplate';
import data from './data';

// SchemePage component
const SchemePage = () => {
    const scheme = data.filter((item) => item.section === "scheme");
    const fund = data.filter((item) => item.section === "fund");
    return (
        <div className="container mt-5">
            <CommonTemplate
                heading="Schemes and Services"
                items={scheme}
            />
            <CommonTemplate
                heading="Funding Schemes"
                items={fund}
            />
        </div>
    );
};

export default SchemePage;
