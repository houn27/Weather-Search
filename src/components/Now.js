import React, { Component } from 'react';
import { Statistic, Row, Col } from 'antd';
import Axios from 'axios'
import nowcss from './Now.module.css';

class Now extends Component {
    constructor(props){
        super(props);
        this.state = { 
            nowTemp:0,
            nowLat:0,
            nowLng:0,
            tip:'',
            wea:''
     }
    }

    getLoc=()=>{
        var _this=this;
        navigator.geolocation.getCurrentPosition(function(position) {
            _this.setState({nowLat:position.coords.latitude});
            _this.setState({nowLng:position.coords.longitude}, () => {
                _this.getNowWeather(); 
            });
            //console.log(position.coords.latitude);
          });
  
    }


    getNowWeather=()=>{
        var _this=this;
        var url="/weather"+this.state.nowLat+','+this.state.nowLng;
        Axios.get(url)
        .then(function(res){
            //set weather
            //console.log(JSON.parse(res.request.response).currently);
            _this.setState({wea:JSON.parse(res.request.response).currently.summary});

            //set temperature difference
            var lowTemp=(JSON.parse(res.request.response).daily.data[0].apparentTemperatureHigh-32)/1.8;
            var highTemp=(JSON.parse(res.request.response).daily.data[0].apparentTemperatureLow-32)/1.8;
            if(highTemp-lowTemp>10){
                _this.setState({tip:'Large Temperature Difference'});
            }else{
                _this.setState({tip:'Small Temperature Difference'});
            }

            //set temperature
            var temp=(JSON.parse(res.request.response).currently.temperature-32)/1.8;
            _this.setState({nowTemp:temp});
            //if()
            //_this.setState({nowLat:position.coords.latitude});
        })
        .catch(function(error){
            console.log(error);
        });
    }

    render() {
        return (
            <div className={nowcss.showTemp}>
                <Row>
                    <Col span={3} offset={5}>
                      <Statistic title="Now Temperature" value={this.state.nowTemp} precision={1} suffix="&#8451;"/>
                    </Col>
                    <Col span={4}>
                      <Statistic title="Now Weather" value={this.state.wea} />
                    </Col>
                    <Col span={5}>
                      <Statistic title="Tips" value={this.state.tip}  />
                    </Col>
                </Row>,
            </div>
        );
    }
    
    componentDidMount(){
        this.getLoc();
       
    }
    
}

export default Now;