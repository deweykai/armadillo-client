import * as React from 'react';

const DownloadForm = () => {
    return (
        <form>
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
