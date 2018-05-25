import lane_left from "@/assets/imgs/signal/lane_left.svg";
import lane_right from "@/assets/imgs/signal/lane_right.svg";
import lane_vertical from "@/assets/imgs/signal/lane_vertical.svg";
import light_left from "@/assets/imgs/signal/light_left.svg";
import light_right from "@/assets/imgs/signal/light_right.svg";
import light_vertical from "@/assets/imgs/signal/light_vertical.svg";
import light_foot from "@/assets/imgs/signal/light_foot.svg";
import light_left_red from "@/assets/imgs/signal/light_left_red.svg";
import light_right_red from "@/assets/imgs/signal/light_right_red.svg";
import light_vertical_red from "@/assets/imgs/signal/light_vertical_red.svg";
import light_foot_red from "@/assets/imgs/signal/light_foot_red.svg";
import light_left_yellow from "@/assets/imgs/signal/light_left_yellow.svg";
import light_right_yellow from "@/assets/imgs/signal/light_right_yellow.svg";
import light_vertical_yellow from "@/assets/imgs/signal/light_vertical_yellow.svg";
import light_foot_yellow from "@/assets/imgs/signal/light_foot_yellow.svg";
import light_left_green from "@/assets/imgs/signal/light_left_green.svg";
import light_right_green from "@/assets/imgs/signal/light_right_green.svg";
import light_vertical_green from "@/assets/imgs/signal/light_vertical_green.svg";
import light_foot_green from "@/assets/imgs/signal/light_foot_green.svg";
import light_round from "@/assets/imgs/signal/light_round.svg";
import light_round_red from "@/assets/imgs/signal/light_round_red.svg";
import light_round_yellow from "@/assets/imgs/signal/light_round_yellow.svg";
import light_round_green from "@/assets/imgs/signal/light_round_green.svg";

let img_lane = {};
img_lane[3] = new Image();
img_lane[3].src = lane_left;
img_lane[2] = new Image();
img_lane[2].src = lane_vertical;
img_lane[4] = new Image();
img_lane[4].src = lane_right;
let img_light = { 3: {}, 2: {}, 4: {}, 11: {}, round: {} };
img_light[3]['default'] = new Image();
img_light[3]['default'].src = light_left;
img_light[3]['1'] = new Image();
img_light[3]['1'].src = light_left_red;
img_light[3]['6'] = img_light[3]['1'];

img_light[3]['2'] = new Image();
img_light[3]['2'].src = light_left_yellow;
img_light[3]['7'] = img_light[3]['2'];

img_light[3]['3'] = new Image();
img_light[3]['3'].src = light_left_green;
img_light[3]['8'] = img_light[3]['3'];

img_light[2]['default'] = new Image();
img_light[2]['default'].src = light_vertical;
img_light[2]['1'] = new Image();
img_light[2]['1'].src = light_vertical_red;
img_light[2]['6'] = img_light[2]['1'];

img_light[2]['2'] = new Image();
img_light[2]['2'].src = light_vertical_yellow;
img_light[2]['7'] = img_light[2]['2'];

img_light[2]['3'] = new Image();
img_light[2]['3'].src = light_vertical_green;
img_light[2]['8'] = img_light[2]['3'];

img_light[4]['default'] = new Image();
img_light[4]['default'].src = light_right;
img_light[4]['1'] = new Image();
img_light[4]['1'].src = light_right_red;
img_light[4]['6'] = img_light[4]['1'];

img_light[4]['2'] = new Image();
img_light[4]['2'].src = light_right_yellow;
img_light[4]['7'] = img_light[4]['2'];

img_light[4]['3'] = new Image();
img_light[4]['3'].src = light_right_green;
img_light[4]['8'] = img_light[4]['3'];

img_light[11]['default'] = new Image();
img_light[11]['default'].src = light_foot;
img_light[11]['1'] = new Image();
img_light[11]['1'].src = light_foot_red;
img_light[11]['6'] = img_light[4]['1'];

img_light[11]['2'] = new Image();
img_light[11]['2'].src = light_foot_yellow;
img_light[11]['7'] = img_light[4]['2'];

img_light[11]['3'] = new Image();
img_light[11]['3'].src = light_foot_green;
img_light[11]['8'] = img_light[4]['3'];

img_light['round']['default'] = new Image();
img_light['round']['default'].src = light_round;
img_light['round']['1'] = new Image();
img_light['round']['1'].src = light_round_red;
img_light['round']['6'] = img_light[11]['1'];

img_light['round']['2'] = new Image();
img_light['round']['2'].src = light_round_yellow;
img_light['round']['7'] = img_light[11]['2'];

img_light['round']['3'] = new Image();
img_light['round']['3'].src = light_round_green;
img_light['round']['8'] = img_light[11]['3'];


export default { img_lane, img_light }