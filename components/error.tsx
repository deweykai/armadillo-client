import React from 'react';

const Error = ({msg}: {msg: string}) => (
    <div className="z-50 bg-white border-red-500 border-2 rounded-md p-5 shadow">
        {msg}
    </div>
);

export default Error;