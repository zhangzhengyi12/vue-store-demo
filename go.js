"auto";

console.show();

var openAppRes = launchApp("应用商店");
if (!openAppRes) {
    console.log("打开失败");
    exit();
}
console.log("打开商店成功，等待下一步");

sleep(2000);

var UIObj = desc("红包").findOne();
var rect = UIObj.bounds();
var x = rect.centerX();
var y = rect.centerY();
console.log(x+":"+y);
Tap(x, y);
sleep(300)
console.log("打开红包成功");