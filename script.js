function run() {
    
    var selVal = document.getElementById("coSelect").value;
    if (selVal == "all") { readData(0); }
    else if (selVal == "europe") { readData(1); }
    else if (selVal == "asia")  { readData(2); }
    else if (selVal == "africa") {  readData(3);}
    else if (selVal == "america") { readData(4); }
    else if (selVal == "australia") { readData(5); }
}  

      
function readData(choice) {

if (window.XMLHttpRequest)
            {// code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp = new XMLHttpRequest();
            }
            else
            {// code for IE6, IE5
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlhttp.open("GET", "mondial.xml", false);
            xmlhttp.send();
            xmlDoc = xmlhttp.responseXML;
    
            var conArray = ["all","europe","asia","africa","america","australia"];
    
        
            var readContinent = xmlDoc.getElementsByTagName("continent");
            var numOfContinent = readContinent.length; // summary of continent
            
            
    
            var x = xmlDoc.getElementsByTagName("country");
            var numOfCountry = x.length; // summary of country
            
            var numOfCity = xmlDoc.getElementsByTagName("city").length;
            var numOfPopulation = 0;
            
            document.write("<table border='1'>");
            
            document.write("<tr><td><b>Country</b></td><td><b>Capital</b></td><td><b>Provinces</b></td><td><b>Population</b</td></tr>");
            
            
    
            for (i = 0; i < x.length; i++)
            {
                var checkContinent = x[i].getElementsByTagName("encompassed");
                var attnode = checkContinent[0].getAttributeNode("continent");
                if (attnode.value == conArray[choice])
                {
                            
                document.write("<tr><td>");
                document.write(x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue);
                document.write("</td><td>");

                var x2 = x[i].getElementsByTagName("province");
                var provinces = new Array();
                var capital;

                for (j = 0; j < x2.length; j++)
                {
                    provinces.push(" " + x2[j].getElementsByTagName("name")[0].childNodes[0].nodeValue);
                }

                var x3 = x[i].getElementsByTagName("city");

                for (var k = 0; k < x3.length; k++) 
                {
                    if (x3[k].getAttribute("is_country_cap") === "yes")
                        capital = x3[k].getElementsByTagName("name")[0].childNodes[0].nodeValue;
                }

                document.write(capital);
                document.write("</td><td>");

                document.write(provinces);
                document.write("</td><td>");
                
                var temp_population = x[i].getElementsByTagName("population")[0].childNodes[0].nodeValue;
                numOfPopulation = numOfPopulation + parseInt(temp_population);
                document.write(temp_population);
                document.write("</td></tr>");
               }
            }
            document.write("</table>");
    
    document.write("<table border='1'>");
    document.write("<tr><td><b>Continents</b></td><td><b>Countries</b></td><td><b>City</b></td><td><b>Population</b</td></tr>");
    document.write("<tr><td>");
    document.write(numOfContinent);
    document.write("</td><td>");
    
    document.write(numOfCountry);
    document.write("</td><td>");
    
    
    document.write(numOfCity);
    document.write("</td><td>");
    
    document.write(numOfPopulation);
    document.write("</td></tr>");
    document.write("</table>");
}