import { GRAPH_DATA } from "../types/types";

export const graph_data = (data) => {
    return {
        type: GRAPH_DATA,
        payload: data
    }
}