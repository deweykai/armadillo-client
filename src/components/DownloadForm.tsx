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

const DownloadForm = () => {
    const [fromDateTime, handleFromDateTime] = useState<Date | null>(new Date());
    const [untilDateTime, handleUntilDateTime] = useState<Date | null>(new Date());
    const [id, setId] = useState<string>('');

    const handleIdChange = (event: any)=> {
        setId(event.target.value);
    };

    const handleSubmit = (event: IFormEvent) => {
        event.preventDefault();
        if (fromDateTime != null && untilDateTime != null) {
            let from = Math.floor(fromDateTime.getTime()/1000);
            let until = Math.floor(untilDateTime.getTime()/1000);
            console.log(id, from, until);

            fetch(`/api/data/${id}/csv?from=${from}&until=${until}`)
                .then(resp => resp.blob())
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    // the filename you want
                    a.download = 'todo-1.csv';
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    alert('your file has downloaded!');
                })
                .catch(err => console.log(err));
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Downloader</h3>
            <label>
                ID: 
                <input required name="id" placeholder="id" value={id} onChange={handleIdChange} />
            </label>

            <br />

            <KeyboardDateTimePicker
                required
                variant="inline"
                label="from"
                value={fromDateTime}
                onChange={newDate => handleFromDateTime(newDate)}
                format="yyyy/MM/dd HH:mm"
            />

            <br />

            <KeyboardDateTimePicker
                required
                variant="inline"
                label="until"
                value={untilDateTime}
                onChange={newDate => handleUntilDateTime(newDate)}
                format="yyyy/MM/dd HH:mm"
            />

            <br />

            <input type="submit" />
        </form>
    );
};

export default DownloadForm;
