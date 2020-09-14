function createInstrumentArray(){
    var fluteInstrument = {
        description: "שם של חומוסייה",
        id: 1,
        imagePath: "Image/halil.png",
        instrumentOrders: null,
        instrumentType: {id: 1, name: "נשיפה"},
        name: "חליל",
        price: 1500,
        typeID: 1,

    };
    var harmonicaInstrument = {
        description: "מפוחית בטעם של פעם",
        id: 2,
        imagePath: "Image/mapuhit.png",
        instrumentOrders: null,
        instrumentType: {id: 1, name: "נשיפה"},
        name: "מפוחית",
        price: 50,
        typeID: 1,

    };
    var tromboneInstrument = {
        description: "סופר טרומבון",
        id: 3,
        imagePath: "Image/trombone.png",
        instrumentOrders: null,
        instrumentType: {id: 1, name: "נשיפה"},
        name: "טרומבון",
        price: 1000,
        typeID: 1,

    };
    var trumpetInstrument = {
        description: "חצוצרה מחשמלת",
        id: 4,
        imagePath: "Image/hazuzra.png",
        instrumentOrders: null,
        instrumentType: {id: 1, name: "נשיפה"},
        name: "חצוצרה",
        price: 35,
        typeID: 1,

    };
    var violinInstrument = {
        description: "סתם כינור (סקאם)",
        id: 5,
        imagePath: "",
        instrumentOrders: null,
        instrumentType: {id: 2, name: "מיתר"},
        name: "כינור",
        price: 500,
        typeID: 2,

    };
    var clarinetInstrument = {
        description: "הכלי של סקווידוויד",
        id: 6,
        imagePath: "Image/klarinet.png",
        instrumentOrders: null,
        instrumentType: {id: 1, name: "נשיפה"},
        name: "קלרינט",
        price: 2300,
        typeID: 1,

    };
    var instruments = [fluteInstrument, harmonicaInstrument,tromboneInstrument, trumpetInstrument, clarinetInstrument, violinInstrument];
    return instruments;
}

function createInstrumentDiv(instrument)
{
    // Main card div
    var cardDiv = document.createElement('div');
    cardDiv.className = 'card rounded';

    // Product image
    var cardImg = document.createElement('img');
    cardImg.className = 'card-img-top';
    cardImg.setAttribute('src', instrument.imagePath);
    cardDiv.appendChild(cardImg);

    // Product Text
    var productDiv = document.createElement('div');
    productDiv.className = 'card-body';

    // Product Text - title
    var cardHeader = document.createElement('h4');
    cardHeader.className = 'card-title';
    cardHeader.innerHTML = instrument.name;
    productDiv.appendChild(cardHeader);

    // Product Text - description
    var cardDescription = document.createElement('p');
    cardDescription.className = 'card-text';
    cardDescription.innerHTML = instrument.description;
    productDiv.appendChild(cardDescription);

    // Product Text - price
    var cardPrice = document.createElement('p');
    cardPrice.className = 'card-price';
    cardPrice.innerHTML = instrument.price + "$";
    productDiv.appendChild(cardPrice);

    // Product Text - Type (not showed)
    var cardType = document.createElement('p');
    cardType.className = 'card-type';
    cardType.setAttribute('value', instrument.instrumentType.name);
    productDiv.appendChild(cardType);

    // Product Add-To-Cart - Generic
    var addToCardButton = document.createElement('a');
    addToCardButton.className ="btn btn-primary stretched-link"
    addToCardButton.setAttribute('href', '#');
    var cartImg = document.createElement('img');
    cartImg.className = "cart-img";
    cartImg.setAttribute('src', "Image/cart.png");
    addToCardButton.appendChild(cartImg);
    addToCardButton.innerHTML += "הוסף לעגלה";
    productDiv.appendChild(addToCardButton);

    cardDiv.appendChild(productDiv);
    return cardDiv;
}

function createCards()
{    
    var instrument;
    var cardColumns = document.getElementById("cardColumns");
    for (instrument of instruments)
    {
        var cardDiv = createInstrumentDiv(instrument);
        cardColumns.appendChild(cardDiv);
    }
}

function createUniqueInstrumentTypeArray(instruments){
    var allInstrumentTypes = [];
    for (instrument of instruments)
    {
        
        allInstrumentTypes.push(instrument.instrumentType.name);
    } 
    var unique = [...new Set(allInstrumentTypes)]
    return unique;
}

