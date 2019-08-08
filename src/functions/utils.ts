export function equal(a, b){

    let EPSILON = 0.00001;
    let diff = a -b;

    if (diff < 0)
         diff = diff * -1;

    if (diff < EPSILON){
        return true;
    }else{
        return false;
    }

}

export function equalTuples(a, b){

    if(
        equal(a.x,b.x) &&
        equal(a.y,b.y) &&
        equal(a.z,b.z) &&
        equal(a.w,b.w)){

        return true;
    }else{
        return false;
    }

}
