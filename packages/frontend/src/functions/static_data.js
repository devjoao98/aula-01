export const getTypeName = (value) => {
    
    let Type_Name = '';
    if(value===1){
        Type_Name = 'Gerente';
    }else if(value===2){
        Type_Name = 'Administrador';
    }else if(value===3){
        Type_Name = 'Funcionário';
    }

    return Type_Name;
};

export const getTypeNameLabel = (value) => {
    
var arr = ['primary','default', 'secondary'];
return arr[value-1];
};