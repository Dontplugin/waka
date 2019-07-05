import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";
import AudioAnalyser from 'react-audio-analyser'
import { Button, List, Card, Toast, WhiteSpace } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';

const Item = List.Item;
const Brief = Item.Brief;
export default class App extends React.Component {

    
    constructor(props) {
        super(props)
        this.state = {
            status: "",
            audioType: 'audio/wav',
            audioSrc: ''
        }
    }

    componentDidMount() {
        this.getAll();
    }

    controlAudio(status) {
        this.setState({
            status
        })
    }

    changeScheme(e) {
        this.setState({
            audioType: e.target.value
        })
    }

    handleUpload = (file) => {
        const formdata = new FormData();
        formdata.append('file', file);
            
        for (var value of formdata.values()) {
            console.log(value);
        }
        
        const url = 'http://127.0.0.1:8080/file/upload';
        fetch(url, {
            method: 'POST',
            body: formdata,
            mode: 'no-cors',
            headers: {
            }
        }).then(res => {
            Toast.info('上传成功', 1);
            this.getAll();
        }
        ).catch(error => console.log(error));
    };

    getAll() {
        const url = 'http://127.0.0.1:8080/file/getAll';
        fetch(url, {
          method:'GET',
          dataType: "json",
          headers:{
            'Content-Type':'application/json;charset=UTF-8'
          },
        //   mode: 'no-cors'
        }).then(response => {
          console.log(response);
        }).catch(error => console.log(error));
      }

    render() {
        const {status, audioSrc, audioType} = this.state;
        const audioProps = {
            audioType,
            // audioOptions: {sampleRate: 8000}, // 设置输出音频采样率
            status,
            audioSrc,
            timeslice: 1000, // timeslice（https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/start#Parameters）
            startCallback: (e) => {
                console.log("succ start", e)
            },
            pauseCallback: (e) => {
                console.log("succ pause", e)
            },
            stopCallback: (e) => {
                console.log("stop信息", e)
                var path = window.URL.createObjectURL(e)
                this.setState({
                    audioSrc: path
                })
                let file = new File([e], "hello.wav")
                this.handleUpload(file)

                console.log("文件", file)
            },
            onRecordCallback: (e) => {
                console.log("recording", e)
            },
            errorCallback: (err) => {
                console.log("error", err)
            }
        }
        return (
            <div>
                <div style={{marginBottom: '20px'}}>
                    <WhiteSpace size="lg" />
                    <Card full>
                    <Card.Header
                        title="文本标题"
                        thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                        extra={<span></span>}
                    />
                    <Card.Body>
                        <div>撒多好萨达搜到黑白搜到哈市</div>
                    </Card.Body>
                    {/* <Card.Footer content="footer content" extra={<div>extra footer content</div>} /> */}
                    </Card>
                </div>
                <AudioAnalyser {...audioProps}>
                    <div className="btn-box">
                        {status !== "recording" &&
                        <i className="iconfont icon-start" title="开始"
                           onClick={() => this.controlAudio("recording")}></i>}

                        {status === "recording" &&
                        <i className="iconfont icon-pause" title="暂停"
                           onClick={() => this.controlAudio("paused")}></i>}
                           
                        <i className="iconfont icon-stop" title="停止"
                           onClick={() => this.controlAudio("inactive")}></i>
                    </div>
                </AudioAnalyser>
                <p>输出文件类型</p>
                <select name="" id="" onChange={(e) => this.changeScheme(e)} value={audioType}>
                    <option value="audio/webm">audio/webm（default）</option>
                    <option value="audio/wav">audio/wav</option>
                    <option value="audio/mp3">audio/mp3</option>
                </select>

                <div>
                    <Button type="warning" onClick={(e) => {
                        this.handleUpload()
                    }}>提交</Button>

                    <List renderHeader={() => '已上传列表'} className="my-list">
                        <Item extra="10:30" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
                            Title <Brief>subtitle</Brief>
                        </Item>
                        <Item extra="10:30" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
                            Title <Brief>subtitle</Brief>
                        </Item>
                        <Item extra="10:30" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
                            Title <Brief>subtitle</Brief>
                        </Item>
                        <Item extra="10:30" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
                            Title <Brief>subtitle</Brief>
                        </Item>
                        <Item extra="10:30" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
                            Title <Brief>subtitle</Brief>
                        </Item>
                        <Item extra="10:30" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
                            Title <Brief>subtitle</Brief>
                        </Item>
                        <Item extra="10:30" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
                            Title <Brief>subtitle</Brief>
                        </Item>
                    </List>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));


