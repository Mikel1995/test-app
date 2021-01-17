import React from 'react';
const Alert = ({ isOpen, message, color }) => {
    if (isOpen) {
        return <div className={`alert alert-${color} alert-dismissible fade show`} role="alert">
            {message}
        </div>
    }
    return null;
}
export default Alert;