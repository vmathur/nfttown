// export default function UpdateTimeOfDay() {
//     let [color, opacity] = getColorFromTime()
//     // document.getElementById("rectangle").style.backgroundColor = color;
//     // document.getElementById("rectangle").style.opacity = opacity;
//     return [color, opacity];
// }

export default function getColorFromTime(){
    let dt = new Date();
    dt.setTime(dt.getTime()+dt.getTimezoneOffset()*60*1000);
    let offset = -300; //Timezone offset for EST in minutes.
    let estDate = new Date(dt.getTime() + offset*60*1000);

    let hour = estDate.getHours()

    if(hour >=0 && hour < 4){
        return ['blue', 0.4] //night
    }else if(hour >=4 && hour < 11){
        return ['orange', 0.2] //morning
    }else if(hour>=11 && hour < 16){
        return ['white',0]  //afternoon
    }else if(hour>=16 && hour < 20){
        return ['orange',0.2] //evening
    }else if(hour>=20 && hour <= 24){
        return ['blue',0.4]  //night
    }else{
        return ['white',0]
    }
}