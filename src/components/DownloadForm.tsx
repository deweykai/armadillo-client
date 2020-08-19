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

const handleSubmit = (event: IFormEvent) => {
    console.log(event);
    alert(event);
    event.preventDefault();
}

const DownloadForm = () => {
    const [fromDateTime, handleFromDateTime] = useState<Date | null>(new Date());
    const [untilDateTime, handleUntilDateTime] = useState<Date | null>(new Date());

    return (
        <form onSubmit={handleSubmit}>
            <h3>Downloader</h3>
            <label>
                ID: 
                <input name="id" placeholder="id" />
            </label>

            <br />

            <KeyboardDateTimePicker
                required
                variant="inline"
                label="from"
                value={fromDateTime}
                onChange={newDate => handleFromDateTime(newDate)}
                disablePast
                format="yyyy/MM/dd HH:mm"
            />

            <br />

            <KeyboardDateTimePicker
                required
                variant="inline"
                label="until"
                value={untilDateTime}
                onChange={newDate => handleUntilDateTime(newDate)}
                disablePast
                format="yyyy/MM/dd HH:mm"
            />

            <br />

            <input type="submit" />
        </form>
    );
};

export default DownloadForm;
