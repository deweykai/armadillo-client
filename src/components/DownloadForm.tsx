import * as React from 'react';

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
    return (
        <form onSubmit={handleSubmit}>
            <h3>Downloader</h3>
            <label>
                ID: 
                <input name="id" placeholder="id" />
            </label>

            <br />

            <label>
                From:
                <br />
                <input name="from-date" type="date" />
                <input name="from-time" type="time" />
            </label>

            <br />

            <label>
                Until:
                <br />
                <input name="until-date" type="date" />
                <input name="until-time" type="time" />
            </label>

            <br />

            <input type="submit" value="Download" />
        </form>
    );
};

export default DownloadForm;
