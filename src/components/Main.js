import React, { Component } from 'react';
import maincss from './Main.module.css';
import { Input ,Alert,Row} from 'antd';
import Now from './Now'
import Item from './Item'

import Axios from 'axios'
const { Search } = Input;

class Main extends Component {
    constructor(){
        super();
        this.state = { 
        baseUrl:'https://maps.googleapis.com/maps/api/geocode/json?address=',
        key:'&key=AIzaSyB6zRgVNUzHY_LaA6NcY_fp1AP-j9Ry2FE&language=en',
        lat:0,
        lng:0,
        selectWea:{},
        msg:'',
        dispaly:false,
     }
    }
    
    getData=(value)=>{
        var url=this.state.baseUrl+value+this.state.key;
        var _this=this;
        Axios.get(url)
        .then(function(res){
            //console.log(res.request.response)
            console.log(JSON.parse(res.request.response).results[0].geometry.location);
            
            console.log("输入有效地址！");
            _this.setState({display: false});
            _this.setState({lat:JSON.parse(res.request.response).results[0].geometry.location.lat});
            _this.setState({lng:JSON.parse(res.request.response).results[0].geometry.location.lng});
            //console.log(_this.state.lng);
            _this.getWeather();
            
        })
        .catch(function(error){
            //if input a valid address, alert
            console.log(error);
            console.log("输入无效地址！")
            _this.setState({display: true});
        });
        
        //empty the textarea
        this.refs.mytxt.input.state.value="";
    }

    getWeather=()=>{
        //var baseURL="https://api.darksky.net/forecast/4efc8d5b0cfed4ce1296ad6e84063e11/"
        var _this=this;
        var url="/weather"+this.state.lat+','+this.state.lng;
        Axios.get(url)
        .then(function(res){
            //console.log(JSON.parse(res.request.response).currently.icon);
            var lowTemp=(JSON.parse(res.request.response).daily.data[0].apparentTemperatureLow-32)/1.8;
            var highTemp=(JSON.parse(res.request.response).daily.data[0].apparentTemperatureHigh-32)/1.8;
            var wea=JSON.parse(res.request.response).currently.summary;
            var loc=JSON.parse(res.request.response).timezone;
            //require('./../images/photo.png')
            //<img src="../assets/clear-day.png"></img>
            var icon=require('../assets/'+JSON.parse(res.request.response).currently.icon+'.png');
            _this.setState({selectWea: {
                lowTemp:lowTemp,
                highTemp:highTemp,
                wea:wea,
                loc:loc,
                icon:icon,
            }})
                
        })
        .catch(function(error){
            console.log(error);
        });
    }

    
    

    render() {
        return (
            <div>
                <h1 className={maincss.title}>Weather Search</h1>
                <div className={maincss.input}>
                    
                    <Search  style={{ width: 600 }}  placeholder="input city" enterButton="Search" size="large" onSearch={value => this.getData(value)} ref="mytxt"/>
                    <Row type="flex" justify="center" className={maincss.alert}>
                        {this.state.display? <Alert message="inputted a invalid city" type="error" style={{ width: 600}} banner/>:null}
                    </Row>
                    
                    <Now></Now>
                    
                </div>
                <Item wea={this.state.selectWea}></Item>
            </div>
            );
    }
}

export default Main;