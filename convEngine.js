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


var globalOutput = {val: -4, exp: -4, units: "cm"}; //these default values are overwritten for now
var input = {val: 0, exp: 0, units: "Gm"}; //these too

var curUnitOperator = "m";
  
   
//modify these lines to your desired output unit  
var desInpVal = 63360;
var desInpUnits = "in";
var desOutUnits = "mi";
 
//-----Do not modify things below this line------
   
  
   
input.val = desInpVal;
input.units = desInpUnits;
globalOutput.units = desOutUnits;
 

//var baseUnitShort = "m";

//var t = "Default text if an error occurs";  //this should not happen if conversion happens properly


function metricToMetric(inpAmt, inpExp, inpMetricUnit, outMetricUnit)
{
   //var output = globalOutput;
   var i = 0;
   var indexInputUnit = -1;
   var indexOutputUnit = -1;  
   
   for (i=0; i<metricbig.length; i++)
   {  //find index of input unit
      if (metricbig[i][0].concat(curUnitOperator) == inpMetricUnit){
         indexInputUnit = i;
      }
   }
   
   for (i = 0; i < metricbig.length; i++){ //find index of output unit
      if (metricbig[i][0].concat(curUnitOperator) === outMetricUnit){
         indexOutputUnit = i;
      }
   }
   //keep values same and just modify exponents
   if (indexInputUnit && indexOutputUnit){ 
      var output;
      output.val = inpAmt;
      output.exp = metricbig[indexInputUnit][3] - metricbig[indexOutputUnit][3];
   }
   return output;
}
 
function imperialDistToImperialDist (inpAmt, inpExp, inpImpUnit, outImpUnit)
{
   var output = {val: -5, exp: inpExp, units: outImpUnit};
   var i = 0, indexInputUnit = -1, indexOutputUnit = -1; 
   
   for (i=0; i<imperialDistances.length; i++){  //find index of input unit
      if (imperialDistances[i][0] == inpImpUnit){
         indexInputUnit = i;
      }
   }
   
   for (i=0; i<imperialDistances.length; i++){ //find index of output unit
      if (imperialDistances[i][0] == outImpUnit){
         indexOutputUnit = i;
      }
   }

   if ((indexInputUnit > -1) && (indexOutputUnit > -1)){
      output.val = inpAmt;
       
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
   return output;
}
  
//if (desInpVal) {globalOutput = imperialDistToImperialDist(input.val, input.exp, input.units, globalOutput.units);}
//globalOutput = metricToMetric(input.val, input.exp, input.units, globalOutput.units);
globalOutput = imperialDistToImperialDist(input.val, input.exp, input.units, globalOutput.units);

function outputConv() {
   //metricToMetric();
   
   //globalOutput = imperialDistToImperialDist(input.val, input.exp, input.units, globalOutput.units);

   globalOutput = imperialDistToImperialDist(input.val, input.exp, input.units, globalOutput.units);
   //globalOutput = {val: -7, exp:-7, units:"cm"};
   return input.val + " " + input.units + " is " + globalOutput.val + " x 10^" + globalOutput.exp + " " + globalOutput.units;
} 