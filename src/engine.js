//modify these lines to your desired output unit  
var desInpVal = 1;
var desInpUnits = "m";
var desOutUnits = "mi";
 
//-----Do not modify things below this line------

//[abbreviation, prefix, product, exponent]  
var metricbig = [["y", "yocto", 0, -24],
                ["z", "zepto", 1, -21],
                ["a", "atto", 1, -18],
                ["f", "femto", 1, -15],
                ["p", "pico", 1, -12],
                ["n", "nano", 1, -9],
                ["u", "micro", 1, -6],
                ["m", "milli", 1, -3],
                ["c", "centi", 1, -2],
                ["d", "deci", 1, -1],
                ["", "", 1, 0],
                ["da", "deca", 1, 1],
                ["h", "hecto", 1, 2],
                ["k", "kilo", 1, 3],
                ["M", "mega", 1, 6],
                ["G", "giga", 1, 9],
                ["T", "tera", 1, 12],
                ["P", "peta", 1, 15],
                ["E", "exa", 1, 18],
                ["Z", "zetta", 1, 21],
                ["Y", "yotta", 1, 24]];
//[abbreviation, prefix, product, index for next larger unit, index of reference unit]  
//for instance, miles is in terms of feet, and feet is at index 1 so miles has reference to index 1
var imperialDistances = [["in", "inch", 1, 1, -1],
                        ["ft", "foot", 12, 3, 0],
                        ["yd", "yard", 3, -1, 1],
                        ["mi", "mile", 5280, 4, 1],
                        ["leag", "league", 3, -1, 3]]; //a league is three miles   

//[abbreviation, prefix, product, index for next larger unit, index of reference unit]  
//for instance, miles is in terms of feet, and feet is at index 1 so miles has reference to index 1
var timeUnits = [["sec", "second", ], //todo finish section
                 ["min", "minute", 12, 3, 0],
                 ["hr", "hour", 3, -1, 1],
                 ["d", "day", 5280, 4, 1],
                 ["wk", "week", 3, -1, 3],
                 ["mo", "month", 3, -1, 3],
                 ["yr", "year", 3, -1, 3],
                 ["", "decade", 3, -1, 3],
                 ["", "century", 3, -1, 3],
                 ["", "eon", 3, -1, 3]]; //or aeon


var unitImpDist = [["in", "inch", "inche"],
                   ["ft", "foot", "feet"],
                   ["yd", "yard", ""],
                   ["mi", "mile"],
                   ["leag", "leeg", "leage", "lege"]];



//Constructor for conversion objects
function UnitObject(arg1, arg2, arg3) {
   if ((!arg2) || (!arg3)){ //if all arguments are there
      this.val = arg1;      //then initiliaze properties
      this.exp = arg2;
      this.units = arg3;
   }
   else{ //copy constructor
      this.val = arg1.val;
      this.exp = arg1.exp;
      this.units = arg1.units;
   }
   this.unitType = "unk";
   this.unitSys = "unk";
}

function metricToMetric(inpObj, unitOperator, outMetricUnit)
{
   var output = new UnitObject(inpObj);
   var i = 0;
   var indexInputUnit = -1;
   var indexOutputUnit = -1;  
   
   for (i = 0; i < metricbig.length; i++)
   {  //find index of input unit
      if (metricbig[i][0].concat(unitOperator) == inpObj.units){
         indexInputUnit = i;
      }
   }
   
   for (i = 0; i < metricbig.length; i++){ //find index of output unit
      if (metricbig[i][0].concat(unitOperator) == outMetricUnit){
         indexOutputUnit = i;
      }
   }
   //keep values same and just modify exponents
   if ((indexInputUnit >= 0) && (indexOutputUnit >= 0)){ 
      output.val = inpObj.val;
      output.exp = metricbig[indexInputUnit][3] - metricbig[indexOutputUnit][3];
      output.units = metricbig[indexOutputUnit][0].concat(unitOperator)
   }
   else {
      output.units = "unitEEEEEError";
      output.val = indexOutputUnit;
   }
   return output;
}


function imperialDistToImperialDist (inpObj, outImpUnit)
{ //todo remove the new unit object created and just modify the input object directly
   var output = new UnitObject(-1, -1, "n");
   //var output = new UnitObject(inpObj);
   var i = 0, indexInputUnit = -1, indexOutputUnit = -1; 
   
   for (i=0; i<imperialDistances.length; i++){  //find index of input unit
      if (imperialDistances[i][0] == inpObj.units){
         indexInputUnit = i;
      }
   }
   
   for (i=0; i<imperialDistances.length; i++){ //find index of output unit
      if (imperialDistances[i][0] == outImpUnit){
         indexOutputUnit = i;
      }
   }
   if ((indexInputUnit > -1) && (indexOutputUnit > -1)){
      output.val = inpObj.val;
      output.exp = inpObj.exp;
      output.units = outImpUnit;
      
      while (indexInputUnit != indexOutputUnit){
         ///*
         if (indexInputUnit > indexOutputUnit) //going from high to low index
         {
            output.val *= imperialDistances[indexInputUnit][2];
            indexInputUnit = imperialDistances[indexInputUnit][4]; //jump to that line in array
         }
         else if (indexInputUnit < indexOutputUnit) //low to high index
         { 
            //indexInputUnit = imperialDistances[indexInputUnit][3];
            
            if (imperialDistances[indexOutputUnit][3] == indexInputUnit) {//conv directly
               output.val /= imperialDistances[indexOutputUnit][2];
               indexOutputUnit = indexInputUnit;    
            }
            else { //conv to (unit refferenced by) num in [3]rd column
               output.val /= imperialDistances[indexOutputUnit][2];
               indexOutputUnit = imperialDistances[indexOutputUnit][4];
            }
         }
      } 
      
      //output.val = -666;
   }
   else { //todo remove this?
      output.val = -9;
      output.units = "ERROR";
   }
   //return inpObj;
   return output;
}

