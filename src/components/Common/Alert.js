import React from 'react';
const Alert = ({ isOpen, message }) => {
    if (isOpen) {
        return <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {message}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    }
    return null;
}
export default Alert;