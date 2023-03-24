import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import gif from '../img/loading.gif'
import windy from '../img/windy.jpeg'
import clear from '../img/clear.jpg'
import smoke from '../img/smoke.jpeg'
import new1 from '../img/back.jpg'
import cloudy from '../img/cloud.jpeg'
import * as icons from 'react-icons/bs'
import * as icon from 'react-icons/ri'
import mist from "../img/mist.jpg"
import * as icona from 'react-icons/ci'
import * as iconb from 'react-icons/fi'

const Api = () => {
    const [weather, setWeather] = useState([]);
    const [loading, setLoading] = useState(false)
    const [text, setText] = useState()

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        if (text) {
            localStorage.setItem('weather', JSON.stringify(text))
            window.location.replace('http://localhost:3000/');

        }
    }
    let city = (localStorage.getItem('weather'))
    city = JSON.parse(localStorage.getItem('weather'))
    const api_url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=fbcf4e9c71e3e65e78c28ff3c4993e05&units=imperial'

    useEffect(() => {
        setLoading(true)
        try {
            axios.get(api_url).then((response) => {
                setWeather(response.data)
            })
        }
        catch {

        } setLoading(false)

    }, [])
    let a, a1, Data, Data1, min, max
    if (weather.main) {
        a = parseInt(weather.main.temp)
        Data = (a - 32) * 5 / 9
        Data = Math.floor(Data)
        a1 = parseInt(weather.main.feels_like)
        Data1 = (a1 - 32) * 5 / 9
        Data1 = Math.floor(Data1)
        a1 = parseInt(weather.main.temp_min)
        min = (a1 - 32) * 5 / 9
        min = Math.floor(min)
        a1 = parseInt(weather.main.temp_max)
        max = (a1 - 32) * 5 / 9
        max = Math.floor(max)
    }
    let real = ""
    if (weather.weather) {
        weather.weather.map((data) => {
            let { main } = data
            real = main
            return { main }

        })

    }
    let sunrise = ""
    let sunset = ""
    let oaa = ""
    if (weather.sys) {
        oaa = weather.sys.sunrise
        sunrise = new Date(oaa * 1000)
        oaa = weather.sys.sunset
        sunset = new Date(oaa * 1000)
    }
    const rise = sunrise.toString()
    const set = sunset.toString()
    const myArrayrise = rise.split(" ");
    const myArraySet = set.split(" ");

    if (loading) {
        return <img src={gif} className="loading"></img>
    }
    let aa;
    let time;
    setInterval(() => {
        aa = new Date();
        time = aa.getHours() + ':' + aa.getMinutes() + ':' + aa.getSeconds();
        document.getElementById('time').innerHTML = time;
    }, 1000);
    return (
        <div className="app">

            {


                <div className="card col-md-12">
                    {<img src={new1} className="card-img-top"></img>}

                    <div className="content card-body"> <br></br><br></br>
                        <div className="logo"><h3>Accurate Weather</h3></div> <br></br>
                        <form onSubmit={handleSubmit}>
                            <input type='text' value={text} onChange={handleChange} className="search-input form-contorl" placeholder="Search City"></input>
                            <b><iconb.FiSearch className="search-icon"></iconb.FiSearch></b>
                        </form>
                        <div className="clock"><h4>Current Time</h4><h4 id="time" ></h4></div>
                        <div className="upper">
                            <div className="left">
                                <h3><a><icona.CiLocationOn></icona.CiLocationOn></a>&nbsp;&nbsp;{weather.name}</h3><br></br>
                                {weather.main ? <h1 className="celc">{Data}&deg;C</h1> : null}<br></br>
                                {weather.main ? <h3><icons.BsCloudFog></icons.BsCloudFog>&nbsp;&nbsp;{real}</h3> : null}
                            </div>
                            <div className="right">
                                <table>
                                    <tr>
                                        <td><h1><icons.BsSunrise></icons.BsSunrise></h1></td>
                                        <td><h4 className="right-text">{myArrayrise[4]} IST</h4></td>
                                        <td><h1><icons.BsSunset></icons.BsSunset></h1></td>
                                        <td><h4 className="right-text">{myArraySet[4]} IST</h4></td>
                                    </tr>
                                    <tr>
                                        {console.log(weather)}
                                        <td><h1><icon.RiScales2Line></icon.RiScales2Line></h1></td>
                                        {weather.main ? <td><h4 className="right-text">{weather.main.pressure} hPa </h4></td> : null}
                                        <td><h1><icons.BsEye></icons.BsEye></h1></td>
                                        <td><h4 className="right-text">{weather.visibility / 1000} Mile</h4></td>
                                    </tr>
                                </table>
                            </div>

                        </div>
                        <div className="down">
                            <div className="one">
                                {weather.main ? <h3>{Data1}&deg;C</h3> : null}
                                <h5 className="one-text">Feels Like</h5>
                            </div>
                            <div className="one">
                                {weather.main ? <h3>{weather.main.humidity}%</h3> : null}
                                <h5 className="one-text">Humidity</h5>
                            </div>
                            <div className="one">
                                {weather.wind ? <h3>{Math.floor(weather.wind.speed)} MPH</h3> : null}
                                <h5 className="one-text">Wind Speed</h5>
                            </div>
                            <div className="one">
                                {weather.main ? <h3>{min}&deg;C</h3> : null}
                                <h5 className="one-text">Minimum Today</h5>
                            </div>
                            <div className="one">
                                {weather.main ? <h3>{max}&deg;C</h3> : null}
                                <h5 className="one-text">Maximum Today</h5>
                            </div>
                            <div className="one">
                                {weather.main ? <h3>{weather.sys.country}</h3> : null}
                                <h5 className="one-text">Country</h5>
                            </div>
                        </div>
                    </div>
                </div>


            }

        </div>

    )
}

export default Api