import React, { useState } from 'react';
import { Button, Typography, Container, CircularProgress } from '@mui/material';

const LocationFetcher = () => {
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getLocation = () => {
        setLoading(true);
        setError(null);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                    setLoading(false);
                },
                (error) => {
                    setError('Unable to retrieve location');
                    setLoading(false);
                }
            );
        } else {
            setError('Geolocation is not supported by this browser');
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="xs" style={{ marginTop: '50px' }}>
            <Typography variant="h4" align="center">Fetch Current Location</Typography>

            <Button
                variant="contained"
                color="primary"
                onClick={getLocation}
                fullWidth
                style={{ marginTop: '20px' }}
            >
                Get Location
            </Button>

            {loading && <CircularProgress style={{ marginTop: '20px' }} />}

            {location.latitude && location.longitude && (
                <div style={{ marginTop: '20px' }}>
                    <Typography variant="body1">Latitude: {location.latitude}</Typography>
                    <Typography variant="body1">Longitude: {location.longitude}</Typography>
                </div>
            )}

            {error && (
                <Typography variant="body1" color="error" style={{ marginTop: '20px' }}>
                    {error}
                </Typography>
            )}
        </Container>
    );
};

export default LocationFetcher;
