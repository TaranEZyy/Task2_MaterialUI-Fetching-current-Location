// In this component API is used from opencagedata.com website

import React, { useState } from 'react';
import { Button, Typography, Container, CircularProgress } from '@mui/material';

const LocationFetcher = () => {
    const [location, setLocation] = useState({ latitude: null, longitude: null, city: null, state: null });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getLocation = () => {
        setLoading(true);
        setError(null);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });

                    // Call reverse geocoding API here
                    await fetchCityAndState(latitude, longitude);

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

    const fetchCityAndState = async (latitude, longitude) => {
        try {
            const apiKey = '5a4bca55ed8e4dc2829eb10b30040f86';  // OpenCage API key
            const response = await fetch(
                `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
            );
            const data = await response.json();
    
            if (data.results && data.results.length > 0) {
                const components = data.results[0].components;
    
                // Extract city-like fields
                const city = components.city || components.town || components.village || components.suburb || 'N/A';
                const state = components.state || 'N/A';
    
                setLocation((prev) => ({
                    ...prev,
                    city,
                    state,
                }));
            } else {
                setError('Unable to retrieve city/state information');
            }
        } catch (error) {
            setError('Error fetching city/state information');
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
                    {location.city && location.state && (
                        <>
                            <Typography variant="body1">City: {location.city}</Typography>
                            <Typography variant="body1">State: {location.state}</Typography>
                        </>
                    )}
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
