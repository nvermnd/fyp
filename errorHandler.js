function handlePermissionError(error) {
    if (error.code === 'PERMISSION_DENIED') {
        console.error('Permission denied:', error.message);
        // Handle the error appropriately, e.g., notify the user, retry, etc.
    } else {
        throw error;
    }
}

module.exports = handlePermissionError;
