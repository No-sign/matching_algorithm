function abs(fs: number, sd: number){
    return (fs > sd) ? fs - sd : sd - fs; 
}

function simple_sorting(requests: any){
    return requests.sort((a: any, b: any) => (a.targetLeague > b.targetLeague ? 1: -1));
}

function panelity_cal(fs: any, sd: any){
    const max_diff_bestof: number = 6;
    let bestof_weight: number = 1;
    let league_weight: number = max_diff_bestof * max_diff_bestof;
    const ans: number = bestof_weight * abs(fs.targetBestof, sd.targetBestof) + league_weight * abs(fs.targetLeague, sd.targetLeague);
    return ans;
}

function matching_new_simple(requests: any){
    let matches: any[] = [];
    let remaining = requests;
    let temp: any[];

    [ remaining, temp ] = pickup_with_conditions(remaining, (a: any, b: any) =>  
            abs(a.targetLeague, b.targetLeague) <= 1
            && a.targetDateTimeAt == b.targetDateTimeAt
    );

    if(temp.length > 0){
        for(let i = 0; i < temp.length; i++){
            matches.push(temp[i]);
        }
        temp = [];
    }

    return { matches, remaining };
}

function matching_simple(requests: any){

    let matches: any[] = [];
    let remaining = requests;
    let temp: any[];

    [ remaining, temp ] = pickup_with_conditions(remaining, (a: any, b: any) => 
            a.targetBestof == b.targetBestof 
            && a.targetDateTimeAt == b.targetDateTimeAt 
            && a.targetLeague == b.targetLeague
    );

    if(temp.length > 0){
        for(let i = 0; i < temp.length; i++){
            matches.push(temp[i]);
        }
        temp = [];
    }
    
    [ remaining, temp ] = pickup_with_conditions(remaining, (a: any, b: any) =>  
            a.targetLeague == b.targetLeague
            && a.targetDateTimeAt == b.targetDateTimeAt
    );

    if(temp.length > 0){
        for(let i = 0; i < temp.length; i++){
            matches.push(temp[i]);
        }
        temp = [];
    }

    [ remaining, temp ] = pickup_with_conditions(remaining, (a: any, b: any) => 
            a.targetBestof == b.targetBestof 
            && abs(a.targetLeague, b.targetLeague) <= 1
            && a.targetDateTimeAt == b.targetDateTimeAt
    );

    if(temp.length > 0){
        for(let i = 0; i < temp.length; i++){
            matches.push(temp[i]);
        }
        temp = [];
    }

    [ remaining, temp ] = pickup_with_conditions(remaining, (a: any, b: any) =>  
            abs(a.targetLeague, b.targetLeague) <= 1
            && a.targetDateTimeAt == b.targetDateTimeAt
    );

    if(temp.length > 0){
        for(let i = 0; i < temp.length; i++){
            matches.push(temp[i]);
        }
        temp = [];
    }

    return { matches, remaining };
}

function pickup_with_conditions(remaining: any[], pred: any): any[]{
    let size = remaining.length;
    let match: any[] = [];

    for(let i = 0; i < size; i++){
        for(let j = 0; j + i < size - 1; j++){
            if(pred(remaining[i], remaining[i + j + 1])){
                match.push([remaining[i], remaining[i + j + 1]]);
                
                remaining.splice(i + j + 1, 1);
                remaining.splice(i, 1);
                
                size = size - 2;
                break;
            }
        }
    }
    return [remaining, match];
}

function panality(matches: any){
    let size = matches.length;
    let output: any[] = [];
    for(let i = 0; i < size; i++){
        output.push(panelity_cal(matches[i][0], matches[i][1]));
    }
    console.log(size);
    return output;
}

