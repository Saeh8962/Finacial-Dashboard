var DataFrame=require('dataframe-js').DataFrame;
const parse =require('node-html-parser').parse;

// var DataFrame =require('dataframe-js');
var fetch = require('node-fetch');
var request = require('request')
const $ = require('jquery')


// import DataFrame, { Row } from 'dataframe-js';
function getZillowData(town_r,city_r,state_r,hometype){
    if (town_r.length>0){var address = town_r+'-'+city_r+'-'+state_r}
            
    if (city_r.length>0){var address =city_r+'-'+state_r}
            
    else if (state_r.length>0){var address =state_r}
             
    else{ return ("There was an error with the requested address")}
       
    fetch('https://www.zillow.com/'+address+'/', {
            headers: {
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Host': 'www.zillow.com',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Safari/605.1.15',
                'Accept-Language': 'en-us',
                'Connection': 'keep-alive',
            }
        }).then(result => result.text().then(result2=>{
            const root = parse(result2);
            var x =root.querySelector('script[data-zrr-shared-data-key^="mobileSearchPageStore"]')
            var size =x.childNodes[0]._rawText.length-3
            var dataObject = JSON.parse(x.childNodes[0]._rawText.slice(4,size))
            
            var params ={
                mapBounds: dataObject.queryState.mapBounds,
                regionSelection:dataObject.queryState.regionSelection[0]
            }
            var RentUrl ='https://www.zillow.com/search/GetSearchPageState.htm?searchQueryState=%7B%22pagination%22%3A%7B%7D%2C%22mapBounds%22%3A%7B%22west%22%3A'+params.mapBounds.west+'%2C%22east%22%3A'+params.mapBounds.east+'%2C%22south%22%3A'+params.mapBounds.south+'%2C%22north%22%3A'+params.mapBounds.north+'%7D%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A'+params.regionSelection.regionId+'%2C%22regionType%22%3A'+params.regionSelection.regionType+'%7D%5D%2C%22isMapVisible%22%3Atrue%2C%22filterState%22%3A%7B%22isPreMarketForeclosure%22%3A%7B%22value%22%3Afalse%7D%2C%22isForSaleForeclosure%22%3A%7B%22value%22%3Afalse%7D%2C%22isAllHomes%22%3A%7B%22value%22%3Atrue%7D%2C%22isAuction%22%3A%7B%22value%22%3Afalse%7D%2C%22isNewConstruction%22%3A%7B%22value%22%3Afalse%7D%2C%22isForRent%22%3A%7B%22value%22%3Atrue%7D%2C%22isForSaleByOwner%22%3A%7B%22value%22%3Afalse%7D%2C%22isComingSoon%22%3A%7B%22value%22%3Afalse%7D%2C%22isPreMarketPreForeclosure%22%3A%7B%22value%22%3Afalse%7D%2C%22isForSaleByAgent%22%3A%7B%22value%22%3Afalse%7D%7D%2C%22isListVisible%22%3Atrue%7D&wants=\{%22cat1%22:\[%22mapResults%22\]\}'
            var BuyUrl = 'https://www.zillow.com/search/GetSearchPageState.htm?searchQueryState=%7B%22pagination%22%3A%7B%7D%2C%22mapBounds%22%3A%7B%22west%22%3A'+params.mapBounds.west+'%2C%22east%22%3A'+params.mapBounds.east+'%2C%22south%22%3A'+params.mapBounds.south+'%2C%22north%22%3A'+params.mapBounds.north+'%7D%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A'+params.regionSelection.regionId+'%2C%22regionType%22%3A'+params.regionSelection.regionType+'%7D%5D%2C%22isMapVisible%22%3Atrue%2C%22filterState%22%3A%7B%22isAllHomes%22%3A%7B%22value%22%3Atrue%7D%7D%2C%22isListVisible%22%3Atrue%2C%22mapZoom%22%3A8%7D&wants=\{%22cat1%22:\[%22mapResults%22\]\}'
            if(hometype=='rent'){
                var URL =RentUrl;
                let  type='rent'
            }
            else{ 
                var URL =BuyUrl;
                let  type='buy'
            }
            
            fetch(URL, {
                //   'https://www.zillow.com/search/GetSearchPageState.htm?searchQueryState=%7B%22pagination%22%3A%7B%7D%2C%22mapBounds%22%3A%7B%22west%22%3A'+params.mapBounds.west+'%2C%22east%22%3A'+params.mapBounds.west+'%2C%22south%22%3A'+params.mapBounds.south+'%2C%22north%22%3A'+params.mapBounds.north+'%7D%2C%22mapZoom%22%3A12%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A39748%2C%22regionType%22%3A6%7D%5D%2C%22isMapVisible%22%3Atrue%2C                                             %22filterState%22%3A%7B%22monthlyPayment%22%3A%7B%22min%22%3A1800%2C%22max%22%3A3300%7D%2C%22isAllHomes%22%3A%7B%22value%22%3Atrue%7D%2C%22beds%22%3A%7B%22min%22%3A1%7D%2C%22isForRent%22%3A%7B%22value%22%3Atrue%7D%2C%22isForSaleByAgent%22%3A%7B%22value%22%3Afalse%7D%2C%22isForSaleByOwner%22%3A%7B%22value%22%3Afalse%7D%2C%22isNewConstruction%22%3A%7B%22value%22%3Afalse%7D%2C%22isComingSoon%22%3A%7B%22value%22%3Afalse%7D%2C%22isAuction%22%3A%7B%22value%22%3Afalse%7D%2C%22isForSaleForeclosure%22%3A%7B%22value%22%3Afalse%7D%2C%22isPreMarketForeclosure%22%3A%7B%22value%22%3Afalse%7D%2C%22isPreMarketPreForeclosure%22%3A%7B%22value%22%3Afalse%7D%7D%2C%22isListVisible%22%3Atrue%7D&wants=
            headers: {
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Host': 'www.zillow.com',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Safari/605.1.15',
            'Accept-Language': 'en-us',
            'Connection': 'keep-alive',}
            }).then(result=>result.text().then(data=>{
                var ZillowResponse = JSON.parse(data).cat1
            
            var resultsTitle = ZillowResponse.searchList.listResultsTitle
            var Listings = ZillowResponse.searchResults.mapResults
            var listingCount = ZillowResponse.searchList.totalResultCount
            var ListingInfo = Listings.map(function(house){
                var listing ={
                    info: house.hdpData
                }
                return listing
            })
            console.log('responce',ZillowResponse)
            var homeInfo = Object.values(Listings).map(function(listing){return listing})
            // console.log(homeInfo[0])
            var cleanedListing = Listings.map(function(house,indx){
                var beds = house.beds
                var baths = house.baths
                var address = house.address
                if(beds === null){
                    beds = '--'
                }
                if(baths === null){
                    baths = '--'
                }
                const regex = /([^:\/\s]+)/;
                if(address === "--"){
                    address = house.detailUrl.slice(13).match(regex)[0]
                }
                if(house.unitCount){
                    if(house.hdpData){
                        var newListing = {
                        
                        
                            homeType:house.hdpData.homeInfo.homeType,
                            price: house.price,
                            beds: house.minBeds,
                            baths: house.minBaths,
                            area: house.minArea,
                            image:house.imgSrc,
                            unitCount:house.unitCount,
                            address: address,
                            statusType:house.statusType,
                            statusText:house.statusText,
                            link:"www.zillow.com/"+house.detailUrl,
        
            
                            
                            index:indx
                            
                        }
                        return newListing;
                    }
                    var newListing = {
                        
                        
                        homeType:"--",
                        price: house.price,
                        beds: house.minBeds,
                        baths: house.minBaths,
                        area: house.minArea,
                        image:house.imgSrc,
                        unitCount:house.unitCount,
                        address: address,
                        statusType:house.statusType,
                        statusText:house.statusText,
                        link:"www.zillow.com/"+house.detailUrl,
        
                        
                        index:indx
                        
                    }
                    return newListing;
                }
                if(house.hdpData){
                    var newListing = {
                    
                    
                        homeType:house.hdpData.homeInfo.homeType,
                        price: house.price,
                        beds: beds,
                        baths: baths,
                        area: house.area,
                        image:house.imgSrc,
                        unitCount:"--",
                        address: address,
                        statusType:house.statusType,
                        statusText:house.statusText,
                        link: "www.zillow.com/"+house.detailUrl,
        
        
                        
                        index:indx
                        
                    }
                    return newListing;
                }
                var newListing ={
                        homeType:"--",
                        price: house.price,
                        beds: beds,
                        baths: baths,
                        area: house.area,
                        statusType:house.statusType,
                        statusText:house.statusText,
                        image:house.imgSrc,
                        unitCount:"--",
                        address: address,
                        link:"www.zillow.com/"+house.detailUrl,
                        // info: house.hdpData,
                        index:indx
            
                
                        }
                       
                        
                        return newListing
            })
            // console.log()
            const df = new DataFrame({
                column1: cleanedListing.map(function(listing){return listing.price}), // <------ A column
                column2: cleanedListing.map(function(listing){return listing.address}),
                column3: cleanedListing.map(function(listing){return listing.homeType}),
                column4: cleanedListing.map(function(listing){return listing.beds}), // <------ A column
                column5: cleanedListing.map(function(listing){return listing.baths}),
                column6: cleanedListing.map(function(listing){return listing.area}),
                column7: cleanedListing.map(function(listing){return listing.statusType}),
                column8: cleanedListing.map(function(listing){return listing.link}),
                column9: cleanedListing.map(function(listing){return listing.unitCount}),
            }, ['Price', 'Address','homeType','beds','baths','sq_feet','Status','Link','Unit Count']);
            var x = df.toCSV(true, '/Users/samehrlich/Desktop/final-app/client/src/zillowResult.csv')
            
            convertToExcel(address,type)
            }))
        }))
}


