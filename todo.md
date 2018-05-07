# Weather

Dont mind my english here. Only fast notes written down.

TODO:
-[x] Fix autocomplete while searching a city name(https://developers.google.com/maps/documentation/javascript/reference/3/#Autocomplete)
    - [ ] check if its possible to move the script in index.html 

-[x] Fix httprequest from a weather service. SMHI?
    - update result page.


-[x] CORS during http request on SMHI.. NEED FIX. 
    - a solution might be
    (https://github.com/Rob--W/cors-anywhere/)
    - Or change api
    - or create my own small node backend handling the requests.

- Not place my API key on client side
    - make the call from backend

- If something went wrong with request. Show 404 page or similar

- Save latest search from users computer with cookie och html storage? what is best?
    - follow PUL rules(some kind of cookie warning)
    - Follow the rules [here](https://stackoverflow.com/questions/49018660/google-geocoder-api-with-angular-4). Not send a request for every custom city name. (location package)

- Time being I have a circular dependency on LocationService and the SearchComponent.

- Create a footer linking to me


Optional:
    - if searching with empty searchfield. Show some help
    - Create external SMHI parser
    - Last 3 searched places showing on first page 

To be continued...

[Markdown](https://guides.github.com/features/mastering-markdown/) help.