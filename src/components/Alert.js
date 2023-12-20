import React from 'react'

export default function Alert(props) {
    return (
        <div style={{ height: "10px", position: "relative", zIndex:"102"}}>
            {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show font-semibold border-none rounded-none`} role="alert">
                {props.alert.msg}
            </div>}
        </div>
    )
}