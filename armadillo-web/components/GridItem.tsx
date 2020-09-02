import React from 'react';

const GridItem = ({children, title}: {children: any, title: string}) => {
    return (
        <div className="p-3 rounded shadow">
            <h4 className="text-lg">{title}</h4>
            {children}
        </div>
    );
};

export default GridItem;