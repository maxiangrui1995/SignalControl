export default data => {
    let YY = data.getFullYear();
    let MM = data.getMonth();
    let DD = data.getDate();
    let H = data.getHours();
    let M = data.getMinutes();
    let S = data.getMinutes();
    return YY + '/' + MM + '/' + DD + ' ' + H + ':' + M;
}