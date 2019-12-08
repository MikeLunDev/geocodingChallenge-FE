export const isWindowWidthXs = ()=>{
    return Math.max(
     document.documentElement["clientWidth"],
     document.body["scrollWidth"],
     document.documentElement["scrollWidth"],
     document.body["offsetWidth"],
     document.documentElement["offsetWidth"]
 ) < 576 ? true : false
   }