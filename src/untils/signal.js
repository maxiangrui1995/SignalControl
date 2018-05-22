import imgs from "@/untils/imgs";
// 图片信息
let { img_lane, img_light } = imgs;

/* 绘制信号机试图 */
const VIEW = {
    ele: null,//dom
    ctx: null,//画布2d
    show(elem) {
        console.log(elem);

    }
};

const APP = elem => {
    return new _APP(elem)
}
const _APP = function (elem) {
    this.canvas = elem;
    this.ctx = elem.getContext('2d');
    return this;
}

const view = function (params, X, Y) {
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
    this.crossingData = crossingData || [];
    this.lightData = lightData || [];

    // 设置路口
    let formatterCrossing_num = {};
    let formatterCrossing_target = {};
    this.crossingData.forEach(item => {
        formatterCrossing_num['n' + item.direction] = ~~item.roadnum;
        formatterCrossing_target['target' + item.direction] = item.target;
    });
    // 每个方向的车道数目
    let { n1, n3, n5, n7 } = formatterCrossing_num;
    // 每个方向的车道类型
    let { target1, target3, target5, target7 } = formatterCrossing_target;
    // 类似于内边距
    let o1 = cY - yellowWidth - laneWidth * n3 - wayWidth * 3;
    let o3 = cX + yellowWidth + laneWidth * n5 + wayWidth * 3;
    let o5 = cY + yellowWidth + laneWidth * n7 + wayWidth * 3;
    let o7 = cX - yellowWidth - laneWidth * n1 - wayWidth * 3;
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
    // drawYellow();
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
        ctx.moveTo(o7 + wayWidth * 3, o1 - 4);
        ctx.lineTo(cX - 2 - yellowWidth, o1 - 4);
        // 3
        for (let i = 1; i < n3; i++) {
            ctx.moveTo(o3 + 4, t3 - laneWidth * i);
            ctx.lineTo(canvasWidth, t3 - laneWidth * i);
        }
        ctx.moveTo(o3 + 4, o1 + wayWidth * 3);
        ctx.lineTo(o3 + 4, cY - 2 - yellowWidth);
        // 5
        for (let i = 1; i < n5; i++) {
            ctx.moveTo(t5 + laneWidth * i, canvasHeight);
            ctx.lineTo(t5 + laneWidth * i, o5 + 4);
        }
        ctx.moveTo(o3 - wayWidth * 3, o5 + 4);
        ctx.lineTo(cX + 2 + yellowWidth, o5 + 4);
        // 7
        for (let i = 1; i < n7; i++) {
            ctx.moveTo(o7 - 4, t7 + laneWidth * i);
            ctx.lineTo(0, t7 + laneWidth * i);
        }
        ctx.moveTo(o7 - 4, o5 - wayWidth * 3);
        ctx.lineTo(o7 - 4, cY + 2 + yellowWidth);

        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
    // drawLane();
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
    // drawDashLane();
    // 绘制人行道
    const drawWay = () => {
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = wayWidth;
        ctx.strokeStyle = wayColor;
        ctx.setLineDash([4]);
        // 1  
        ctx.moveTo(o7 + wayWidth * 3, o1 + wayWidth / 2);
        ctx.lineTo(o3 - wayWidth * 3, o1 + wayWidth / 2);
        // 5
        ctx.moveTo(o7 + wayWidth * 3, o5 - wayWidth / 2);
        ctx.lineTo(o3 - wayWidth * 3, o5 - wayWidth / 2);
        // 3
        ctx.moveTo(o3 - wayWidth / 2, o1 + wayWidth * 3);
        ctx.lineTo(o3 - wayWidth / 2, o5 - wayWidth * 3);
        // 7
        ctx.moveTo(o7 + wayWidth / 2, o1 + wayWidth * 3);
        ctx.lineTo(o7 + wayWidth / 2, o5 - wayWidth * 3);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
    // drawWay();
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
        ctx.arc(o3 - wayWidth + 2, o1 + wayWidth - 1, wayWidth * 2, Math.PI * 0.5, Math.PI);
        // 5
        ctx.moveTo(t5 + laneWidth * n5, canvasHeight);
        ctx.lineTo(t5 + laneWidth * n5, o5 - wayWidth);
        ctx.moveTo(t1 - laneWidth * n1, canvasHeight);
        ctx.lineTo(t1 - laneWidth * n1, o5 - wayWidth);
        ctx.stroke();
        ctx.closePath();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(o3 - wayWidth + 1, o5 - wayWidth + 1, wayWidth * 2, Math.PI, Math.PI * 1.5);
        // 3
        ctx.moveTo(o3 - wayWidth, t3 - laneWidth * n3);
        ctx.lineTo(canvasWidth, t3 - laneWidth * n3);
        ctx.moveTo(o3 - wayWidth, t7 + laneWidth * n7);
        ctx.lineTo(canvasWidth, t7 + laneWidth * n7);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(o7 + wayWidth - 1, o5 - wayWidth + 1, wayWidth * 2, Math.PI * 1.5, 0);
        // 7
        ctx.moveTo(o7 + wayWidth, t7 + laneWidth * n7);
        ctx.lineTo(0, t7 + laneWidth * n7);
        ctx.moveTo(o7 + wayWidth, t3 - laneWidth * n3);
        ctx.lineTo(0, t3 - laneWidth * n3);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(o7 + wayWidth - 2, o1 + wayWidth - 1, wayWidth * 2, 0, Math.PI * 2 / 4);

        ctx.stroke();
        ctx.restore();
    }
    // drawWrapper();
    // 绘制车道类型
    const drawLaneTarget = () => {
        let fn = (x, y, p, t) => {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(Math.PI / 180 * p);
            ctx.globalAlpha = 0.3;
            ctx.drawImage(img_lane[t], 0, 0);
            ctx.restore();
        }
        // 1
        for (let i = 0; i < n1; i++) {
            fn(t1 - laneWidth * i, o1 - 4, 180, target1[i])
        }
        // 3
        for (let i = 0; i < n3; i++) {
            fn(o3 + 4, t3 - laneWidth * i, 270, target3[i])
        }
        // 5
        for (let i = 0; i < n5; i++) {
            fn(t5 + laneWidth * i, o5 + 4, 0, target5[i])
        }
        // 7
        for (let i = 0; i < n7; i++) {
            fn(o7 - 4, t7 + laneWidth * i, 90, target7[i])
        }
    }
    // drawLaneTarget();
    // 绘制信号灯
    const drawLight = () => {
        // console.log(lightData);
        let formatterLightData = {};
        this.lightData.forEach(item => {
            if (!formatterLightData['d' + item.position]) {
                formatterLightData['d' + item.position] = { 'car': [], 'man': [] };
            }
            let f = formatterLightData['d' + item.position]
            if (item.lightorder === "0") {
                f.car.push(item);
            } else {
                f.man.push(item);
            }
        });
        let { d1, d2, d3, d4 } = formatterLightData;
        const drawTitle = (t, x, y, b) => {
            ctx.save();
            ctx.textBaseline = b || 'top';
            ctx.font = "30px Verdana";
            ctx.globalAlpha = 0.6;
            ctx.fillStyle = "#836249";
            ctx.fillText(t, x - ctx.measureText(t).width / 2, y);
            ctx.restore();
        }
        const carLight = () => {
            let fn = (x, y, p, item) => {
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(Math.PI / 180 * p);
                let color = 'default';
                ctx.drawImage(img_light[item.lightsharp === "1" ? item.target : 'round'][color], 0, 0);
                /*   ctx.beginPath();
                  ctx.arc(x, y, 15, 0, Math.PI * 2, true);
                  ctx.fill();
                  ctx.closePath(); */
                // console.log(ctx.isPointInPath(X, Y));
                ctx.restore();
            }
            // 1 - (1)
            for (let i = 0; i < d1.car.length; i++) {
                let x = t1 - laneWidth * (i + n1 - d1.car.length);
                let y = o5 + laneWidth + 4;
                fn(x, y, 180, d1.car[i]);
                drawTitle(d1.car[i].title, x - laneWidth / 2, y, 'hanging');
            }
            // 3 - (2)
            for (let i = 0; i < d2.car.length; i++) {
                let x = o7 - laneWidth - 4;
                let y = t3 - laneWidth * (i + n3 - d2.car.length)
                fn(x, y, 270, d2.car[i]);
                drawTitle(d2.car[i].title, x - laneWidth / 2, y + 3, 'bottom');
            }
            // 5 - (3)
            for (let i = 0; i < d3.car.length; i++) {
                let x = t5 + laneWidth * (i + n5 - d3.car.length);
                let y = o1 - laneWidth - 4
                fn(x, y, 0, d3.car[i]);
                drawTitle(d3.car[i].title, x + laneWidth / 2, y, 'alphabetic');
            }
            // 7 - (4)
            for (let i = 0; i < d4.car.length; i++) {
                let x = o3 + laneWidth + 4;
                let y = t7 + laneWidth * (i + n3 - d4.car.length);
                fn(x, y, 90, d4.car[i]);
                drawTitle(d4.car[i].title, x + laneWidth / 2, y - 3, 'top');
            }
        }
        carLight();
        const manLight = () => {
            let fn = (x, y, p, item) => {
                let color = 'default';
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(Math.PI / 180 * p);

                ctx.drawImage(img_light[11][color], 0, 0);
                ctx.restore();
            }
            // 1
            fn(o7 + laneWidth, o5 - laneWidth * 2 + 4, 180, d1.man[0]);
            fn(o7, o1 + laneWidth * 2 - 4, 0, d1.man[0]);
            drawTitle(d1.man[0].title, o7 + 15, o5 - laneWidth + 4, 'bottom');
            drawTitle(d1.man[0].title, o7 + 15, o1 + laneWidth - 5, 'top');
            // 3
            fn(o7 + laneWidth * 2 - 4, o1 + laneWidth, 270, d2.man[0]);
            fn(o3 - laneWidth * 2 + 4, o1, 90, d2.man[0]);
            drawTitle(d2.man[0].title, o7 + laneWidth + 12, o1 - 4, 'top');
            drawTitle(d2.man[0].title, o3 - laneWidth - 12, o1 - 4, 'top');
            // 5
            fn(o3 - laneWidth, o1 + laneWidth * 2 - 4, 0, d3.man[0]);
            fn(o3, o5 - laneWidth * 2 + 4, 180, d3.man[0]);
            drawTitle(d3.man[0].title, o3 - laneWidth + 15, o1 + laneWidth - 5, 'top');
            drawTitle(d3.man[0].title, o3 - laneWidth + 15, o5 - laneWidth * 2, 'top');
            // 7
            fn(o3 - laneWidth * 2 + 4, o5 - laneWidth, 90, d4.man[0]);
            fn(o7 + laneWidth * 2 - 4, o5, 270, d4.man[0]);
            drawTitle(d4.man[0].title, o3 - laneWidth - 12, o5 - laneWidth, 'top');
            drawTitle(d4.man[0].title, o7 + laneWidth + 12, o5 - laneWidth, 'top');
        }
        manLight();

    }
    // drawLight()

    return this;
}

const clear = function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

const onClick = function (params) {
    let canvas = this.canvas;
    let self = this;
    canvas.addEventListener('click', function (event) {
        let e = event || window.event;
        let x = e.clientX - canvas.getBoundingClientRect().left;
        let y = e.clientY - canvas.getBoundingClientRect().top;
        self.clear();
        self.view({
            crossingData: self.crossingData,
            lightData: self.lightData
        }, x, y);
    }, false);
}

_APP.prototype = {
    constructor: APP,
    view,
    clear,
    onClick
}

export default VIEW;