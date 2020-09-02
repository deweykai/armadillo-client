import React from 'react';

const TrailerDescription = ({name, location}) => {
    return (
        <>
            <p>
                Name: {name}
            </p>
            <p>
                Location: {location}
            </p>
        </>
    );
};

export default TrailerDescription;
