import React from 'react';
const Alert = ({ isOpen, message }) => {
    if (isOpen) {
        return <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {message}
        </div>
    }
    return null;
}
export default Alert;