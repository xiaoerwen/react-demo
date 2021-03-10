import React from 'react';
import './main.css';

/**
 * 设计交通信号灯
 */
class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lights: [
                // 红灯，亮2s，闪烁500ms
                {color: '#ff4500', duration: 2000, twinkleDuration: 500, isLighted: false},
                // 黄灯，亮2s，闪烁500ms
                {color: '#FFD700', duration: 2000, twinkleDuration: 500, isLighted: false},
                // 绿灯，亮1s
                {color: '#32CD32', duration: 1000, isLighted: false}
            ]
            
        }
    }

    /**
     * 灯的颜色和数据的映射关系
     *
     * @param {string} color
     */
    getLightsMap(color) {
        const maps = {
            red: 0,
            yellow: 1,
            green: 2
        };
        return maps[color];
    }

    /**
     * 为信号灯添加背景色
     *
     * @param {string} color
     */
    addLightedStyle(color) {
        const light = this.state.lights[this.getLightsMap(color)];
        return light.isLighted ? light.color : '#fff';
    }

    render() {
        return (
            <div>
                <div className="light" style={{backgroundColor: this.addLightedStyle('red')}}>red</div>
                <div className="light" style={{backgroundColor: this.addLightedStyle('yellow')}}>yellow</div>
                <div className="light" style={{backgroundColor: this.addLightedStyle('green')}}>green</div>
            </div>
        );
    }

    componentDidMount() {
        this.start();
    }

    // 启动信号灯变化
    start() {
        // 播放顺序为 红->黄->绿->红->黄->绿
        let playArr = [0, 1, 2, 0, 1, 2];
        // 每个信号灯执行结束，是否进入下一个信号灯播放，存入回调函数
        let len = playArr.length;
        let cbs = new Array(len);
        for (let i = len - 1; i > 0; i--) {
            cbs[i - 1] = () => this.setLightedTime(playArr[i], cbs[i]);
        }
        // 开始第一个灯的播放
        this.setLightedTime(playArr[0], cbs[0]);
    }

    /**
     * 变换灯的颜色
     *
     * @param {number} colorIdx 
     */
    toggleLighted(colorIdx) {
        let light = this.state.lights[colorIdx];
        let value = Object.assign(
            {},
            light,
            {isLighted: !light.isLighted}
        );
        this.setState({
            lights: this.state.lights.map((item, key) => key === colorIdx ? value : item)
        });
    }

    /**
     * 设置亮灯时长
     *
     * @param {number} colorIdx 
     * @param {Function} callback 
     */
    setLightedTime(colorIdx, callback) {
        // 先亮灯
        this.toggleLighted(colorIdx);

        // 设置亮灯时长
        let lightTime = this.state.lights[colorIdx].duration;
        setTimeout(() => {
            // 是否闪烁
            let blingTime = this.state.lights[colorIdx].twinkleDuration;
            if (blingTime && callback) {
                this.blingLightTime(colorIdx, blingTime, callback);
            }
            // 绿灯不闪烁，直接熄灯
            else if (callback) {
                this.toggleLighted(colorIdx);
                callback();
            }
        }, lightTime);
    }

    /**
     * 闪烁灯
     *
     * @param {number} colorIdx 
     * @param {number} blingTime 
     * @param {Function} callback 
     */
    blingLightTime(colorIdx, blingTime, callback) {
        // 通过切换背景颜色来达到闪烁的目的
        let myInterval = setInterval(() => {
            this.toggleLighted(colorIdx);
        }, 100);
        setTimeout(() => {
            clearInterval(myInterval);
            callback();
        }, blingTime);
    }
}

export default Main;