function convertToExcel(address,type){
    var fileid=Math.floor(Math.random() * 50)
    var fileName =type+address+'_report'+fileid+'.xlsx'
    const path = require('path');
    const convertCsvToXlsx = require('@aternus/csv-to-xlsx');
    
    // Specifying source directory + file name
    let source = path.join(__dirname, 'zillowResult.csv');
    
    // Specifying destination directory + file name
    let destination = path.join(__dirname, fileName);
    
    // try-catch block for handling exceptions
    try {
    
        // Functions to convert csv to excel
        convertCsvToXlsx(source, destination);
    } catch (e) {
    
    // Handling error
    console.error(e.toString());
}

}
getZillowData("","menlo-park",'ca','rent')

// function hi(){

//     fetch('https://www.zillow.com/menlo-park-ca/', {
//             headers: {
//                 'Accept': '*/*',
//                 'Accept-Encoding': 'gzip, deflate, br',
//                 'Host': 'www.zillow.com',
//                 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Safari/605.1.15',
//                 'Accept-Language': 'en-us',
//                 'Connection': 'keep-alive',
//             }
//         }).then(result => result.text().then(result2=>{
//             const root = parse(result2);
//             var x =root.querySelector('script[data-zrr-shared-data-key^="mobileSearchPageStore"]')
//             var size =x.childNodes[0]._rawText.length-3
//             var dataObject = JSON.parse(x.childNodes[0]._rawText.slice(4,size))
            
