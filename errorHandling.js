function handleError(error) {
    if (error.code === 'PERMISSION_DENIED') {
        console.error('Permission denied. Please check your access rights.');
        alert('Permission denied. Please check your access rights.');
        // Handle the permission denied error
    } else if (error.code === 'NETWORK_ERROR') {
        console.error('Network error. Please check your internet connection.');
        alert('Network error. Please check your internet connection.');
        // Handle the network error
    } else {
        console.error('An unexpected error occurred:', error);
        alert('An unexpected error occurred. Please try again.');
        // Handle other types of errors
    }
}

export default handleError;

// Example usage
try {
    // ...existing code...
    // Code that may throw a permission denied or network error
} catch (error) {
    handleError(error);
}
