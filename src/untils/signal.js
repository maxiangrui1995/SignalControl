import imgs from "@/untils/imgs";


/* canvas: null,
      ctx: null,
      // 双黄线属性
      yellowWidth: 4,
      yellowColor: "#a5a756",
      // 人行道属性
      wayWidth: 30,
      wayColor: "#ccc",
      // 车行道属性
      laneWidth: 30,
      laneColor: "#ddd",
      // 每个方向的车道数目
      n1: 4,
      n3: 4,
      n5: 4,
      n7: 4,
      // 类似于内边距
      o1: null,
      o3: null,
      o5: null,
      o7: null,
      // 每个方向的车道类型
      target1: [],
      target3: [],
      target5: [],
      target7: [] */


const APP = elem => {
    return new _APP(elem)
}
const _APP = function (elem) {
    this.canvas = elem;
    this.ctx = elem.getContext('2d');
    return this;
}

const view = function (params) {
    // 画布属性
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;
    const ctx = this.canvas.getContext('2d');
    // 画布中心点
    let cX = canvasWidth / 2;
    let cY = canvasHeight / 2;
    // 双黄线属性
    const yellowWidth = 4;
    const yellowColor = "#a5a756";
    // 人行道属性
    const wayWidth = 30;
    const wayColor = "#ccc";
    // 车行道属性
    const laneWidth = 30;
    const laneColor = "#ddd";

    let { crossingData, lightData } = params;
    // 设置路口
    let formatterCrossing_num = {};
    let formatterCrossing_target = {};
    crossingData.forEach(item => {
        formatterCrossing_num['n' + item.direction] = ~~item.roadnum;
        formatterCrossing_target['target' + item.direction] = item.target;
    });
    // 每个方向的车道数目
    let { n1, n3, n5, n7 } = formatterCrossing_num;
    // 每个方向的车道类型
    let { target1, target3, target5, target7 } = formatterCrossing_target;
    // 类似于内边距
    let o1 = cY - yellowWidth - laneWidth * n3 - wayWidth * 2;
    let o3 = cX + yellowWidth + laneWidth * n5 + wayWidth * 2;
    let o5 = cY + yellowWidth + laneWidth * n7 + wayWidth * 2;
    let o7 = cX - yellowWidth - laneWidth * n1 - wayWidth * 2;
    // 类似于起点
    let t1 = cX - 1 - yellowWidth;
    let t5 = cX + 1 + yellowWidth;
    let t3 = cY - 1 - yellowWidth;
    let t7 = cY + 1 + yellowWidth;

    // 绘制双黄线
    const drawYellow = () => {
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = yellowWidth;
        ctx.strokeStyle = yellowColor;
        let x1 = cX - 4;
        let x2 = cX + 4;
        let y1 = cY - 4;
        let y2 = cY + 4;
        // 1方向
        ctx.moveTo(x1, 0);
        ctx.lineTo(x1, o1);
        ctx.moveTo(x2, 0);
        ctx.lineTo(x2, o1);
        // 3
        ctx.moveTo(canvasWidth, y1);
        ctx.lineTo(o3, y1);
        ctx.moveTo(canvasWidth, y2);
        ctx.lineTo(o3, y2);
        // 5
        ctx.moveTo(x1, canvasHeight);
        ctx.lineTo(x1, o5);
        ctx.moveTo(x2, canvasWidth);
        ctx.lineTo(x2, o5);
        // 7
        ctx.moveTo(0, y1);
        ctx.lineTo(o7, y1);
        ctx.moveTo(0, y2);
        ctx.lineTo(o7, y2);

        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }
    drawYellow();
    // 绘制行车道
    const drawLane = () => {
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = laneColor;
        // 1
        for (let i = 1; i < n1; i++) {
            ctx.moveTo(t1 - laneWidth * i, 0);
            ctx.lineTo(t1 - laneWidth * i, o1 - 4);
        }
        ctx.moveTo(o7 + wayWidth * 2, o1 - 4);
        ctx.lineTo(cX - 2 - yellowWidth, o1 - 4);
        // 3
        for (let i = 1; i < n3; i++) {
            ctx.moveTo(o3 + 4, t3 - laneWidth * i);
            ctx.lineTo(canvasWidth, t3 - laneWidth * i);
        }
        ctx.moveTo(o3 + 4, o1 + wayWidth * 2);
        ctx.lineTo(o3 + 4, cY - 2 - yellowWidth);
        // 5
        for (let i = 1; i < n5; i++) {
            ctx.moveTo(t5 + laneWidth * i, canvasHeight);
            ctx.lineTo(t5 + laneWidth * i, o5 + 4);
        }
        ctx.moveTo(o3 - wayWidth * 2, o5 + 4);
        ctx.lineTo(cX + 2 + yellowWidth, o5 + 4);
        // 7
        for (let i = 1; i < n7; i++) {
            ctx.moveTo(o7 - 4, t7 + laneWidth * i);
            ctx.lineTo(0, t7 + laneWidth * i);
        }
        ctx.moveTo(o7 - 4, o5 - wayWidth * 2);
        ctx.lineTo(o7 - 4, cY + 2 + yellowWidth);

        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
    drawLane();
    // 绘制虚线行车道
    const drawDashLane = () => {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = laneColor;
        // 1
        ctx.setLineDash([10]);
        for (let i = 1; i < n1; i++) {
            ctx.moveTo(t1 - laneWidth * i, o5);
            ctx.lineTo(t1 - laneWidth * i, canvasHeight);
        }
        // 5
        for (let i = 1; i < n5; i++) {
            ctx.moveTo(t5 + laneWidth * i, o1);
            ctx.lineTo(t5 + laneWidth * i, 0);
        }
        // 3
        for (let i = 1; i < n3; i++) {
            ctx.moveTo(o7, t3 - laneWidth * i);
            ctx.lineTo(0, t3 - laneWidth * i);
        }
        // 7
        for (let i = 1; i < n7; i++) {
            ctx.moveTo(o3, t7 + laneWidth * i);
            ctx.lineTo(canvasWidth, t7 + laneWidth * i);
        }
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
    drawDashLane();
    // 绘制人行道
    const drawWay = () => {
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = wayWidth;
        ctx.strokeStyle = wayColor;
        ctx.setLineDash([4]);
        // 1  
        ctx.moveTo(o7 + wayWidth * 2, o1 + wayWidth / 2);
        ctx.lineTo(o3 - wayWidth * 2, o1 + wayWidth / 2);
        // 5
        ctx.moveTo(o7 + wayWidth * 2, o5 - wayWidth / 2);
        ctx.lineTo(o3 - wayWidth * 2, o5 - wayWidth / 2);
        // 3
        ctx.moveTo(o3 - wayWidth / 2, o1 + wayWidth * 2);
        ctx.lineTo(o3 - wayWidth / 2, o5 - wayWidth * 2);
        // 7
        ctx.moveTo(o7 + wayWidth / 2, o1 + wayWidth * 2);
        ctx.lineTo(o7 + wayWidth / 2, o5 - wayWidth * 2);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
    drawWay();
    // 绘制围栏
    const drawWrapper = () => {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = "#ddd";
        ctx.lineWidth = 4;
        // 1
        ctx.moveTo(t1 - laneWidth * n1 - 1, 0);
        ctx.lineTo(t1 - laneWidth * n1 - 1, o1 + wayWidth);
        ctx.moveTo(t5 + laneWidth * n5 + 1, 0);
        ctx.lineTo(t5 + laneWidth * n5 + 1, o1 + wayWidth);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(o3 - wayWidth + 2, o1 + wayWidth - 1, wayWidth, Math.PI * 0.5, Math.PI);
        // 5
        ctx.moveTo(t5 + laneWidth * n5, canvasHeight);
        ctx.lineTo(t5 + laneWidth * n5, o5 - wayWidth);
        ctx.moveTo(t1 - laneWidth * n1, canvasHeight);
        ctx.lineTo(t1 - laneWidth * n1, o5 - wayWidth);
        ctx.stroke();
        ctx.closePath();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(o3 - wayWidth + 1, o5 - wayWidth + 1, wayWidth, Math.PI, Math.PI * 1.5);
        // 3
        ctx.moveTo(o3 - wayWidth, t3 - laneWidth * n3);
        ctx.lineTo(canvasWidth, t3 - laneWidth * n3);
        ctx.moveTo(o3 - wayWidth, t7 + laneWidth * n7);
        ctx.lineTo(canvasWidth, t7 + laneWidth * n7);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(o7 + wayWidth - 1, o5 - wayWidth + 1, wayWidth, Math.PI * 1.5, 0);
        // 7
        ctx.moveTo(o7 + wayWidth, t7 + laneWidth * n7);
        ctx.lineTo(0, t7 + laneWidth * n7);
        ctx.moveTo(o7 + wayWidth, t3 - laneWidth * n3);
        ctx.lineTo(0, t3 - laneWidth * n3);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(o7 + wayWidth - 2, o1 + wayWidth - 1, wayWidth, 0, Math.PI * 2 / 4);

        ctx.stroke();
        ctx.restore();
    }
    drawWrapper();
    // 绘制车道类型
    const drawLaneTarget = () => {

    }
    drawLaneTarget();

}
_APP.prototype = {
    constructor: APP,
    view
}

export default APP;