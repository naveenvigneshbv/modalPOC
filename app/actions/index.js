export const DATA_AVAILABLE = 'DATA_AVAILABLE';

//Import the sample data
import Data from '../instructions.json';

export function getData() {
    return (dispatch) => {
        // Making API Call
        // For this example, using json data
        // delay the retrieval [Sample reasons only]
        setTimeout(() => {
            var data = Data.instructions;
            dispatch({type: DATA_AVAILABLE, data: data});
        }, 2000);
    };
}