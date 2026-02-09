const errorHandler = (err, req, res, next) => {
    // Log the error for debugging
    console.error(err.stack);

    // Determine status code
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode).json({
        message: err.message || 'Internal Server Error',
        // Do not expose stack trace in production, but we can keep it simple here as per requirements
        // Requirement says "No stack trace exposure in response"
        stack: process.env.NODE_ENV === 'production' ? null : null
    });
};

module.exports = errorHandler;
