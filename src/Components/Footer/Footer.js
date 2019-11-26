import React from 'react';

export default function Footer(props) {
    let saveButton = props.loggedInBool? <button onClick={() => props.save()}>Save</button> : '';
    return (
        <footer>
            <button onClick={() => props.refresh()}>Reset</button>
            {saveButton}
        </footer>
    );
}