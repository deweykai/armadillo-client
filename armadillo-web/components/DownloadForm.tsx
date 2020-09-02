import * as React from 'react';
import {useState} from 'react';
import { KeyboardDateTimePicker } from '@material-ui/pickers';

interface IForm {
    id: string,
    from_date: string,
    from_time: string,
    until_date: string,
    until_time: string,
};

interface IFormEvent {
    preventDefault: () => void,
};

const DownloadForm = ({bikeIds=[], ovenIds=[], solarIds=[]}: {bikeIds?: number[], solarIds?: number[], ovenIds?: number[]}) => {
    const [fromDateTime, handleFromDateTime] = useState<Date | null>(new Date());
    const [untilDateTime, handleUntilDateTime] = useState<Date | null>(new Date());
    const [id, setId] = useState<string>('');
    const [req, setReq] = useState<string>('');
    let idSet = true;

    if (id === '') {
        idSet = false;
    }

    const handleIdChange = (event: any)=> {
        setId(event.target.value);
    };

    const handleSubmit = (event: IFormEvent) => {
        event.preventDefault();
        if (fromDateTime != null && untilDateTime != null) {
            let from = Math.floor(fromDateTime.getTime()/1000);
            let until = Math.floor(untilDateTime.getTime()/1000);
            console.log(id, from, until);

            let url = `/api/csv?id=${id}&from=${from}&until=${until}`;

            window.open(url, '_blank');
            setReq(url);
        }
    }

    let bikeOptions = [];
    for (let i = 0; i < bikeIds.length; i++) {
        if (!idSet) {
            setId(`bike/${bikeIds[i]}`);
            idSet = true;
        }
        bikeOptions.push(
            <option value={`bike/${bikeIds[i]}`}>Bike {bikeIds[i]}</option>
        )
    }

    let ovenOptions = [];
    for (let i = 0; i < ovenIds.length; i++) {
        if (!idSet) {
            setId(`oven/${ovenIds[i]}`);
            idSet = true;
        }
        ovenOptions.push(
            <option value={`oven/${ovenIds[i]}`}>Oven {solarIds[i]}</option>
        )
    }

    let solarOptions = [];
    for (let i = 0; i < solarIds.length; i++) {
        if (!idSet) {
            setId(`solar/${solarIds[i]}`);
            idSet = true;
        }
        solarOptions.push(
            <option value={`solar/${solarIds[i]}`}>Solar {solarIds[i]}</option>
        )
    }

    return (
    <div className="w-full max-w-sm">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4 border" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label>
                    <div className="block font-bold mb-2 text-sm text-gray-700">
                        ID
                    </div>
                    <div className="relative">

                    </div>
                    <select
                        className="block w-full appearance-none shadow rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none focus:shadow-outline"
                        value={id}
                        onChange={handleIdChange}
                    >
                        {bikeOptions}
                        {ovenOptions}
                        {solarOptions}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </label>
            </div>


            <div>
                <div className="block font-bold mb-2 text-sm text-gray-700">
                    Date Range
                </div>

                <div className="mb-3 shadow border rounded px-3 py-2">
                    <KeyboardDateTimePicker
                        required
                        variant="inline"
                        label="from"
                        value={fromDateTime}
                        onChange={newDate => handleFromDateTime(newDate)}
                        format="yyyy/MM/dd HH:mm"
                        className="w-full"
                    />
                </div>
                    
                <div className="mb-3 shadow border rounded px-3 py-2">
                    <KeyboardDateTimePicker
                        required
                        variant="inline"
                        label="until"
                        value={untilDateTime}
                        onChange={newDate => handleUntilDateTime(newDate)}
                        format="yyyy/MM/dd HH:mm"
                        className="w-full"
                    />
                </div>
            </div>

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-2 rounded focus:outline-none focus:shadow-outline"
                type="submit">Download</button>
        </form>
    </div>
    );
};

export default DownloadForm;
