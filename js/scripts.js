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
    cardPrice.innerHTML = instrument.price;
    productDiv.appendChild(cardPrice);

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


var instruments = createInstrumentArray();
createCards();
createInstrumentTypeFilter(instruments);