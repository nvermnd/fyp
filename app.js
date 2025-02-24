const handlePermissionError = require('./errorHandler');

// ...existing code...

try {
    // ...code that might throw a permission error...
} catch (error) {
    handlePermissionError(error);
}

// ...existing code...
