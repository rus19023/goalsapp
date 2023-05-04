// 1. Create DOM manipulation helper functions in utilities.js
// do a querySelector lookup @param {string} selector The selector passed to querySelector

// @return {element} The matching element or null if not found /


export const toggleTheme = () => {
    var element = document.body;
    element.classList.toggle("lightmode");
 }

export const qs = (selector) => {
    //console.log("selector: " + selector + "," + document.querySelector(selector));
    return document.querySelector(selector);
}

export const gd = (id) => {
    return new Date(+id).toLocaleDateString();
}

export const gt = (id) => {
    var date = new Date(+id);
    var hours = date.getHours() < 13 ? date.getHours() : date.getHours() - 12;
    if (hours == 0) { hours = 12 };
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    //var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    var amPM = date.getHours() < 13 ? 'am' : 'pm';
        return hours + ":" + minutes + amPM //+ ":" + seconds;     
}

export const se = (errorText, el) => {
    console.log("errorText: ", errorText);
    el.innerText = errorText;
}

/*
add a touchend event listener to an element for mobile with a click event fallback for desktops @param {string} elementSelector The selector for the element to attach the listener to
* @param {function} callback The callback function to run
// */

// const getEventType = $(this).on('touchend click', function(event) {
//     if (event.type == "touchend") {
//         $(this).off('click');
//         const eventType = 'touchend';
//         console.log("Only touch event is fired");
//     } else if (event.type == "click") {
//         $(this).off('touchend');
//         console.log("Only click event is fired");
//     }
//     return event.type;
// });

export function onTouch(el, callback) {
    //const el = qs(elSelector);
    //const eventType = "click";
    //console.log("elSelector: " + elSelector);
    //console.log("el: " + el);
    if (el.addEventListener) {
        //this.allbtn.addEventListener("touchend", () => { this.listAll(); }, false);
        console.log("el: " + el);
        //console.log("callback: " + callback);
        el.addEventListener(
            "click", () =>
            {
                console.log(el.type);
                if (typeof callback == "function") {
                    callback();
                }
                console.log("after callback in onTouch");
            },
            false);
        // el.addEventListener("keyup", () => { callback }, false);
        //console.log("eventType: " + eventType);
        //el.addEventListener(event, callback, false);
    }
}

export function createLMNT(LMNT, LMNTtype, LMNTid, LMNTtext, LMNTclass) {
    let lmnt = document.createElement(LMNT);
    lmnt.setAttribute('type', LMNTtype);
    lmnt.setAttribute('id', LMNTid);
    lmnt.innerText = LMNTtext;
    lmnt.setAttribute('class', LMNTclass);
    return lmnt;
}

// set footer
export function setFooter() {
    if (isElement("autofooter")) {
        writeById("autofooter", createLink("https://rus19023.github.io/myportfolio/", "&copy; 2019-2022 | Doris Rush-Lopez, BYU-Idaho Candidate for Bachelor of Science in Applied Technology"));
    }
}

export const createLink = (url, text) => {
    return `<a href="${url}">${text}</a>`;
};

export function writeById(output, input) {
    qs(`#${output}`).innerHTML = input;
}

export function writeByClass(output, input) {
    qs(`.${output}`).innerHTML = input;
}

export function isElement(element) {
    // check if id exists
    const myId = qs(`#${element}`);
    if (typeof myId != "undefined" && myId != null) {
        return myId.nodeType === 1;
    }
}

export function isClass(element) {
    // check if class exists
    const myClass = qs(`.${element}`);
    if (typeof myClass != "undefined" && myClass != null) {
        return myClass.nodeType === 1;
    }
}

export function getURL() {
    // TODO: Connect to db or json file to retrieve http response
    
}

// make some waves for background
export function makeWaves() {
    var ocean = document.getElementById("ocean"),
        waveWidth = 10,
        waveCount = Math.floor(window.innerWidth/waveWidth),
        docFrag = document.createDocumentFragment();
   
    for(var i = 0; i < waveCount; i++){
      var wave = document.createElement("div");
      wave.className += " wave";
      docFrag.appendChild(wave);
      wave.style.left = i * waveWidth + "px";
      wave.style.AnimationDelay = (i/100) + "s";
    }
    ocean.appendChild(docFrag);
}

