var DataFrame=require('dataframe-js').DataFrame;
// var DataFrame =require('dataframe-js');
var fetch = require('node-fetch');

// import DataFrame, { Row } from 'dataframe-js';
function getZillowData(town_r,city_r,state_r){
    //clean through address information 
//   These are local variables used to help gather the list of url that we want to request
        fetch('https://www.zillow.com/stanford-ca/', {
            headers: {
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Host': 'www.zillow.com',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Safari/605.1.15',
                'Accept-Language': 'en-us',
                'Connection': 'keep-alive',
            }
        }).then(result => console.log(JSON.stringify(result.headers)))
        // if (town_r.length>0){
        //     var address =town_r+'-'+city_r+'-'+state_r+'/'
        // }
            
        // else if (city_r.length>0){
        //     var address =city_r+'-'+state_r+'/'
        // }
            
        // else if (state_r.length>0){
        //     var address =state_r+'/'
        // }
             
        // else{
        //     return ("There was an error with the requested address")

        // }
        // console.log(address)
        // region%3Dstanford-ca%26rect%3D37.4375%252C-122.149475%252C37.383029%252C-122.19473
//         fetch('https://www.zillow.com/search/GetSearchPageState.htm?searchQueryState=%7B%22pagination%22%3A%7B%7D%2C%22mapBounds%22%3A%7B%22west%22%3A-122.36375114160158%2C%22east%22%3A-121.99433585839846%2C%22south%22%3A37.36606765486998%2C%22north%22%3A37.55193003681727%7D%2C%22mapZoom%22%3A11%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A39748%2C%22regionType%22%3A6%7D%5D%2C%22isMapVisible%22%3Atrue%2C%22filterState%22%3A%7B%22isAllHomes%22%3A%7B%22value%22%3Atrue%7D%2C%22sortSelection%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%7D%2C%22isListVisible%22%3Atrue%7D&wants=\{%22cat1%22:\[%22mapResults%22\]\}', {
// // "https://www.zillow.com/menlo-park-ca/                                                                                                                                                                                                                                           2C%22mapZoom%22%3A13                                                                                                    
// headers: {
//             'Accept': '*/*',
//             'Accept-Encoding': 'gzip, deflate, br',
//             'Host': 'www.zillow.com',
//             'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Safari/605.1.15',
//             'Accept-Language': 'en-us',
//             'Connection': 'keep-alive',
//         }
// }).then(result => {console.log(result)
//     result.text().then(result1=>console.log(result1))
// })
// result.text().then(result1=>{
//     console.log(result1)
   
    // var ZillowResponse = JSON.parse(result1).cat1
    // var resultsTitle = ZillowResponse.searchList.listResultsTitle
    // var Listings = ZillowResponse.searchResults.mapResults
    // var listingCount = ZillowResponse.searchList.totalResultCount
    // var ListingInfo = Listings.map(house=>{
    //     var listing ={
    //         info: house.hdpData
    //     }
    //     return listing
    // })
    // // console.log(result1)
    // var homeInfo = Object.values(Listings).map(listing=>listing)
    // // console.log(homeInfo[0])
    // var cleanedListing = Listings.map((house,indx)=>{
    //     var beds = house.beds
    //     var baths = house.baths
    //     var address = house.address
    //     if(beds === null){
    //         beds = '--'
    //     }
    //     if(baths === null){
    //         baths = '--'
    //     }
    //     const regex = /([^:\/\s]+)/;
    //     if(address === "--"){
    //         address = house.detailUrl.slice(13).match(regex)[0]
    //     }
    //     if(house.unitCount){
    //         if(house.hdpData){
    //             var newListing = {
                
                
    //                 homeType:house.hdpData.homeInfo.homeType,
    //                 price: house.price,
    //                 beds: house.minBeds,
    //                 baths: house.minBaths,
    //                 area: house.minArea,
    //                 image:house.imgSrc,
    //                 unitCount:house.unitCount,
    //                 address: address,
    //                 statusType:house.statusType,
    //                 statusText:house.statusText,
    //                 link:"www.zillow.com/"+house.detailUrl,

    
                    
    //                 index:indx
                    
    //             }
    //             return newListing;
    //         }
    //         var newListing = {
                
                
    //             homeType:"--",
    //             price: house.price,
    //             beds: house.minBeds,
    //             baths: house.minBaths,
    //             area: house.minArea,
    //             image:house.imgSrc,
    //             unitCount:house.unitCount,
    //             address: address,
    //             statusType:house.statusType,
    //             statusText:house.statusText,
    //             link:"www.zillow.com/"+house.detailUrl,

                
    //             index:indx
                
    //         }
    //         return newListing;
    //     }
    //     if(house.hdpData){
    //         var newListing = {
            
            
    //             homeType:house.hdpData.homeInfo.homeType,
    //             price: house.price,
    //             beds: beds,
    //             baths: baths,
    //             area: house.area,
    //             image:house.imgSrc,
    //             unitCount:"--",
    //             address: address,
    //             statusType:house.statusType,
    //             statusText:house.statusText,
    //             link: "www.zillow.com/"+house.detailUrl,


                
    //             index:indx
                
    //         }
    //         return newListing;
    //     }
    //     var newListing ={
    //             homeType:"--",
    //             price: house.price,
    //             beds: beds,
    //             baths: baths,
    //             area: house.area,
    //             statusType:house.statusType,
    //             statusText:house.statusText,
    //             image:house.imgSrc,
    //             unitCount:"--",
    //             address: address,
    //             link:"www.zillow.com/"+house.detailUrl,
    //             // info: house.hdpData,
    //             index:indx
    
        
    //             }
               
                
    //             return newListing
    // })
    // const df = new DataFrame({
    //     column1: cleanedListing.map(listing=>listing.price), // <------ A column
    //     column2: cleanedListing.map(listing=>listing.address),
    //     column3: cleanedListing.map(listing=>listing.homeType),
    //     column4: cleanedListing.map(listing=>listing.beds), // <------ A column
    //     column5: cleanedListing.map(listing=>listing.baths),
    //     column6: cleanedListing.map(listing=>listing.area),
    //     column7: cleanedListing.map(listing=>listing.statusType),
    //     column8: cleanedListing.map(listing=>listing.link),
    //     column9: cleanedListing.map(listing=>listing.unitCount),
    // }, ['Price', 'Address','homeType','beds','baths','sq_feet','Status','Link','Unit Count']);
    // var x = df.toCSV(true, '/Users/samehrlich/Desktop/final-app/client/src/zillowResult.csv')
    
    // convertToExcel()

// }))
}


function convertToExcel(){
    const path = require('path');
    const convertCsvToXlsx = require('@aternus/csv-to-xlsx');
    
    // Specifying source directory + file name
    let source = path.join(__dirname, 'zillowResult.csv');
    
    // Specifying destination directory + file name
    let destination = path.join(__dirname, 'converted_report1.xlsx');
    
    // try-catch block for handling exceptions
    try {
    
        // Functions to convert csv to excel
        convertCsvToXlsx(source, destination);
    } catch (e) {
    
    // Handling error
    console.error(e.toString());
}
}
getZillowData("","menlo-park",'ca')