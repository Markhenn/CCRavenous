const apiKey = 'rOYjbtPESupxopFb5MDy3OCOCTM0bFe5WpsEV5d0NZrcUUvZkf1remyY13JkD8Gl_NOZhb4BKjMuYlWnQo0udV06HEBTt2AouWJ4kT7dvkjb0aSM990Nu1nGO_zOWnYx';

const Yelp = {

    search(term, location, sortBy){
        //the prepended part of cors anywhere sets cors headers for the app, which are needed for yelp
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
            headers: { 
                Authorization: `Bearer ${apiKey}`
            }
        }).then(response => { 
            return response.json()
        }).then(jsonResponse => {
            if (jsonResponse.businesses) {
                return jsonResponse.businesses.map(business => {
                     return {
                        id: business.id,
                        imageSrc: business.image_url,
                        name: business.alias,
                        address: business.location.address1,
                        city: business.location.city,
                        state: business.location.state,
                        zipCode: business.location.zip_code,
                        category: business.categories[0].title,
                        rating: business.rating,
                        reviewCount: business.review_count
                    }
                });
            }
    })
    }
}

export default Yelp;