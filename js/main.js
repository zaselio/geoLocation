window.addEventListener("DOMContentLoaded", function () {

    document.getElementById("find-me").addEventListener("click",geoFindMe);
    document.getElementById("shareBtn").addEventListener("click",share);

    var linkToShare="";
    var titleToShare="";
    
    function geoFindMe(){
        //console.log("geoFindMe");
        if ('geolocation' in navigator) {
            document.getElementById("status").textContent="מאתר את מיקומך";

            navigator.geolocation.getCurrentPosition(success,error);

          } else {
            document.getElementById("status").textContent="הדפדפן לא תומך באיתור מיקום";
          }          
    }
    function success(position){
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        linkToShare = `https://maps.google.com/?q=${latitude},${longitude}`;
        titleToShare = `Latitude: ${latitude} °, Longitude: ${longitude} °`;

        document.getElementById("map-link").textContent=titleToShare;
        document.getElementById("iframe").src=linkToShare;
        document.getElementById("iframe").classList.remove("d-none");
    }

    function error(){
        document.getElementById("status").textContent="הדפדפן לא הצליח לאחזר את מיקומך";
    }

    function share(){
        if(navigator.share){
            const shareData ={
                title:"my Geo Location",
                text:titleToShare,
                ur:linkToShare,
            }
            navigator.share(shareData);
        }
        else{
            document.getElementById("status").textContent="הדפדפן לא הצליח לשתף את מיקומך";
        }
    }
})