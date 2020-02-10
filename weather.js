window.addEventListener('load', () =>{
    let long;
    let lat;
    let locationTimezone = document.querySelector('.location-timezone');
    let degree = document.querySelector('.degree')
    let about = document.querySelector('.summary')

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;


            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const key = '6c84b31fcac21a2bb2f5bcbde7ef82d9'
            const api = `${proxy}https://api.darksky.net/forecast/${key}/${lat},${long}`


            fetch(api)
            .then(response =>{
                return response.json()
            })
            .then(data =>{
                console.log(data)
                const { temperature, summary, icon } = data.currently;
                locationTimezone.textContent = data.timezone
                degree.textContent = Math.floor(temperature)
                about.textContent = summary

                setIcons(icon, document.querySelector('.icon'))

            });

        });
    }
    function setIcons(icon, iconID){
        const skycons = new Skycons({color: 'white'});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play()
        return skycons.set(iconID, Skycons[currentIcon])
    }

})