//             var params ={
//                 mapBounds: dataObject.queryState.mapBounds,
//                 regionSelection:dataObject.queryState.regionSelection[0]
//             }
//             // console.log(params)
//             fetch('https://www.zillow.com/search/GetSearchPageState.htm?searchQueryState=%7B%22pagination%22%3A%7B%7D%2C%22mapBounds%22%3A%7B%22west%22%3A'+params.mapBounds.west+'%2C%22east%22%3A'+params.mapBounds.east+'%2C%22south%22%3A'+params.mapBounds.south+'%2C%22north%22%3A'+params.mapBounds.north+'%7D%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A'+params.regionSelection.regionId+'%2C%22regionType%22%3A'+params.regionSelection.regionType+'%7D%5D%2C%22isMapVisible%22%3Atrue%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22ah%22%3A%7B%22value%22%3Atrue%7D%7D%2C%22isListVisible%22%3Atrue%2C%22mapZoom%22%3A11%7D&wants=\{%22cat1%22:\[%22mapResults%22\]\}', {
//             headers: {
//             'Accept': '*/*',
//             'Accept-Encoding': 'gzip, deflate, br',
//             'Host': 'www.zillow.com',
//             'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Safari/605.1.15',
//             'Accept-Language': 'en-us',
//             'Connection': 'keep-alive',}
//             }).then(result=>result.text().then(data=>{
//                 var ZillowResponse = JSON.parse(data).cat1
            
