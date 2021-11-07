import { GRAPH_DATA } from "../types/types";

const graph = ( state = [], action) => {
    switch(action.type){
        case GRAPH_DATA:
            return action.payload
        default:
            return state
    }
}

export default graph;