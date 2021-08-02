var DataFrame=require('dataframe-js').DataFrame;
const parse =require('node-html-parser').parse;

// var DataFrame =require('dataframe-js');
var fetch = require('node-fetch');
var request = require('request')
const $ = require('jquery')

// import DataFrame, { Row } from 'dataframe-js';
function getZillowData(town_r,city_r,state_r){
    //clean through address information 
//   These are local variables used to help gather the list of url that we want to request
        // fetch('https://www.zillow.com/stanford-ca/', {
        //     headers: {
        //         'Accept': '*/*',
        //         'Accept-Encoding': 'gzip, deflate, br',
        //         'Host': 'www.zillow.com',
        //         'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Safari/605.1.15',
        //         'Accept-Language': 'en-us',
        //         'Connection': 'keep-alive',
        //     }
        // }).then(result => console.log(result.headers))
       
        
        var params = {
            searchQueryState: {
                "pagination":{},
                "mapBounds":{"west":-105.53904940380858,"east":-105.08929659619139,"south":39.948771428466756,"north":40.088123938327755},
                "regionSelection":[{"regionId":30543,"regionType":6}],
                "isMapVisible":true,
                "filterState":{"monthlyPayment":{"min":1800,"max":3300},"beds":{"min":2},"sortSelection":{"value":"globalrelevanceex"},"isAllHomes":{"value":true}},
                "isListVisible":true,"mapZoom":11
            }
        }
     
        // var url = "https://www.zillow.com/search/GetSearchPageState.htm?" + $.param({searchQueryState: {"pagination":{},"mapBounds":{"west":-105.53904940380858,"east":-105.08929659619139,"south":39.948771428466756,"north":40.088123938327755},"regionSelection":[{"regionId":30543,"regionType":6}],"isMapVisible":true,"filterState":{"monthlyPayment":{"min":1800,"max":3300},"beds":{"min":2},"sortSelection":{"value":"globalrelevanceex"},"isAllHomes":{"value":true}},"isListVisible":true,"mapZoom":11}
        // ,wants: {"cat1":["listResults","mapResults"],"cat2":["total"]}})
    //   fetch(url) 
        fetch('https://www.zillow.com/search/GetSearchPageState.htm?searchQueryState=%7B%22pagination%22%3A%7B%7D%2C%22mapBounds%22%3A%7B%22west%22%3A'+params.searchQueryState.mapBounds.west+'%2C%22east%22%3A'+params.searchQueryState.mapBounds.east+'%2C%22south%22%3A'+params.searchQueryState.mapBounds.south+'%2C%22north%22%3A'+params.searchQueryState.mapBounds.north+'%7D%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A'+params.searchQueryState.regionSelection[0].regionId+'%2C%22regionType%22%3A'+params.searchQueryState.regionSelection[0].regionType+'%7D%5D%2C%22isMapVisible%22%3Atrue%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22ah%22%3A%7B%22value%22%3Atrue%7D%7D%2C%22isListVisible%22%3Atrue%2C%22mapZoom%22%3A11%7D&wants=\{%22cat1%22:\[%22mapResults%22\]\}', {

// "https://www.zillow.com/menlo-park-ca/                                                                                                                                                                                                                                           2C%22mapZoom%22%3A13                                                                                                    
headers: {
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Host': 'www.zillow.com',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Safari/605.1.15',
            'Accept-Language': 'en-us',
            'Connection': 'keep-alive',
        }
}).then(function(result){
    console.log(result)
        result.text().then(function(result1){
               
           
            var ZillowResponse = JSON.parse(result1).cat1
            console.log(ZillowResponse)
           
            var resultsTitle = ZillowResponse.searchList.listResultsTitle
            var Listings = ZillowResponse.searchResults.mapResults
            var listingCount = ZillowResponse.searchList.totalResultCount
            var ListingInfo = Listings.map(function(house){
                var listing ={
                    info: house.hdpData
                }
                return listing
            })
            // console.log('responce',ListingInfo)
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
            // console.log(df)
            // convertToExcel()
           
        
        })
    }
)
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
// getZillowData("","menlo-park",'ca')

function hi(){

    var options={
        lowerCaseTagName: false,  // convert tag name to lower case (hurt performance heavily)
        comment: false,            // retrieve comments (hurt performance slightly)
        blockTextElements: {
          script: true,	// keep text content when parsing
          noscript: false,	// keep text content when parsing
          style: false,		// keep text content when parsing
          pre: false			// keep text content when parsing
        }
      }
     fetch('https://www.zillow.com/stanford-ca/', {
            headers: {
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Host': 'www.zillow.com',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Safari/605.1.15',
                'Accept-Language': 'en-us',
                'Connection': 'keep-alive',
            }
        }).then(result => result.text().then(result1=>{console.log(result1)}))
    // const root = parse('<ul id="list"><li>Hello World</li></ul>');
      
       
        
        // console.log(root);
        // { tagName: 'ul',
        //   rawAttrs: 'id="list"',
        //   childNodes:
        //    [ { tagName: 'li',
        //        rawAttrs: '',
        //        childNodes: [Object],
        //        classNames: [] } ],
        //   id: 'list',
        //   classNames: [] }
    
}
hi()