let input = [
    {
    "targetDateTimeAt": "20:00",
    "targetBestof": 3,
    "targettargetLeague": 1,
    "teams": 
            "First of td"
    },
{
    "targetDateTimeAt": "20:00",
    "targetBestof": 2,
    "targetLeague": 2,
    "teams": 
            "Coming 4 by bibi"
    },
{
    "targetDateTimeAt": "21:00",
    "targetBestof": 3,
    "targetLeague": 2,
    "teams": 
            "Coming 4 by bibi"
    },
{
    "targetDateTimeAt": "21:00",
    "targetBestof": 3,
    "targetLeague": 2,
    "teams": 
            "Star​ Dream​ E-sport (STD)​"
    },
{
    "targetDateTimeAt": "21:00",
    "targetBestof": 3,
    "targetLeague": 2,
    "teams": 
            "BERSERK GLORY BY BIBI"
    },

{
    "targetDateTimeAt": "20:00",
    "targetBestof": 3,
    "targetLeague": 2,
    "teams": 
            "ฝึกทำเวฟ"
    },
{
    "targetDateTimeAt": "21:00",
    "targetBestof": 3,
    "targetLeague": 2,
    "teams": 
            "ฝึกทำเวฟ"
    },
{
    "targetDateTimeAt": "22:00",
    "targetBestof": 3,
    "targetLeague": 2,
    "teams": 
            "ฝึกทำเวฟ"
    },
{
    "targetDateTimeAt": "20:30",
    "targetBestof": 3,
    "targetLeague": 2,
    "teams": 
            "สายไหม"
    },
{
    "targetDateTimeAt": "21:00",
    "targetBestof": 3,
    "targetLeague": 2,
    "teams": 
            "Synthetic﻿"
    },
{
    "targetDateTimeAt": "20:00",
    "targetBestof": 3,
    "targetLeague": 2,
    "teams": 
            "werewolf"
    },
{
    "targetDateTimeAt": "22:00",
    "targetBestof": 2,
    "targetLeague": 2,
    "teams": 
            "werewolf"
         
    },
{
    "targetDateTimeAt": "21:00",
    "targetBestof": 3,
    "targetLeague": 2,
    "teams": 
            "The Next Gen"
         
    },
{
    "targetDateTimeAt": "21:00",
    "targetBestof": 3,
    "targetLeague": 2,
    "teams": 
            "KARCHARIAZ"
         
    },
{
    "targetDateTimeAt": "20:00",
    "targetBestof": 2,
    "targetLeague": 3,
    "teams": 
            "ONE POINT BY BIBI"         
    },
{
    "targetDateTimeAt": "21:00",
    "targetBestof": 2,
    "targetLeague": 3,
    "teams": 
            "ONE POINT BY BIBI"   
    },
{
    "targetDateTimeAt": "20:30",
    "targetBestof": 3,
    "targetLeague": 3,
    "teams": 
            "Yanghom"         
    },

{
    "targetDateTimeAt": "20:30",
    "targetBestof": 3,
    "targetLeague": 3,
    "teams": 
            "FoolPrint"        
    },
{
    "targetDateTimeAt": "21:30",
    "targetBestof": 3,
    "targetLeague": 3,
    "teams": 
            "ATOMIC"
         
    } ,
{
    "targetDateTimeAt": "20:30",
    "targetBestof": 3,
    "targetLeague": 3,
    "teams": 
            "Dimension Origin"
        
    },
{
    "targetDateTimeAt": "21:30",
    "targetBestof": 3,
    "targetLeague": 3,
    "teams": 
            "ATOMIC"
         
    },
{
    "targetDateTimeAt": "20:30",
    "targetBestof": 2,
    "targetLeague": 3,
    "teams": 
            "Beserk"
         
    },
{
    "targetDateTimeAt": "21:30",
    "targetBestof": 3,
    "targetLeague": 3,
    "teams": 
            "KRP"
         
    }

];

