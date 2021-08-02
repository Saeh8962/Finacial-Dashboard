var DataFrame=require('dataframe-js');
// var DataFrame =require('dataframe-js');
var fetch = require('node-fetch');

// import DataFrame, { Row } from 'dataframe-js';
fetch('https://www.zillow.com/search/GetSearchPageState.htm?searchQueryState=%7B%22pagination%22%3A%7B%7D%2C%22mapBounds%22%3A%7B%22west%22%3A-122.36375114160158%2C%22east%22%3A-121.99433585839846%2C%22south%22%3A37.36606765486998%2C%22north%22%3A37.55193003681727%7D%2C%22mapZoom%22%3A11%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A39748%2C%22regionType%22%3A6%7D%5D%2C%22isMapVisible%22%3Atrue%2C%22filterState%22%3A%7B%22isAllHomes%22%3A%7B%22value%22%3Atrue%7D%2C%22sortSelection%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%7D%2C%22isListVisible%22%3Atrue%7D&wants=\{%22cat1%22:\[%22mapResults%22\]\}&requestId=2', {
    headers: {
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Host': 'www.zillow.com',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Safari/605.1.15',
        'Accept-Language': 'en-us',
        'Referer': 'https://www.zillow.com/menlo-park-ca/?searchQueryState=%7B%22pagination%22%3A%7B%7D%2C%22mapBounds%22%3A%7B%22west%22%3A-122.36375114160158%2C%22east%22%3A-121.99433585839846%2C%22south%22%3A37.366067654869966%2C%22north%22%3A37.55193003681727%7D%2C%22regionSelection%22%3A%5B%7B%22regionId%22%3A39748%2C%22regionType%22%3A6%7D%5D%2C%22isMapVisible%22%3Atrue%2C%22filterState%22%3A%7B%22sort%22%3A%7B%22value%22%3A%22globalrelevanceex%22%7D%2C%22ah%22%3A%7B%22value%22%3Atrue%7D%7D%2C%22isListVisible%22%3Atrue%2C%22mapZoom%22%3A11%7D',
        'Connection': 'keep-alive',
        'Cookie': 'search=6|1629907496896%7Cregion%3Dmenlo-park-ca%26rect%3D37.53954451244926%252C-122.08668967919922%252C37.37848194253099%252C-122.27139732080079%26disp%3Dmap%26mdm%3Dauto%26pt%3Dpmf%252Cpf%26fs%3D1%26fr%3D0%26mmm%3D1%26rs%3D0%26ah%3D0%09%0939748%09%09%09%09%09%09; zjs_anonymous_id=%223d51b7a5-f7e5-4f68-8141-11261e08dadc%22; zjs_user_id=%22X1-ZUt5gk75hjifbd_ako3o%22; AWSALB=z0xDb/oXQBkDLmrU+V2GRx8ZjnqAGtV+XBFQCjmwB5aKIYFHN48DYV+Czsx675fnHgtTjJgMxngnvUF7aS1MCksyAkOj+NpiURZh+WxKFPq6fWgADk/vrdvb541t; AWSALBCORS=z0xDb/oXQBkDLmrU+V2GRx8ZjnqAGtV+XBFQCjmwB5aKIYFHN48DYV+Czsx675fnHgtTjJgMxngnvUF7aS1MCksyAkOj+NpiURZh+WxKFPq6fWgADk/vrdvb541t; _px3=5d99c8b7600c2a4e666226f9e49c60a2ee013f4ea55bf7c6c8d9e94871a23571:7XTWDE7ju7ur45GB4liYJ8eogOg3pajhB4sgO4JZLT7KIYK4cDml+ysQwRJaRKLUK0cta0NLDsLEYXSzws/6fg==:1000:f+URrtS39iXC06S4nVoAX9/pkMc7YywTeIWHtdgsHWldydYHdYJzxwhTbtYtGXozk0ykrBzIAOMlkRjhiWHlheU5VaUUxImIUm07ID1JiWYkRo31W1GxI+rBX8z/VMVmtwA4qo6/RI0LbYZXaZs3M1W2Fig8/dhp0ON6Jztr9ZqbetK0SJMnwIXqmrwXVAb88lGPFlLn9BUbPWEWkbwdBA==; _uetsid=76b79e50ee2511eb8b58a796f91da8e3; _uetvid=c6a68b00e9d911eba5b493da469de25d; _ga=GA1.2.971802987.1626840711; _gid=GA1.2.1005552688.1627313022; __pdst=bf119c540b4b49569f8b0ab455911024; _fbp=fb.1.1626840711647.1645871807; _pin_unauth=dWlkPVptTXdOV0U1TjJRdFl6QmpOQzAwWTJFekxXSXhNekF0T1Raa01UQTFaREpoWXpZMg; __gads=ID=601da881fa9e2a9e-22131b5677ba0078:T=1626840720:RT=1627314982:S=ALNI_MYXc611E7pH4NOjKYJY5-VxrNDQNQ; KruxAddition=true; utag_main=v_id:017ac7434a5900177315bafb253c01075001706d0093c$_sn:5$_se:1$_ss:1$_st:1627314824717$dc_visit:5$ses_id:1627313024717%3Bexp-session$_pn:1%3Bexp-session$dcsyncran:1%3Bexp-session$tdsyncran:1%3Bexp-session$dc_event:1%3Bexp-session$dc_region:us-east-1%3Bexp-session; DoubleClickSession=true; KruxPixel=true; zgsession=1|80c35d4d-4bf0-4c3a-a45b-a9985d8a6eb5; JSESSIONID=7B05BAED8ADDE1EE6FB6783736C9EB65; ZILLOW_SID=1|AAAAAVVbFRIBVVsVEiuA8JxtHVOtvQo4WLj75KA%2FKp9MIKDjLaNtK73RH1WZ6In2M6HjEGRqhbfNgsACMjDa8DAn9ceB; _gcl_au=1.1.324650823.1626840711; _pxvid=c655dbec-e9d9-11eb-812f-0242ac120005; loginmemento=1|6bfa2e6a66d85741901a57f111553ff151c198feefd060f64b4b6859a55f5426; userid=X|3|1181ac6fdfaf6ca7%7C3%7Cq4U4LgRrlIfjhwAUcWurEcGaHJW8nHt8; zguid=23|%243d51b7a5-f7e5-4f68-8141-11261e08dadc'
    }
}).then(result => result.text().then(result1=>{
  
    var ZillowResponse = JSON.parse(result1).cat1
    var resultsTitle = ZillowResponse.searchList.listResultsTitle
    var Listings = ZillowResponse.searchResults.mapResults
    var listingCount = ZillowResponse.searchList.totalResultCount
    var ListingInfo = Listings.map(house=>{
        var listing ={
            info: house.hdpData
        }
        return listing
    })
    // var InfoDetail = cleanedListing.map(listing=> listing.info)

    // var cleanedListing = Listings.map((house,indx)=>{
    //     var newListing ={
    //         price: house.price,
    //         beds: house.beds,
    //         baths: house.baths,
    //         area: house.baths,
    //         statusType:house.statusType,
    //         statusText:house.statusText,
    //         image:house.imgSrc,
    //         info: house.hdpData


    //     }
    //     return newListing
    // })
    // var InfoDetail = cleanedListing.map(listing=> listing.info)
    // console.log(InfoDetail[0].homeInfo.bedrooms,)
    var homeInfo = Object.values(Listings).map(listing=>listing)
    // console.log(homeInfo[0])
    var cleanedListing = Listings.map((house,indx)=>{
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
            var newListing = {
                
                
                
                price: house.price,
                beds: house.minBeds,
                baths: house.minBaths,
                area: house.minArea,
                image:house.imgSrc,
                unitCount:house.unitCount,
                address: address,
                statusType:house.statusType,
                statusText:house.statusText,

                
                index:indx
                
            }
            return newListing;
        }
        var newListing ={
                    price: house.price,
                    beds: beds,
                    baths: baths,
                    area: house.area,
                    statusType:house.statusType,
                    statusText:house.statusText,
                    image:house.imgSrc,
                    unitCount:"--",
                    address: address,
                    // info: house.hdpData,
                    index:indx
        
        
                }
               
                
                return newListing
    })
    console.log(cleanedListing)
}))