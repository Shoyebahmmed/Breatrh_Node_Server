const database_connection = require('./Database_Connection');
let server_connection = require('./server_conn');
const axios = require('axios');
const express = require('express');
server_connection.use(express.json());




async function getWeatherDetails(latitude, longitude) {
    const weather_API_key = '0c4c6da1ef09761b0acceee11edac545';
    const weatherAPIUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weather_API_key}`;

    if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude) || Math.abs(latitude) > 90 || Math.abs(longitude) > 180) {
        console.error('wrong values');
        return null;
    }

    try {
        console.log(13);
        const response = await axios.get(weatherAPIUrl);
        if (response.status !== 200) {
            console.log('Error in weather API call');
            return null;
        }
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}


async function getWeatherCODetails(latitude, longitude) {
    const weather_API_key = '0c4c6da1ef09761b0acceee11edac545';
    const weatherAPIUrl = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${weather_API_key}`;

    if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude) || Math.abs(latitude) > 90 || Math.abs(longitude) > 180) {
        console.error('wrong values');
        return null;
    }
    try {
        console.log(13);
        const response = await axios.get(weatherAPIUrl);
        if (response.status !== 200) {
            console.log('Error in weather API call');
            return null;
        }
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}


async function getWeatherForecastDetails(latitude, longitude) {
    const weather_API_key = '0c4c6da1ef09761b0acceee11edac545';
    const weatherAPIUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${weather_API_key}`;

    if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude) || Math.abs(latitude) > 90 || Math.abs(longitude) > 180) {
        console.error('wrong values');
        return null;
    }
    try {
        console.log(13);
        const response = await axios.get(weatherAPIUrl);
        if (response.status !== 200) {
            console.log('Error in forecast API call');
            return null;
        }
        //console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}


function capitalizeWords(description) {
    let tempdescription = description.split(' ');
    const capitalizeddescription = tempdescription.map(des => des.charAt(0).toUpperCase() + des.slice(1));
    return capitalizeddescription.join(' ');

}


async function updateFullWeatherDetails (userID, latitude, longitude) {

    if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude) || Math.abs(latitude) > 90 || Math.abs(longitude) > 180 || !userID || isNaN(userID)) {
        console.error('wrong values');
        return null;
    }

    await getWeatherDetails(latitude, longitude)
    .then(async (weather_Details_Response) => {
        await getWeatherCODetails(latitude, longitude)
        .then((CO_Details_Response) => {
            const weatherDescription = capitalizeWords(weather_Details_Response.weather[0].description);
            const temp_deg = Math.round(parseFloat(weather_Details_Response.main.temp) - 273.15) + '°C';
            const humidity = weather_Details_Response.main.humidity + '%';
            const wind_speed = weather_Details_Response.wind.speed + ' m/s';
            const CO_pollution = (CO_Details_Response.list[0].components.co / 1000).toFixed(2) + ' ppm';
            const min_temp = Math.round(parseFloat(weather_Details_Response.main.temp_min) - 273.15) + '°C';
            const max_temp = Math.round(parseFloat(weather_Details_Response.main.temp_max) - 273.15) + '°C';
            const feels_like = Math.round(parseFloat(weather_Details_Response.main.feels_like) - 273.15) + '°C';
            const location = weather_Details_Response.name;
            const weather_icon = weather_Details_Response.weather[0].icon;
            console.log(weather_icon, ' __________________________________++++++++++++++++++++++++++++++++++++++++++++++++++');

            addWeatherDetailsByUserID(userID, weatherDescription, temp_deg, humidity, wind_speed, CO_pollution, min_temp, max_temp, feels_like, location, weather_icon)
            .then((add_Weather_In_Database_Response) => {
                console.log(add_Weather_In_Database_Response);
            })
            .catch((error) => {
                console.log(error, " from add Weather in Database")
            })
        })
        .catch((error) => {
            console.log(error, " from get CO Details")
        })
    })
    .catch((error) => {
        console.log(error, " from get Weather Details")
    })


}




function addWeatherDetailsByUserID(userID, weather_Text, temp_deg, humidity, wind_speed, CO_pollution, min_temp, max_temp, feels_like, location, weather_icon){
    return new Promise((resolve, reject) => {
        console.log(weather_icon, ' =================================================')
        if (!userID || isNaN(userID) || !temp_deg || !humidity || !wind_speed || !CO_pollution || !min_temp || !max_temp || !feels_like || !location || !weather_icon) {
            if (!location) {
                location = 'Unknown';
            }
            else
                reject(new Error("Invalid input values."));
          }

      database_connection.connect(function (err) {
        if (err) {
          console.error('Error connecting: ' + err.stack);
          reject(err);
        } else {
          console.log('Connected to the database as id ' + database_connection.threadId);

          let suggestion = '';
          const humidity_in_num = parseInt(humidity);
          
          if (humidity_in_num < 30) {
            suggestion = 'Keep hydrated since dry air irritates the airways.';
          }

          else if (humidity_in_num > 30 && humidity_in_num < 50) {
            suggestion = 'Enjoy the comfy range and the fresh air.';
          }

          else if (humidity_in_num > 50 && humidity_in_num < 70) {
            suggestion = 'Be careful, since mould may develop.';
          }

          else if (humidity_in_num > 70) {
            suggestion = 'Be careful since symptoms worsen in excessive humidity.';
          }


          if (suggestion !== undefined && suggestion !== null && suggestion.trim() !== '') {
            const query = `INSERT INTO weather_details(User_ID, weather_Text, temp_deg, humidity, wind_speed, CO_pollution, min_temp, max_temp, feels_like, suggestion, location, weather_icon) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) 
            ON DUPLICATE KEY UPDATE 
            weather_Text = VALUES(weather_Text), 
            temp_deg = VALUES(temp_deg), 
            humidity = VALUES(humidity), 
            wind_speed = VALUES(wind_speed), 
            CO_pollution = VALUES(CO_pollution), 
            min_temp = VALUES(min_temp), 
            max_temp = VALUES(max_temp), 
            feels_like = VALUES(feels_like), 
            suggestion = VALUES(suggestion), 
            location = VALUES(location),
            weather_icon = VALUES(weather_icon)`;

            database_connection.query(query, [userID, weather_Text, temp_deg, humidity, wind_speed, CO_pollution, min_temp, max_temp, feels_like, suggestion, location, weather_icon], (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    console.log("Weather details successfully added.");
                    resolve("Weather details successfully added.");
                }
            });
          } else {
            console.log('Suggestion is empty or undefine');
          }
          
        }
      });
    });
  }




  function addWeatherForecastDetailsByUserID(userID, day1_date, day1_temp, day1_humidity, day2_date, day2_temp, day2_humidity, day3_date, day3_temp, day3_humidity){
    return new Promise((resolve, reject) => {
  
      database_connection.connect(function (err) {
        if (err) {
          console.error('Error connecting: ' + err.stack);
          reject(err);
        } else {
          console.log('Connected to the database as id ' + database_connection.threadId);

          
          const query = `INSERT INTO weather_forecast_details (User_ID, day1_date, day1_temp, day1_humidity, day2_date, day2_temp, day2_humidity, day3_date, day3_temp, day3_humidity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) 
          ON DUPLICATE KEY UPDATE 
          day1_date=VALUES(day1_date), 
          day1_temp=VALUES(day1_temp), 
          day1_humidity=VALUES(day1_humidity), 
          day2_date=VALUES(day2_date), 
          day2_temp=VALUES(day2_temp), 
          day2_humidity=VALUES(day2_humidity), 
          day3_date=VALUES(day3_date), 
          day3_temp=VALUES(day3_temp), 
          day3_humidity=VALUES(day3_humidity)`;


          database_connection.query(query, [userID, day1_date, day1_temp, day1_humidity, day2_date, day2_temp, day2_humidity, day3_date, day3_temp, day3_humidity], (err, result) => {
              if (err) {
                  console.log(err);
                  reject(err);
              } else {
                  console.log("Weather forecast details successfully added.");
                  resolve();
              }
          });
          
        }
      });
    });
  }


  function getFromDatabase_WeatherDetails_buUserID (userID) {
    return new Promise((resolve, reject) => {
        if (!userID) {
            reject(new Error('User ID is empty'));
            return;
        }

        database_connection.connect(function (err) {
            if (err) {
                console.error('Error connecting: ' + err.stack);
                reject(err);
                return;
            }

            console.log('Connected to the database as id ' + database_connection.threadId);

            const query = `SELECT * FROM weather_details WHERE User_ID = ${userID}`;
            database_connection.query(query, (error, result) => {
                if (error) {
                    console.log('Error from getFromDatabase WeatherDetails buUserID function:', error);
                    reject(error);
                } else {
                    if (result.length === 0) {
                        reject(new Error(`Result not found for user ID = ${userID}`));
                    } else {
                        resolve(result);
                    }
                }
            });
        });
    });
}


function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${month}/${day}`;
  }



  async function update_Weather_Forecast_Data_By_UserID (userID, latitude, longitude) {
    if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude) || Math.abs(latitude) > 90 || Math.abs(longitude) > 180 || !userID || isNaN(userID)) {
        console.error('wrong values');
        return null;
    }

    await getWeatherForecastDetails(latitude, longitude)
    .then(async (forecastResponse) => {
        const day1_data = forecastResponse.list[8];
        const day2_data = forecastResponse.list[16];
        const day3_data = forecastResponse.list[24];

        const day1_date = formatDate(day1_data.dt_txt.split(' ')[0]);
        const day1_temp = Math.round(parseFloat(day1_data.main.temp) - 273.15) + '°C';
        const day1_humidity = day1_data.main.humidity + '%'; 
        const day2_date = formatDate(day2_data.dt_txt.split(' ')[0]);
        const day2_temp = Math.round(parseFloat(day2_data.main.temp) - 273.15) + '°C'; 
        const day2_humidity = day1_data.main.humidity + '%';
        const day3_date = formatDate(day3_data.dt_txt.split(' ')[0]); 
        const day3_temp = Math.round(parseFloat(day3_data.main.temp) - 273.15) + '°C';
        const day3_humidity = day1_data.main.humidity + '%';

        await addWeatherForecastDetailsByUserID(userID, day1_date, day1_temp, day1_humidity, day2_date, day2_temp, day2_humidity, day3_date, day3_temp, day3_humidity)
        .then((insertForecastResponse) => {
            console.log(insertForecastResponse);
        })
        .catch((error) => {
            console.log(error, " from insert forecast Details")
        })

    })
    .catch((error) => {
        console.log(error, " from get forecast Details")
    })
  }


  function getFromDatabase_WeatherForecastDetails_buUserID (userID) {
    return new Promise((resolve, reject) => {
        if (!userID) {
            reject(new Error('User ID is empty'));
            return;
        }

        database_connection.connect(function (err) {
            if (err) {
                console.error('Error connecting: ' + err.stack);
                reject(err);
                return;
            }

            console.log('Connected to the database as id ' + database_connection.threadId);

            const query = `SELECT * FROM weather_forecast_details WHERE User_ID = ${userID}`;
            database_connection.query(query, (error, result) => {
                if (error) {
                    console.log('Error from getFromDatabase WeatherForecastDetails buUserID function:', error);
                    reject(error);
                } else {
                    if (result.length === 0) {
                        reject(new Error(`Result not found for user ID = ${userID}`));
                    } else {
                        resolve(result);
                    }
                }
            });
        });
    });
}



module.exports = {
    getWeatherDetails,
    addWeatherDetailsByUserID,
    addWeatherForecastDetailsByUserID,
    updateFullWeatherDetails,
    getFromDatabase_WeatherDetails_buUserID,
    update_Weather_Forecast_Data_By_UserID,
    getFromDatabase_WeatherForecastDetails_buUserID
}