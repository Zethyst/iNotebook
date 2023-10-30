import React from 'react'

export default function Alert(props) {
    function capitalize(word){
        word=word.toLowerCase();
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    return (
        <div style={{height:"10px"}}>
        {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
            <strong>{capitalize(props.alert.type)}!</strong> {props.alert.msg}
        </div>}
        </div>
    )
}