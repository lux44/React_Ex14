// RN 데이터의 흐름이 단방향으로만 이루어짐. (부모 컴포넌트가 자식-자손들에게 데이터를 속성으로 전달함.)
// 그래서 만약 계층구조가 많으면 데이터를 전달-전달-전달... 해야함.
// 또한 자식 컴포넌트는 부모쪽으로 데이터를 보낼 수 없음,
// 또한 자식 컴포넌트끼리도 데이터를 서로 주고 받을 수 없음.

// 계층구조가 적으면 좋은 방법임. 데이터의 관리가 용이함.
// 하지만 계층구조가 많아지면 많아질수록 전달이 많아져서 번거로움.

// 그래서 Fulx 라는 아키텍쳐 패턴을 만들었음.
// 간단하게 말하면 전역변수들만 있는 영역을 따로 만들고 어디서든 이 변수들을 사용하도록 하는 기법임.
// 이를 가장 잘 구현한 라이브러리가 리덕스(Redux)임.
// 하지만 초기 학습 과정이 다소 어려움. 
// 그래서 RN팀에서 리덕스처럼 Flux 패턴을 구현 할 수 있는 Api를 제공함.
// 이를 Context API 라고 부름!

import React, {Component} from "react";
import {View, Text, Button} from 'react-native'

export default class Main extends Component{

    state={ data:'Hello'}

    changeData=()=>this.setState({data:'Good'})

    render(){
        return(
            <View style={{flex:1, padding:16,}}>
                <Text>Main : {this.state.data}</Text>

                 {/* 자식 컴포넌트에게 data를 전달 */}
                 <First data={this.state.data} onPress={()=>{this.changeData()}}></First>
            </View>
        )
    }
}

class First extends Component{
    render(){
        return(
            <View style={{backgroundColor:'yellow', padding:16,}}>
                {/* this.props라는 변수에 전달된 data 출력 */}
                <Text>First : {this.props.data}</Text>

                {/* 전달받은 data와 손주 컴포넌트에게 전달  */}
                <Third data={this.props.data} onPress={this.props.onPress}></Third>

            </View>
        )
    }
}

// 함수형 컴포넌트로 만들어보기 - [state, props, lifecycle 메소드 없음]
const Third = (props)=>{
    return(
        <View style={{backgroundColor:'aqua',}}>
            {/* 파라미터에 전달받은 속성 data를 보여주기 */}
            <Text>Third : {props.data}</Text>
            <Button title="글씨 변경" onPress={props.onPress}></Button>
        </View>
    )
}