function createInstrumentDropdownLink(type)
{
    var filter = document.createElement('a');
    filter.className = "dropdown-item";
    filter.setAttribute('name', type);
    filter.setAttribute('href', "#");
    var onclickAttr =  "showByTypeFilter('" + type + "');return false;";
    filter.setAttribute('onclick',onclickAttr);
    filter.innerHTML += type;
    return filter;
}

function createInstrumentTypeFilter(instruments){
    var types = createUniqueInstrumentTypeArray(instruments);
    var typeFilterDOM = document.getElementById("filterByType");
    for (type of types)
    {
        filter = createInstrumentDropdownLink(type);
        typeFilterDOM.appendChild(filter);
    }
}

function showByTypeFilter(instrumentType)
{
    filters.type = instrumentType;
    filterCards();

}

function filterByContent()
{
    
    var input = document.getElementById("myInput");
    var filter = input.value;
    filters.content = filter;
    filterCards();
    
}

function filterByPrice(minPrice, maxPrice, id)
{
    var cbox = document.getElementById(id);
    if (cbox.checked == true)
    {
        var priceRange = {"minPrice": minPrice, "maxPrice":maxPrice};
        if (filters.price){
            filters.price.push(priceRange);
        }
        else{
            filters.price = [priceRange];
        }
    }
    else
    {
        var index = 0;
        var newPriceFilters = [];
        for (priceFilter of filters.price)
        {
            index++;
            if (priceFilter.minPrice == minPrice && priceFilter.maxPrice == maxPrice)
            {
                continue;
            }
            else{
                var tempMinPrice = priceFilter.minPrice;
                var tempMaxPrice = priceFilter.maxPrice;
                newPriceFilters.push({"minPrice": tempMinPrice, "maxPrice":tempMaxPrice });
            }
            
            filters.price = newPriceFilters;
        }
    }
    
    filterCards();
    
}
function filterCards()
{
    var contentFilter = filters.content;
    var cards = document.getElementsByClassName("card rounded");
    for (card of cards)
    {
        var isAlreadyHidden = (card.style.display === "none");
        var cardChildElements = card.getElementsByTagName("*");
        if (!contentFilter)
        {
            card.style.display = null;
            continue;
        }
        for (element of cardChildElements)
        {
            txtValue = element.textContent || element.innerText;
            if (!isAlreadyHidden && txtValue.indexOf(contentFilter) > -1)
            {
                card.style.display = null;
                break;
            }
            else
            {
                card.style.display = "none";
            }
        }
    }


    var instrumentType = filters.type;
    var cards = document.getElementsByClassName("card rounded")
    for (element of cards)
    {
        var isAlreadyHidden = (element.style.display === "none");
        let productType = element.querySelector('.card-type').getAttribute('value');
        if (!isAlreadyHidden && instrumentType && productType == instrumentType)
        {
            //element.removeAttribute('display');
            element.style.display = null;
            
        }
        else if (instrumentType && productType != instrumentType)
        {
            element.style.display = "none";
        }
    }

    for(priceRange of filters.price)
    {
        var maxPrice = priceRange.maxPrice;
        var minPrice = priceRange.minPrice;
        if (maxPrice || minPrice)
        {
            var cards = document.getElementsByClassName("card rounded");
            for (card of cards)
            {
                var isAlreadyHidden = (card.style.display === "none");
                var productPriceElement = card.getElementsByClassName("card-price")[0];
                var productPriceString = productPriceElement.textContent || productPriceElement.innerText;
                var productPrice = productPriceString.replace("$", "");
                if (!isAlreadyHidden && productPrice >= minPrice && productPrice <= maxPrice)
                {
                    card.style.display = null;
                    continue;
                }
                else
                {
                    card.style.display = "none";
                }
                
            }
        }
    }
    
}

function clearFilter()
{
    var cards = document.getElementsByClassName("card rounded");
    for (element of cards)
    {
        //element.removeAttribute('display');
        element.style.display = null;
    }
}

// function isInstrumentFromType(instrumentType, type)
// {
//     var instrument = instruments.find(inst => inst.name == instrumentName);
//     if (instrument.instrumentType.name == type)
//         return true;
//     else
//         return false;
// }

var filters = {};

var instruments = createInstrumentArray();
createCards();
createInstrumentTypeFilter(instruments);