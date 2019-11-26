import React from 'react';

export default function Footer(props) {
    //Only allow save button if logged in.
    let saveButton = props.loggedInBool? <button onClick={() => props.save()}>Save</button> : '';
    return (
        <footer>
            <button onClick={() => props.refresh()}>Reset</button>
            {saveButton}
        </footer>
    );
}