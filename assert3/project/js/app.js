
const apiKey = "f932c49cd29c3a6fe9c0c92d45f640bd";

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('generate');
    
    if (button) {
        console.log('Button found and enabled');
        button.disabled = false;
        button.addEventListener('click', async () => {
            console.log('Generate button clicked');

            const zip = document.getElementById('zip').value;
            const feelings = document.getElementById('feelings').value;

            if (!zip || !feelings) {
                alert('Please fill in all fields');
                return;
            }

            try {
                const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}&units=metric`);
                if (!weatherResponse.ok) {
                    throw new Error(`Error: ${weatherResponse.statusText}`);
                }
                const weatherData = await weatherResponse.json();
                console.log('Weather Data:', weatherData);

                const data = {
                    temperature: weatherData.main.temp,
                    date: new Date().toLocaleDateString(),
                    userFeelings: feelings
                };

                const response = await fetch('/updateWeather', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    throw new Error('Failed to update weather data');
                }

                await retrieveData();
            } catch (error) {
                console.log('Error:', error);
                alert(error.message); // Display error message to the user
            }
        });
    } else {
        console.log('Button not found');
    }
});

const retrieveData = async () => {
    try {
        const response = await fetch('/weatherData');
        const allData = await response.json();
        console.log('Retrieved Data:', allData);

        document.getElementById('temp').innerHTML = Math.round(allData.temperature) + ' degrees';
        document.getElementById('content').innerHTML = allData.userFeelings;
        document.getElementById('date').innerHTML = allData.date;
    } catch (error) {
        console.log('Error:', error);
    }
};
