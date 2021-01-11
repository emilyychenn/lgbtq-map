# SafeTravels: an LGBTQ+ friendly travel map 🏳️‍🌈
Map indicating countries' levels of acceptance towards members of the LGBTQ+ community. Try it out [here](still-forest-78209.herokuapp.com)!
<br><br>

### Inspiration
Depending on where they're going, gay travellers can face great risks. In six nations around the world, penalties are as severe as death for homosexuality. Additionally, same-sex sexual activity is a crime in 70 countries around the world. Thus we created safeTravels: a map of the world that indicates the friendliness of each country towards members of the LGBTQ+ community, so that LGBTQ+ travel enthusiasts can feel safe and enjoy their trip.
<br><br>

### What it does
safeTravels is a dynamic website that scrapes the web for data on anti-discrimination legisilation, marrige and civil partnership status, transgender rights, religious influence, prosecution, murders and much more.
Based on these factors and statistics obtained from this [Gay Travel Index](https://en.wikipedia.org/wiki/Gay-friendly), an LGBTQ+ friendliness score was generated from -1 to 1, 
where scores less than 0 were countries that regarded LGBTQ+ negatively and countries with scores above 0 were supportive and open. 

This data is then stored in MongoDB, and the MapBox API reads the data and updates its display on the website.
<br><br>

### How we built it
SafeTravels was built in Visual Studio Code using HTML, CSS, JavaScript, Node.js, Express.js, MapBox API, and MongoDB. To deploy, we used heroku.
<br><br>

### Challenges we ran into
MongoDB was a steep learning curve for our team, as we collectively had very little experience with it. Additionally, the Map Box API required geoJSON file formats
(or other formats that included a collection of coordinates representing the shapes of each country), which meant we experimented with a large JSON file that was hard to edit and manipulate.

We ran into hosting issues as well. Hosting both the front-end and the back-end separately but then integrating them together proved to be challenging.
<br><br>

### What's next for safeTravels
Allow people and users to leave reviews or personal experiences within the website, taking these into consideration for the safety score. Allow users to zoom in and get more local data such as different provinces/states. When hovering over an area, have recent LGBTQ+ news and friendly travel links pop up such as local travel links

Other marginalized groups such as BIPOC also have unpleasant experiences when travelling. We hope to overlay a similar map for different groups so users may be able to see one overlay, both or none as we understand that intersectionality plays a role in people's identities. As well as in the future we hope to provide a separate map for transgender people as it has been shown through recent events that sometimes they may get singled out in the LGBTQ+ community.
<br><br>