let input_case1 = [
    {
    "targetDateTimeAt": "20:00",
    "targetBestof": 3,
    "targettargetLeague": 1,
    "teams": 
            "First of td"
    },
{
    "targetDateTimeAt": "20:00",
    "targetBestof": 2,
    "targetLeague": 2,
    "teams": 
            "Coming 4 by bibi"
    },
{
    "targetDateTimeAt": "21:00",
    "targetBestof": 3,
    "targetLeague": 2,
    "teams": 
            "Coming 4 by bibi"
    },
{
    "targetDateTimeAt": "21:00",
    "targetBestof": 3,
    "targetLeague": 2,
    "teams": 
            "Star​ Dream​ E-sport (STD)​"
    },
{
    "targetDateTimeAt": "21:00",
    "targetBestof": 3,
    "targetLeague": 2,
    "teams": 
            "BERSERK GLORY BY BIBI"
    },

{
    "targetDateTimeAt": "20:00",
    "targetBestof": 3,
    "targetLeague": 2,
    "teams": 
            "ฝึกทำเวฟ"
    },
{
    "targetDateTimeAt": "21:00",
    "targetBestof": 3,
    "targetLeague": 2,
    "teams": 
            "ฝึกทำเวฟ"
    },
{
    "targetDateTimeAt": "22:00",
    "targetBestof": 3,
    "targetLeague": 2,
    "teams": 
            "ฝึกทำเวฟ"
    },
{
    "targetDateTimeAt": "20:30",
    "targetBestof": 3,
    "targetLeague": 2,
    "teams": 
            "สายไหม"
    },
{
    "targetDateTimeAt": "21:00",
    "targetBestof": 3,
    "targetLeague": 2,
    "teams": 
            "Synthetic﻿"
    },
{
    "targetDateTimeAt": "20:00",
    "targetBestof": 3,
    "targetLeague": 2,
    "teams": 
            "werewolf"
    },
{
    "targetDateTimeAt": "22:00",
    "targetBestof": 2,
    "targetLeague": 2,
    "teams": 
            "werewolf"
         
    },
{
    "targetDateTimeAt": "21:00",
    "targetBestof": 3,
    "targetLeague": 2,
    "teams": 
            "The Next Gen"
         
    },
{
    "targetDateTimeAt": "21:00",
    "targetBestof": 3,
    "targetLeague": 2,
    "teams": 
            "KARCHARIAZ"
         
    },
{
    "targetDateTimeAt": "20:00",
    "targetBestof": 2,
    "targetLeague": 3,
    "teams": 
            "ONE POINT BY BIBI"         
    },
{
    "targetDateTimeAt": "21:00",
    "targetBestof": 2,
    "targetLeague": 3,
    "teams": 
            "ONE POINT BY BIBI"   
    },
{
    "targetDateTimeAt": "20:30",
    "targetBestof": 3,
    "targetLeague": 3,
    "teams": 
            "Yanghom"         
    },

{
    "targetDateTimeAt": "20:30",
    "targetBestof": 3,
    "targetLeague": 3,
    "teams": 
            "FoolPrint"        
    },
{
    "targetDateTimeAt": "21:30",
    "targetBestof": 3,
    "targetLeague": 3,
    "teams": 
            "ATOMIC"
         
    } ,
{
    "targetDateTimeAt": "20:30",
    "targetBestof": 3,
    "targetLeague": 3,
    "teams": 
            "Dimension Origin"
        
    },
{
    "targetDateTimeAt": "21:30",
    "targetBestof": 3,
    "targetLeague": 3,
    "teams": 
            "ATOMIC"
         
    },
{
    "targetDateTimeAt": "20:30",
    "targetBestof": 2,
    "targetLeague": 3,
    "teams": 
            "Beserk"
         
    },
{
    "targetDateTimeAt": "21:30",
    "targetBestof": 3,
    "targetLeague": 3,
    "teams": 
            "KRP"
         
    }

];



console.log("------------------sorted_matching--------------------");
console.log(input_case1);
console.log(simple_sorting(input_case1));
const new_result = matching_simple(simple_sorting(input_case1));
const result = matching_simple(input);


console.log("simple")
console.log(result);
console.log(panality(result.matches));
console.log("new_simple")
console.log(new_result);
console.log(panality(new_result.matches));