/* Countries dropdown
// TODO: Pull countries from database storage

export function getCountry(dropDownName) {
    const parentEl = qs(`#${dropDownName}`);
        parentEl.innerText = '';// createLMNT(LMNT, type, id, text, class)
        const list = createLMNT('select', 'dropdown', country.id, 'country.name', 'dropdown options');
        // Get data from country source
        const countries = getCountries;
        countries.forEach((country) => {
            // create new option
            let option = createLMNT("input", "option", country.id, country.name, "itembtns markbtn chkbtn"); 
            list.appendChild(option);
        });
        parentEl.appendChild(list);        
}

*/
// <!-- <div class="form-group">
// <label class="col-sm-2 control-label" for="country">Country</label> 
// <div class="col-sm-5">
//   <select id="country" class="form-control" name="country">
//     <option value="Choose country"></option>
//     <option value="AF">Afghanistan</option>
//     <option value="AX">Åland Islands</option>
//     <option value="AL">Albania</option>
//     <option value="DZ">Algeria</option>
//     <option value="AS">American Samoa</option>
//     <option value="AD">Andorra</option>
//     <option value="AO">Angola</option>
//     <option value="AI">Anguilla</option>
//     <option value="AQ">Antarctica</option>
//     <option value="AG">Antigua and Barbuda</option>
//     <option value="AR">Argentina</option>
//     <option value="AM">Armenia</option>
//     <option value="AW">Aruba</option>
//     <option value="AU">Australia</option>
//     <option value="AT">Austria</option>
//     <option value="AZ">Azerbaijan</option>
//     <option value="BS">Bahamas</option>
//     <option value="BH">Bahrain</option>
//     <option value="BD">Bangladesh</option>
//     <option value="BB">Barbados</option>
//     <option value="BY">Belarus</option>
//     <option value="BE">Belgium</option>
//     <option value="BZ">Belize</option>
//     <option value="BJ">Benin</option>
//     <option value="BM">Bermuda</option>
//     <option value="BT">Bhutan</option>
//     <option value="BO">Bolivia</option>
//     <option value="BA">Bosnia and Herzegovina</option>
//     <option value="BW">Botswana</option>
//     <option value="BV">Bouvet Island</option>
//     <option value="BR">Brazil</option>
//     <option value="IO">British Indian Ocean Territory</option>
//     <option value="BN">Brunei Darussalam</option>
//     <option value="BG">Bulgaria</option>
//     <option value="BF">Burkina Faso</option>
//     <option value="BI">Burundi</option>
//     <option value="KH">Cambodia</option>
//     <option value="CM">Cameroon</option>
//     <option value="CA">Canada</option>
//     <option value="CV">Cape Verde</option>
//     <option value="KY">Cayman Islands</option>
//     <option value="CF">Central African Republic</option>
//     <option value="TD">Chad</option>
//     <option value="CL">Chile</option>
//     <option value="CN">China</option>
//     <option value="CX">Christmas Island</option>
//     <option value="CC">Cocos (Keeling) Islands</option>
//     <option value="CO">Colombia</option>
//     <option value="KM">Comoros</option>
//     <option value="CG">Congo</option>
//     <option value="CD">Congo, The Democratic Republic of The</option>
//     <option value="CK">Cook Islands</option>
//     <option value="CR">Costa Rica</option>
//     <option value="CI">Cote D'ivoire</option>
//     <option value="HR">Croatia</option>
//     <option value="CU">Cuba</option>
//     <option value="CY">Cyprus</option>
//     <option value="CZ">Czech Republic</option>
//     <option value="DK">Denmark</option>
//     <option value="DJ">Djibouti</option>
//     <option value="DM">Dominica</option>
//     <option value="DO">Dominican Republic</option>
//     <option value="EC">Ecuador</option>
//     <option value="EG">Egypt</option>
//     <option value="SV">El Salvador</option>
//     <option value="GQ">Equatorial Guinea</option>
//     <option value="ER">Eritrea</option>
//     <option value="EE">Estonia</option>
//     <option value="ET">Ethiopia</option>
//     <option value="FK">Falkland Islands (Malvinas)</option>
//     <option value="FO">Faroe Islands</option>
//     <option value="FJ">Fiji</option>
//     <option value="FI">Finland</option>
//     <option value="FR">France</option>
//     <option value="GF">French Guiana</option>
//     <option value="PF">French Polynesia</option>
//     <option value="TF">French Southern Territories</option>
//     <option value="GA">Gabon</option>
//     <option value="GM">Gambia</option>
//     <option value="GE">Georgia</option>
//     <option value="DE">Germany</option>
//     <option value="GH">Ghana</option>
//     <option value="GI">Gibraltar</option>
//     <option value="GR">Greece</option>
//     <option value="GL">Greenland</option>
//     <option value="GD">Grenada</option>
//     <option value="GP">Guadeloupe</option>
//     <option value="GU">Guam</option>
//     <option value="GT">Guatemala</option>
//     <option value="GG">Guernsey</option>
//     <option value="GN">Guinea</option>
//     <option value="GW">Guinea-bissau</option>
//     <option value="GY">Guyana</option>
//     <option value="HT">Haiti</option>
//     <option value="HM">Heard Island and Mcdonald Islands</option>
//     <option value="VA">Holy See (Vatican City State)</option>
//     <option value="HN">Honduras</option>
//     <option value="HK">Hong Kong</option>
//     <option value="HU">Hungary</option>
//     <option value="IS">Iceland</option>
//     <option value="IN">India</option>
//     <option value="ID">Indonesia</option>
//     <option value="IR">Iran, Islamic Republic of</option>
//     <option value="IQ">Iraq</option>
//     <option value="IE">Ireland</option>
//     <option value="IM">Isle of Man</option>
//     <option value="IL">Israel</option>
//     <option value="IT">Italy</option>
//     <option value="JM">Jamaica</option>
//     <option value="JP">Japan</option>
//     <option value="JE">Jersey</option>
//     <option value="JO">Jordan</option>
//     <option value="KZ">Kazakhstan</option>
//     <option value="KE">Kenya</option>
//     <option value="KI">Kiribati</option>
//     <option value="KP">Korea, Democratic People's Republic of</option>
//     <option value="KR">Korea, Republic of</option>
//     <option value="KW">Kuwait</option>
//     <option value="KG">Kyrgyzstan</option>
//     <option value="LA">Lao People's Democratic Republic</option>
//     <option value="LV">Latvia</option>
//     <option value="LB">Lebanon</option>
//     <option value="LS">Lesotho</option>
//     <option value="LR">Liberia</option>
//     <option value="LY">Libyan Arab Jamahiriya</option>
//     <option value="LI">Liechtenstein</option>
//     <option value="LT">Lithuania</option>
//     <option value="LU">Luxembourg</option>
//     <option value="MO">Macao</option>
//     <option value="MG">Madagascar</option>
//     <option value="MW">Malawi</option>
//     <option value="MY">Malaysia</option>
//     <option value="MV">Maldives</option>
//     <option value="ML">Mali</option>
//     <option value="MT">Malta</option>
//     <option value="MH">Marshall Islands</option>
//     <option value="MQ">Martinique</option>
//     <option value="MR">Mauritania</option>
//     <option value="MU">Mauritius</option>
//     <option value="YT">Mayotte</option>
//     <option value="MX">Mexico</option>
//     <option value="FM">Micronesia, Federated States of</option>
//     <option value="MD">Moldova, Republic of</option>
//     <option value="MC">Monaco</option>
//     <option value="MN">Mongolia</option>
//     <option value="ME">Montenegro</option>
//     <option value="MS">Montserrat</option>
//     <option value="MA">Morocco</option>
//     <option value="MZ">Mozambique</option>
//     <option value="MM">Myanmar</option>
//     <option value="NA">Namibia</option>
//     <option value="NR">Nauru</option>
//     <option value="NP">Nepal</option>
//     <option value="NL">Netherlands</option>
//     <option value="AN">Netherlands Antilles</option>
//     <option value="NC">New Caledonia</option>
//     <option value="NZ">New Zealand</option>
//     <option value="NI">Nicaragua</option>
//     <option value="NE">Niger</option>
//     <option value="NG">Nigeria</option>
//     <option value="NU">Niue</option>
//     <option value="NF">Norfolk Island</option>
//     <option value="MK">North Macedonia</option>
//     <option value="MP">Northern Mariana Islands</option>
//     <option value="NO">Norway</option>
//     <option value="OM">Oman</option>
//     <option value="PK">Pakistan</option>
//     <option value="PW">Palau</option>
//     <option value="PS">Palestinian Territory, Occupied</option>
//     <option value="PA">Panama</option>
//     <option value="PG">Papua New Guinea</option>
//     <option value="PY">Paraguay</option>
//     <option value="PE">Peru</option>
//     <option value="PH">Philippines</option>
//     <option value="PN">Pitcairn</option>
//     <option value="PL">Poland</option>
//     <option value="PT">Portugal</option>
//     <option value="PR">Puerto Rico</option>
//     <option value="QA">Qatar</option>
//     <option value="RE">Reunion</option>
//     <option value="RO">Romania</option>
//     <option value="RU">Russian Federation</option>
//     <option value="RW">Rwanda</option>
//     <option value="SH">Saint Helena</option>
//     <option value="KN">Saint Kitts and Nevis</option>
//     <option value="LC">Saint Lucia</option>
//     <option value="PM">Saint Pierre and Miquelon</option>
//     <option value="VC">Saint Vincent and The Grenadines</option>
//     <option value="WS">Samoa</option>
//     <option value="SM">San Marino</option>
//     <option value="ST">Sao Tome and Principe</option>
//     <option value="SA">Saudi Arabia</option>
//     <option value="SN">Senegal</option>
//     <option value="RS">Serbia</option>
//     <option value="SC">Seychelles</option>
//     <option value="SL">Sierra Leone</option>
//     <option value="SG">Singapore</option>
//     <option value="SK">Slovakia</option>
//     <option value="SI">Slovenia</option>
//     <option value="SB">Solomon Islands</option>
//     <option value="SO">Somalia</option>
//     <option value="ZA">South Africa</option>
//     <option value="GS">South Georgia and The South Sandwich Islands</option>
//     <option value="ES">Spain</option>
//     <option value="LK">Sri Lanka</option>
//     <option value="SD">Sudan</option>
//     <option value="SR">Suriname</option>
//     <option value="SJ">Svalbard and Jan Mayen</option>
//     <option value="SZ">Swaziland</option>
//     <option value="SE">Sweden</option>
//     <option value="CH">Switzerland</option>
//     <option value="SY">Syrian Arab Republic</option>
//     <option value="TW">Taiwan, Province of China</option>
//     <option value="TJ">Tajikistan</option>
//     <option value="TZ">Tanzania, United Republic of</option>
//     <option value="TH">Thailand</option>
//     <option value="TL">Timor-leste</option>
//     <option value="TG">Togo</option>
//     <option value="TK">Tokelau</option>
//     <option value="TO">Tonga</option>
//     <option value="TT">Trinidad and Tobago</option>
//     <option value="TN">Tunisia</option>
//     <option value="TR">Turkey</option>
//     <option value="TM">Turkmenistan</option>
//     <option value="TC">Turks and Caicos Islands</option>
//     <option value="TV">Tuvalu</option>
//     <option value="UG">Uganda</option>
//     <option value="UA">Ukraine</option>
//     <option value="AE">United Arab Emirates</option>
//     <option value="GB">United Kingdom</option>
//     <option value="US">United States</option>
//     <option value="UM">United States Minor Outlying Islands</option>
//     <option value="UY">Uruguay</option>
//     <option value="UZ">Uzbekistan</option>
//     <option value="VU">Vanuatu</option>
//     <option value="VE">Venezuela</option>
//     <option value="VN">Viet Nam</option>
//     <option value="VG">Virgin Islands, British</option>
//     <option value="VI">Virgin Islands, U.S.</option>
//     <option value="WF">Wallis and Futuna</option>
//     <option value="EH">Western Sahara</option>
//     <option value="YE">Yemen</option>
//     <option value="ZM">Zambia</option>
//     <option value="ZW">Zimbabwe</option>
//   </select>
// </div> -->
