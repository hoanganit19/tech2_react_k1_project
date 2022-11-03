export default class Array{
    getIndex = (array, field='id', value) => {
        if (array.length){
            return array.findIndex((item) => {
                return item[field]===value;
            })
        }

        return false;
    }

    getField = (array, field='id', value) => {
        if (array[value][field]!==undefined){
            return array[value][field];
        }

        return false;
    }

    getItem = (array, field='id', value) => {
        if (array.length){
            return array.find(item => {
                return item[field] == value;
            })
        }

        return false;
    }
}