//             var resultsTitle = ZillowResponse.searchList.listResultsTitle
//             var Listings = ZillowResponse.searchResults.mapResults
//             var listingCount = ZillowResponse.searchList.totalResultCount
//             var ListingInfo = Listings.map(function(house){
//                 var listing ={
//                     info: house.hdpData
//                 }
//                 return listing
//             })
//             // console.log('responce',Listings)
//             var homeInfo = Object.values(Listings).map(function(listing){return listing})
//             // console.log(homeInfo[0])
//             var cleanedListing = Listings.map(function(house,indx){
//                 var beds = house.beds
//                 var baths = house.baths
//                 var address = house.address
//                 if(beds === null){
//                     beds = '--'
//                 }
//                 if(baths === null){
//                     baths = '--'
//                 }
//                 const regex = /([^:\/\s]+)/;
//                 if(address === "--"){
//                     address = house.detailUrl.slice(13).match(regex)[0]
//                 }
//                 if(house.unitCount){
//                     if(house.hdpData){
//                         var newListing = {
                        
                        
//                             homeType:house.hdpData.homeInfo.homeType,
//                             price: house.price,
//                             beds: house.minBeds,
//                             baths: house.minBaths,
//                             area: house.minArea,
//                             image:house.imgSrc,
//                             unitCount:house.unitCount,
//                             address: address,
//                             statusType:house.statusType,
//                             statusText:house.statusText,
//                             link:"www.zillow.com/"+house.detailUrl,
        
            
                            
//                             index:indx
                            
//                         }
//                         return newListing;
//                     }
//                     var newListing = {
                        
                        
//                         homeType:"--",
//                         price: house.price,
//                         beds: house.minBeds,
//                         baths: house.minBaths,
//                         area: house.minArea,
//                         image:house.imgSrc,
//                         unitCount:house.unitCount,
//                         address: address,
//                         statusType:house.statusType,
//                         statusText:house.statusText,
//                         link:"www.zillow.com/"+house.detailUrl,
        
                        
//                         index:indx
                        
//                     }
//                     return newListing;
//                 }
//                 if(house.hdpData){
//                     var newListing = {
                    
                    
//                         homeType:house.hdpData.homeInfo.homeType,
//                         price: house.price,
//                         beds: beds,
//                         baths: baths,
//                         area: house.area,
//                         image:house.imgSrc,
//                         unitCount:"--",
//                         address: address,
//                         statusType:house.statusType,
//                         statusText:house.statusText,
//                         link: "www.zillow.com/"+house.detailUrl,
        
        
                        
//                         index:indx
                        
//                     }
//                     return newListing;
//                 }
//                 var newListing ={
//                         homeType:"--",
//                         price: house.price,
//                         beds: beds,
//                         baths: baths,
//                         area: house.area,
//                         statusType:house.statusType,
//                         statusText:house.statusText,
//                         image:house.imgSrc,
//                         unitCount:"--",
//                         address: address,
//                         link:"www.zillow.com/"+house.detailUrl,
//                         // info: house.hdpData,
//                         index:indx
            
                
//                         }
                       
                        
//                         return newListing
//             })
//             // console.log()
//             const df = new DataFrame({
//                 column1: cleanedListing.map(function(listing){return listing.price}), // <------ A column
//                 column2: cleanedListing.map(function(listing){return listing.address}),
//                 column3: cleanedListing.map(function(listing){return listing.homeType}),
//                 column4: cleanedListing.map(function(listing){return listing.beds}), // <------ A column
//                 column5: cleanedListing.map(function(listing){return listing.baths}),
//                 column6: cleanedListing.map(function(listing){return listing.area}),
//                 column7: cleanedListing.map(function(listing){return listing.statusType}),
//                 column8: cleanedListing.map(function(listing){return listing.link}),
//                 column9: cleanedListing.map(function(listing){return listing.unitCount}),
//             }, ['Price', 'Address','homeType','beds','baths','sq_feet','Status','Link','Unit Count']);
//             var x = df.toCSV(true, '/Users/samehrlich/Desktop/final-app/client/src/zillowResult.csv')
            
//             convertToExcel()
//             }))
//         }))
    
// }
// hi()

// console.log(Math.floor(Math.random() * 1000))

