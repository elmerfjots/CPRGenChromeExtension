const CONTROL_NUMBERS = [4, 3, 2, 7, 6, 5, 4, 3, 2];
var takenCprs = new Set();
var duplicatesFound = 0;
var errorCnt = 0;
class CprGen{
    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }
    insert(str, index, value) {
        return str.substr(0, index) + value + str.substr(index);
    }
    toShortYearCpr(birthday){
        var first = birthday.substring(0,4);
        var second = birthday.substring(6,8);
        return first+second; 
    }
    generateAmount(birthday,hyphen,amount){
        takenCprs.clear();
        while(takenCprs.size < amount){
            if(duplicatesFound >= 10000){break;}
            var cpr = this.generate(birthday, hyphen);
            
            if(takenCprs.has(cpr)){
                duplicatesFound++;
            }
            if(cpr != null ){
                takenCprs.add(cpr);
            }
        }
        duplicatesFound = 0;
        return takenCprs;
    }
    generate(birthday, hyphen)
    {
        var cpr = null;
        var sum = 0;
        var tempDigit7;

        cpr = this.toShortYearCpr(birthday);

        tempDigit7 = this.makeDigit7(birthday);

        if (tempDigit7 == -1) { return null; }

        cpr += tempDigit7;

        for (var i = 0; i < 2; i++)
        {
            cpr += this.getRndInteger(0, 10);
        }

        for (var i = 0; i < cpr.length; i++)
        {
            var cprInt = parseInt(cpr[i]);
            sum += (cprInt) * CONTROL_NUMBERS[i];
        }
        if ((11 - (sum % 11)) == 11 | (11 - (sum % 11)) == 10)
        {
            return null;
            //return this.generate(birthday, hyphen);
        }
        
        cpr += 11 - (sum % 11);
        if (hyphen)
        { return this.insert(cpr,6,"-")}
        return cpr;
    }
    makeDigit7(birthday)
    {
        var year = birthday.substring(4);

        if (year < 1858)
        {
            return -1;
        }

        if (year > 2057)
        {
            return -1;
        }

        if (year < 1900)
        {
            return this.getRndInteger(5, 9);
        }

        if (year <= 1999)
        {
            if (year < 1937)
            {
                return this.getRndInteger(0, 4);
            }
            if (year >= 1937)
            {
                var choices = [ 0, 1, 2, 3, 4, 9 ];
                return choices[this.getRndInteger(0, 6)];
            }
        }

        if (year <= 2057)
        {
            if (year <= 2036)
            {
                return getRndInteger(4, 10);
            }
            if (year > 2036)
            {
                return getRndInteger(5, 9);
            }
        }

        return -1;
    }
}