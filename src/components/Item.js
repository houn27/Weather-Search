import React, { Component } from 'react';
//import itemcss from './Now.module.css';
import { Card, Row, Col,Button } from 'antd';
import {Time} from '../libs/time'

class Item extends Component {
    constructor(props){
        super(props);
        this.state = { 
            date:new Date(),
            list:[],
            prevPropsWea: this.props.wea
     }
    }
    
    deleteItem=(index)=>{
        var templist=this.state.list;
        templist.splice(index, 1);
        this.setState({list:templist});
    }

    render() {
        //console.log(this.state.list);
        //var _this=this;

        return (
            <div>
                
                {
                this.state.list.map((item,index) =>{
                    //console.log('mapList:'+this.state.list);
                    return (
                    <Row type="flex" justify="center" key={index}>
                        <Card style={{ width: 800, margin:5}}>
                            <Row type="flex" justify="center" align="middle">
                                <Col span={6}>
                                    <h4>{item.loc}</h4>
                                </Col>
                                <Col span={6}>
                                    <img src={item.icon} alt="unknown weather" width="70px" height="70px"></img>
                                </Col>
                                <Col span={6}>
                                    <div>
                                        {Math.round(item.lowTemp)}&#8451;-{Math.round(item.highTemp)}&#8451;
                                    </div>
                                    <div>
                                        weather: {item.wea}
                                    </div>
                                </Col>
                                <Col span={6}>
                                    <span>{Time.getLastDate(this.state.date)}&emsp;</span>
                                    <Button type="link" onClick={ () =>this.deleteItem(index)}>delete</Button>
                                </Col>
                            </Row>
                        </Card>
                    </Row>
                    
                    )
                }
            )}
            
            </div>
        )
            
    }

    static getDerivedStateFromProps(props, state){
        //console.log(props.wea);
        if(JSON.stringify(props.wea) !== "{}" && props.wea !==state.prevPropsWea){

            state.list.push(props.wea);
            return{
                prevPropsWea:props.wea
            }
        }
        return null;      
    }
   

}

export default Item;