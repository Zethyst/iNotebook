import React from 'react'

export default function Alert(props) {
    function capitalize(word) {
        word = word.toLowerCase();
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    return (
        <div style={{ height: "10px", position: "relative", zIndex:"102"}}>
            {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show font-semibold border-none rounded-none`} role="alert">
                {props.alert.msg}
            </div>}
        </div>
    )
}