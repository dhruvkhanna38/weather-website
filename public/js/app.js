console.log("Client Side javascript");



const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const para1 = document.querySelector("#para1");
const para2 = document.querySelector("#para2");

weatherForm.addEventListener('submit' , (e) => {
        e.preventDefault();
        var location = search.value;
        console.log(location);
        fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/" + location + ".json?access_token=pk.eyJ1IjoiZGhydXZraGFubmEzOCIsImEiOiJjanlnY3J2MWcwMW93M2htanByYnRhYWtlIn0.FbWwGiDUq-KSmbPBt7bvrA").then((response)=>{
            response.json().then((data)=>{
                    if(data.features.length === 0){
                        console.log("Invalid Address")
                        para2.textContent = "Invaid Address";
                        para1.textContent = "";
                    }
                    else{
                        console.log(data.features[0].center);
                        para1.textContent = data.features[0].center;
                        para2.textContent = "";

                    }
            });
});

});