function metricToImperialDist(inpObj, outImpUnit)
{
   var a = new UnitObject(0,0,0);
   var key = 2.54; //2.54cm = 1 inch
   a = metricToMetric(inpObj, "m", "cm"); //convert to cm
   a.val /= 2.54; //convert cm to in
   a.units = "in";
   a = imperialDistToImperialDist(a, outImpUnit); //then convert to imperial
   return a;
}

function imperialToMetricDist(inpObj, outMetricUnit)
{
   var a = new UnitObject(0,0,0);
   var key = 2.54; //2.54cm = 1 inch
   a = imperialDistToImperialDist(inpObj, "in"); //convert to inches
   a.val *= 2.54; //convert inches to cm
   a.units = "cm";
   a = metricToMetric(a, "m", outMetricUnit); //then convert to metric
   return a;
}

function celsiusToFahrenheit(inpObj){
   inpObj.val *= 1.8;
   inpObj.val += 32;
   inpObj.units = "F";
   return (inpObj);
}

function celsiusToKelvin(inpObj){
   inpObj.val += 273.15;
   inpObj.units = "K";
   return (inpObj);
}

function farhenheitToCelcius(inpObj){
   inpObj.val -= 32;
   inpObj.val /= 1.8;
   inpObj.units = "C";
   return (inpObj);
}

function farhenheitToKelvin(inpObj){
   inpObj.val + 459.67;
   inpObj.val /= 1.8;
   inpObj.units = "K";
   return (inpObj);
}

function kelvinToFahrenheit(inpObj){
   inpObj.val *= 1.8;
   inpObj.val - 459.67;
   inpObj.units = "F";
   return (inpObj);
}

function kelvinToCelsius(inpObj){
   inpObj.val -= 273.15;
   inpObj.units = "C";
   return (inpObj);
}

function timeConv(inpObj, outTimeUnit){
   //todo make this function like imp dist
   return inpObj;
}

function normalizeExponent(inpObj)
{
   while ((inpObj.val >= 10) || (inpObj.val < 1)){
      if (inpObj.val >= 10){
         inpObj.val /= 10;
         ++inpObj.exp;
      }
      else if (inpObj.val < 1){
         inpObj.val *= 10;
         --inpObj.exp;
      }
   }
}

function scanUnitTable (inpObj, typeParam) {
   var i = 0;
   var res = false; //result default case
   
   switch(typeParam){
         
      case "dist":
         for (i = 0; i < imperialDistances.length; i++){
            if (imperialDistances[i][0] == inpObj.units){
               inpObj.unitSys = "imperial";
               inpObj.unitType = "dist";
               return true;
            }
            else if (imperialDistances[i][1] == inpObj.units){
               inpObj.unitSys = "imperial";
               inpObj.unitType = "dist";
               inpObj.units = imperialDistances[i][0]; //from miles to "mi"
               return true;                 
            }
         }
         
         for (i = 0; i < metricbig.length; i++)
         {
            if (metricbig[i][0].concat("m") == inpObj.units){
               inpObj.unitSys = "metric";
               inpObj.unitType = "dist";
               return true;
         } 
            else if (metricbig[i][1].concat("meter") == inpObj.units){
               inpObj.unitSys = "metric";
               inpObj.unitType = "dist";
               inpObj.units = metricbig[i][0].concat("m"); //from "centimeters" to "cm"
               return true;
            } 
         }
         break;
             
         
      case "temp":
         
         break;
      
                

   }
   return false;
}


//initialize input

var inp = new UnitObject(desInpVal, 0, desInpUnits);

var proc = metricToMetric(inp, "m", desOutUnits);

var impTestInp = new UnitObject(44, 0, "in");
var impTestOut = "ft";
/*
var impTest = new UnitObject(0,0,0);
impTest = imperialDistToImperialDist(impTestInp, impTestOut);

var mti = new UnitObject(33, 0, "cm");
var mtiout = new UnitObject(mti);
mtiout = metricToImperialDist(mti, "in");
*/
var scantestobj = new UnitObject(desInpVal, 0, desInpUnits);
var scantestdisp = (desInpVal, 0, desInpUnits);
var outunitobj = new UnitObject(0, 0, desOutUnits);
var outp = new UnitObject(scantestobj);

if (scanUnitTable(scantestobj, "dist")){
   if (scanUnitTable(outunitobj, "dist")){
      //then both are distances. proceed
      if (scantestobj.unitSys == "imperial"){
          if (outunitobj.unitSys == "imperial"){
             outp = imperialDistToImperialDist(scantestobj, desOutUnits);
          }
          else if (outunitobj.unitSys == "metric"){
             outp = imperialToMetricDist(scantestobj, desOutUnits);
          }
      }
      else if (scantestobj.unitSys == "metric"){
         if (outunitobj.unitSys == "imperial"){
            outp = metricToImperialDist(scantestobj, desOutUnits);
         }
         else if (outunitobj.unitSys == "metric"){
            outp = metricToMetric(scantestobj, "m", desOutUnits);
         }
      }
   }
   else {
      scantestobj.val = "First are unit of distance but not second!"
   }
}else {
   scantestobj.val = -3333333333333333333333333333333333;
}

normalizeExponent(outp);


//external .js files need to be loaded before their function can be called
//so put them in the header of the page
